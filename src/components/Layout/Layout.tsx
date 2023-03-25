import React from "react";
import HeaderSidebar from "../Header&Sidebar/HeaderSidebar";
import withAuth from "../withAuth";

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
  return (
    <>
      <div>
        <HeaderSidebar />
      </div>
    </>
  );
};

// export default withAuth(Layout);
export default Layout;
