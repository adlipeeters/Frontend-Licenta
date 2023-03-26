import { Outlet } from "react-router-dom";
import LandingAppBar from "../Header&Sidebar/LandingAppBar";
import { Container } from "@mui/material";

interface LandingLayoutProps {}

const LandingLayout: React.FunctionComponent<LandingLayoutProps> = () => {
  return (
    <Container>
      <LandingAppBar />
      <Outlet />
    </Container>
  );
};

export default LandingLayout;
