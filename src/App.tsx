import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/ErrorPages/NotFound";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import "./App.css";
import SignIn from "./pages/Auth/SignIn";
import AuthLayout from "./components/Layout/AuthLayout";
import { login, getToken } from "./api/auth/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import routes from "./router/routes";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ApplicationProps {}

const App: React.FunctionComponent<ApplicationProps> = () => {
  // const [cookies] = useCookies(["very_secret_cookie_http_only_false"]);
  const content = useRoutes(routes);
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      {content}
    </>
  );
};

export default App;
