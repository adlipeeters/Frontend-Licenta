import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme-config/theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppTesting from "./REACT_QUERY_TESTING_COMPONENTS/AppTesting";
import { StateContextProvider } from "./context/AuthUserContext";
import { BrowserRouter as Router } from "react-router-dom";
import AuthMiddleware from "./middleware/AuthMiddleware";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <StateContextProvider>
          <ThemeProvider theme={theme}>
            <AuthMiddleware>
              <App />
            </AuthMiddleware>
            {/* <AppTesting /> */}
            <ReactQueryDevtools />
          </ThemeProvider>
        </StateContextProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
