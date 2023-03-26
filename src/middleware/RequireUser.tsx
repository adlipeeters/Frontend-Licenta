import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMe } from "../api/auth/auth";
import { useStateContext } from "../context/AuthUserContext";
import FullScreenLoader from "../components/Loader/FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["logged_in"]);
  const location = useLocation();
  const stateContext = useStateContext();
  const navigate = useNavigate();

  const {
    isLoading,
    isFetching,
    isPaused,
    data: user,
  } = useQuery(["authUser"], getMe, {
    enabled: !!cookies.logged_in,
    retry: 1,
    // select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        navigate("/login");
        removeCookie("logged_in");
      }
    },
    // staleTime: 10000,
  });

  if (!cookies.logged_in) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  return (cookies.logged_in || user) &&
    allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
