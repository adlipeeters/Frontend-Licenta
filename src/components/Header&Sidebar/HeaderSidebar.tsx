import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Outlet, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import images from "../../constants/images";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfileImage, logout } from "../../api/auth/auth";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/AuthUserContext";
import { Button, CircularProgress } from "@mui/material";
import Notifications from "./Notifications";
import SidebarLinks from "./SidebarLinks";

const drawerWidth = 300;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const navigate = useNavigate();
  const stateContext = useStateContext();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data: any) => {
      // stateContext.dispatch({ type: "SET_USER", payload: data });
      navigate("/login");
      toast.success("Logout successfully!", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message, {
        position: "top-right",
      });
    },
  });
  const profileImage = useQuery(
    ["profileImage"],
    () => getProfileImage(stateContext.state.authUser?.profileImage),
    {
      retry: 1,
      onSuccess: (image) => {},
      onError: (error: any) => {},
    }
  );
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div style={{ height: "100%", position: "relative" }}>
      {/* <Toolbar /> */}
      <Link to="dashboard" style={{ textDecoration: "none" }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            paddingY: "30px",
            color: theme.palette.grey[700],
            // color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "30px",
            paddingLeft: "12px",
          }}
        >
          <img src={images.logo} alt="" />
          Smart Wallet
        </Typography>
      </Link>
      <Divider />
      <List>
        <SidebarLinks event={handleDrawerToggle} />
      </List>
      <Divider />
      <Button
        onClick={() => logoutMutation.mutate()}
        sx={{
          color: theme.palette.grey[600],
          width: "100%",
          position: "absolute",
          bottom: "20px",
        }}
      >
        <LogoutIcon sx={{ marginRight: "3px" }} />
        Logout
      </Button>
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          background: "transparent",
          paddingX: "25px",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            // background: theme.palette.primary.main,
            background: "white",
            borderRadius: "5px",
            marginTop: "10px",
            boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon sx={{ color: theme.palette.grey[800] }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: theme.palette.grey[800], flexGrow: 1 }}
          >
            {/* Responsive drawer */}
          </Typography>
          <Notifications />
          {/* <IconButton>
            <NotificationsNoneIcon sx={{ color: theme.palette.grey[800] }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu> */}
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {/*  */}
            {profileImage.isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={profileImage.data}
                sx={{ width: 45, height: 45 }}
              />
            )}
            {/*  */}
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              style: {
                width: 250,
                boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile-settings");
                handleClose();
              }}
              sx={{
                color: theme.palette.grey[600],
              }}
            >
              <PermIdentityIcon sx={{ marginRight: "3px" }} />
              Profile settings
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem
              onClick={() => logoutMutation.mutate()}
              sx={{ color: theme.palette.grey[600] }}
            >
              <LogoutIcon sx={{ marginRight: "3px" }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "65%",
              background: theme.palette.common.white,
              paddingRight: "15px",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
              // background: theme.palette.common.white,
              background: "white",
              boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
              paddingRight: "15px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          height: "100%",
          overflowX: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
