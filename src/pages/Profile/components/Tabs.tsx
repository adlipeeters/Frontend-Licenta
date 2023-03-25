import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ProfileForm from "./ProfileForm";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { makeStyles, styled } from "@mui/material/styles";
import ProfilePassword from "./ProfilePassword";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          //   centered
        >
          <Tab
            //   icon={<PermIdentityIcon />}
            label="profile"
            {...a11yProps(0)}
          />
          <Tab
            // icon={<LockOpenIcon />}
            sx={{ fontWeight: "500" }}
            label="Security"
            {...a11yProps(1)}
          />
          {/* <Tab
            sx={{ fontWeight: "500" }}
            label="Item Three"
            {...a11yProps(2)}
          /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfilePassword />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}
