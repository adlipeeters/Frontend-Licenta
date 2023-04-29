import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import routes from "../../constants/routes";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useStateContext } from "../../context/AuthUserContext";

interface SidebarLinksProps {}

const SidebarLinks = (props: any) => {
  const location = useLocation();
  const theme = useTheme();
  const stateContext = useStateContext();
  return (
    <>
      {routes.map((item, index) => {
        if (item.guard.includes(stateContext?.state?.authUser?.role)) {
          return (
            <Link
              to={item.link}
              style={{ textDecoration: "none" }}
              onClick={() => props.event()}
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
                  <ListItemIcon
                    sx={{
                      color:
                        item.link.toString().toLocaleLowerCase() ===
                        location.pathname
                          ? "white"
                          : " ",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {item.name}
                </ListItemButton>
              </ListItem>
            </Link>
          );
        }
      })}
    </>
  );
};

export default SidebarLinks;
