import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { parseISO, format } from "date-fns";
import _ from "lodash";

export default function TransactionsByAccount(props: any) {
  // const groupedData = _.groupBy(props.transactions, "category.name");
  // console.log(groupedData);
  // const grouped = data.reduce((result, item) => {
  //   const categoryName = item.category.name;
  //   if (!result[categoryName]) {
  //     result[categoryName] = [];
  //   }
  //   result[categoryName].push(item);
  //   return result;
  // }, {});
  const theme = useTheme();
  if (props.isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (props?.transactions?.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        {/* <HourglassEmptyIcon sx={{ color: theme.palette.primary.dark }} /> */}
        <h3 style={{ color: theme.palette.primary.dark }}>No Transactions</h3>
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.transactions !== undefined &&
        props?.transactions.map((transaction: any) => (
          <ListItem key={transaction.id}>
            <ListItemAvatar>
              <Avatar>
                {transaction.type === "income" ? (
                  <TrendingUpIcon sx={{ color: theme.palette.success.dark }} />
                ) : (
                  <TrendingDownIcon sx={{ color: theme.palette.error.dark }} />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transaction.amount + " RON"}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {format(parseISO(transaction.createdAt), "MMMM dd, yyyy")}
                  </Typography>
                  &nbsp;&nbsp;{transaction?.category?.name}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
    </List>
  );
}
