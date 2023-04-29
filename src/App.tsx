import React from "react";
import "./App.css";
import routes from "./router/routes";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ApplicationProps {}

const App: React.FunctionComponent<ApplicationProps> = () => {
  const content = useRoutes(routes);
  return (
    <>
      <CssBaseline />
      <ToastContainer autoClose={1500} />
      {content}
    </>
  );
};

export default App;
