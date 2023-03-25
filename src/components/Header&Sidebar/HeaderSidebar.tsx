import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import routes from "../../constants/routes";
import { Outlet, useLocation, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import images from "../../constants/images";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfileImage, logout } from "../../api/auth/auth";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/AuthUserContext";
import { CircularProgress } from "@mui/material";

const drawerWidth = 240;

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

  const location = useLocation();

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 600,
          paddingY: "10px",
          color: theme.palette.grey[700],
        }}
      >
        Wallet App
      </Typography>
      <Divider />
      <List>
        {routes.map((item, index) => (
          <Link
            to={item.link}
            style={{ textDecoration: "none" }}
            onClick={() => handleDrawerToggle()}
            key={index}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                  color: theme.palette.text.primary,
                  marginY: "5px",
                }}
                style={{
                  background:
                    item.link.toString().toLocaleLowerCase() ===
                    location.pathname
                      ? theme.gradient.main
                      : " ",
                  color:
                    item.link.toString().toLocaleLowerCase() ===
                    location.pathname
                      ? "white"
                      : " ",
                  fontSize: "18px",
                }}
              >
                <ListItemIcon>{/* {item.icon} */}</ListItemIcon>
                {item.name}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
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
            Responsive drawer
          </Typography>
          <IconButton>
            <NotificationsNoneIcon sx={{ color: theme.palette.grey[800] }} />
          </IconButton>
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
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
