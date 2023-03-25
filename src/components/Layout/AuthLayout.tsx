import React from "react";
import { Outlet } from "react-router-dom";
interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </div>
  );
};

export default Layout;
