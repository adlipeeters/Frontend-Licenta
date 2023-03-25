import { useNavigate } from "react-router-dom";
import React from "react";
import { getToken } from "../api/auth/auth";

interface Token {
  access_token: string;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    profileImage: string | null;
    subscription: string | null;
  };
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthWrapper = (props: any) => {
    const navigate = useNavigate();
    const authData = getToken();

    React.useEffect(() => {
      if (!authData) {
        //aici se poate arata alt component unde sa arat ca el este delogat
        navigate("/auth");
      }
    }, [authData, navigate]);

    return authData ? <WrappedComponent {...props} /> : null;
  };

  return AuthWrapper;
};

export default withAuth;
