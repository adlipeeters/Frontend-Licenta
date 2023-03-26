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

export default function ButtonAppBar() {
  const [cookies] = useCookies(["logged_in"]);

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Wallet App
            </Link>
          </Typography>
          {!!cookies.logged_in ? (
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", marginLeft: "15px" }}
            >
              <Button
                color="inherit"
                sx={{ color: "white", borderRadius: "10px" }}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{ color: "white", borderRadius: "10px" }}
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
                  sx={{ color: "white", borderRadius: "10px" }}
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
