import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth/auth";
import { useStateContext } from "../context/AuthUserContext";
import FullScreenLoader from "../components/Loader/FullScreenLoader";
import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["logged_in"]);
  const stateContext = useStateContext();

  const query = useQuery(["authUser"], () => getMe(), {
    enabled: !!cookies.logged_in,
    retry: 1,
    // select: (data) => data.data.user,
    onSuccess: (data) => {
      console.log(data);
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
    onError: (error: any) => {
      console.log(error.response.status);
      if (error.response.status === 401) {
        navigate("/login");
        removeCookie("logged_in");
      }
    },
  });

  if (query.isLoading && cookies.logged_in) {
    return <FullScreenLoader />;
  }

  if (query.isError || !cookies.logged_in) {
    <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthMiddleware;
