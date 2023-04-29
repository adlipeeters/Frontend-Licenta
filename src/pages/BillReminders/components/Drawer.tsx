import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function TemporaryDrawer(props: any) {
  return (
    <div>
      <Drawer
        anchor="right"
        open={props.open}
        onClose={() => props.setOpen({ ...props.open, state: false })}
      >
        <Box sx={{ padding: "20px 25px", maxWidth: "370px" }}>
          {props.children}
        </Box>
        {/* {list(anchor)} */}
      </Drawer>
    </div>
  );
}
