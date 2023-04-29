import { Outlet } from "react-router-dom";
import LandingAppBar from "../Header&Sidebar/LandingAppBar";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";

interface LandingLayoutProps {}

const LandingLayout: React.FunctionComponent<LandingLayoutProps> = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" ? (
        <Container>
          <LandingAppBar />
        </Container>
      ) : (
        ""
      )}
      <Outlet />
    </>
  );
};

export default LandingLayout;
