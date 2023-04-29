import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import images from "../../constants/images";

export default function ButtonAppBar() {
  const location = useLocation();

  console.log(location.pathname);
  const [cookies] = useCookies(["logged_in"]);

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          background: location.pathname === "/" ? "transparent" : "",
          boxShadow: location.pathname === "/" ? "none" : "",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "600" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {/* <img src={images.logo} alt="" style={{ color: "white" }} /> */}
              SMART WALLET
            </Link>
          </Typography>
          {!!cookies.logged_in ? (
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", marginLeft: "15px" }}
            >
              <Button
                color="inherit"
                sx={{ color: "white", borderRadius: "10px", fontWeight: "600" }}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "600",
                  }}
                >
                  Register
                </Button>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", marginLeft: "15px" }}
              >
                <Button
                  color="inherit"
                  sx={{
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
