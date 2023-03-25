import React from "react";
import MailIcon from "@mui/icons-material/Mail";

export interface Route {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const routes: Route[] = [
  { name: "Dashboard", link: "/dashboard", icon: "home" },
  { name: "Accounts", link: "/accounts", icon: "" },
  { name: "Transactions", link: "/transactions", icon: "" },
  { name: "Categories", link: "/categories", icon: "" },
  { name: "About", link: "/about", icon: "about" },
];

export default routes;
