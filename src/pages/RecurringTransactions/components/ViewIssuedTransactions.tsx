import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getScheduledTransaction } from "../../../api/scheduled-transactions/scheduled-transactions";
import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { format, parseISO } from "date-fns";
import React from "react";

interface ViewIssuedTransactionsProps {}

function ViewIssuedTransactions(props: any) {
  const theme = useTheme();
  const handleClose = () => {
    props.setOpen((prevState: any) => ({ id: "", state: false }));
  };

  const transactionQuery = useQuery({
    queryKey: ["scheduledTransactionsData", props.open.id],
    enabled: props.open.id != null,
    queryFn: () => getScheduledTransaction(Number(props.open.id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <div>
        <Dialog open={props.open.state} onClose={handleClose} fullWidth={true}>
          <DialogTitle>View issued Transactions</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {transactionQuery.data &&
                transactionQuery.data.transactions.map((transaction: any) => (
                  <ListItem key={transaction.id}>
                    <ListItemAvatar>
                      <Avatar>
                        {transaction.type === "income" ? (
                          <TrendingUpIcon
                            sx={{ color: theme.palette.success.dark }}
                          />
                        ) : (
                          <TrendingDownIcon
                            sx={{ color: theme.palette.error.dark }}
                          />
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
                            {format(
                              parseISO(transaction.createdAt),
                              "MMMM dd, yyyy"
                            )}
                          </Typography>
                          &nbsp;&nbsp;{transaction?.category?.name}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ViewIssuedTransactions;
