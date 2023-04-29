import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Divider, IconButton, ListItemButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  readAllNotifications,
} from "../../api/notifications/notifications";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SecurityIcon from "@mui/icons-material/Security";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { format } from "date-fns";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Notifications() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [unreadNotifications, setUnreadNotifications] = React.useState<
    number | 0
  >(0);
  const open = Boolean(anchorEl);

  const queryClient = useQueryClient();

  const query = useQuery(["notificationsData"], () => getNotifications(), {
    retry: 1,
    refetchInterval: 5000,
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  const readMutation = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: (data) => {
      toast.success("Notifications read successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["notificationsData"], { exact: true });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message, {
        position: "top-right",
      });
    },
  });

  const readNotifications = () => {
    readMutation.mutate();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    let total = 0;
    if (query?.data) {
      query.data.map((item: any) => {
        if (item.isRead === 0) {
          total += 1;
        }
      });
    }
    setUnreadNotifications(total);
  }, [query.data]);

  let notifications;

  if (query?.isLoading) {
    notifications = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  // export enum NotificationType {
  //   PASSWORD_CHANGE = 'password_change',
  //   ISSUING_SCHEDULED_TRANSACTION = 'issuing_scheduled_transaction',
  //   SUBSCRIPTION_EXPIRATION = 'subscription_expiration',
  // }

  const notificationIcon = (type: any) => {
    switch (type) {
      case "password_change":
        return <SecurityIcon color="info" fontSize="large" />;
      case "issuing_scheduled_transaction":
        return <AccountBalanceIcon color="info" fontSize="large" />;
      default:
        return <MarkChatUnreadIcon />;
    }
  };

  if (query?.data) {
    notifications = (
      <>
        {query.data.map((item: any) => (
          <ListItem
            alignItems="flex-start"
            key={item.id}
            sx={{ padding: "0px" }}
          >
            <ListItemButton>
              <ListItemAvatar>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                {notificationIcon(item.type)}
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      // sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}
                    </Typography>
                    {" — " + item.description}
                  </React.Fragment>
                }
              />
              {item.isRead === 0 ? <Badge color="error" variant="dot" /> : ""}
            </ListItemButton>
          </ListItem>
        ))}
      </>
    );
  }

  return (
    <div style={{ marginRight: "20px" }}>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={unreadNotifications} color="error">
          <NotificationsNoneIcon sx={{ color: theme.palette.grey[800] }} />
        </Badge>
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
            width: 350,
            boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
          },
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[600],
            padding: "5px 15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Notifications</span>
          <span
            style={{
              fontSize: "12px",
              color: "white",
              background: theme.palette.primary.main,
              borderRadius: "20px",
              padding: "2px 12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {unreadNotifications} New
          </span>
        </Typography>
        <Divider sx={{ paddingY: "5px" }} />
        <PerfectScrollbar>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              // overflow: "auto",
              maxHeight: 300,
            }}
          >
            {notifications}
          </List>
        </PerfectScrollbar>
        <Divider sx={{ paddingY: "5px" }} />
        <div style={{ padding: "10px 15px 5px" }}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={readNotifications}
          >
            READ ALL NOTIFICATIONS
            {/* <MarkEmailReadIcon sx={{ marginLeft: "5px" }} /> */}
          </Button>
        </div>
      </Menu>
    </div>
  );
}
