import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import GridViewIcon from "@mui/icons-material/GridView";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WalletIcon from "@mui/icons-material/Wallet";
import CategoryIcon from "@mui/icons-material/Category";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from '@mui/icons-material/Group';
import Diversity1Icon from '@mui/icons-material/Diversity1';
// export interface Route {
//   name: string;
//   link: string;
//   icon: React.ReactNode;
// }

const routes = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <GridViewIcon />,
    guard: ["user"],
  },
  {
    name: "Transactions",
    link: "/transactions",
    icon: <SyncAltIcon />,
    guard: ["user"],
  },
  {
    name: "Scheduled transactions",
    link: "/scheduled-transactions",
    icon: <EventRepeatIcon />,
    guard: ["user"],
  },
  {
    name: "Bill reminders",
    link: "/bill-reminders",
    icon: <DateRangeIcon />,
    guard: ["user"],
  },
  {
    name: "Accounts",
    link: "/accounts",
    icon: <WalletIcon />,
    guard: ["user"],
  },
  {
    name: "Categories",
    link: "/categories",
    icon: <CategoryIcon />,
    guard: ["user"],
  },
  {
    name: "Reports",
    link: "/reports",
    icon: <BarChartIcon />,
    guard: ["user"],
  },
  {
    name: "Budget (Coming soon)",
    link: "/budget",
    icon: <AccountBalanceIcon />,
    guard: ["user"],
  },
  {
    name: "Family access (Coming soon)",
    link: "/family-access",
    icon: <Diversity1Icon />,
    guard: ["user"],
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: <GroupIcon />,
    guard: ["admin"],
  },
  {
    name: "Blog",
    link: "/admin/blog",
    icon: <GroupIcon />,
    guard: ["admin"],
  },
  // { name: "About", link: "/about", icon: "" },
];

export default routes;
