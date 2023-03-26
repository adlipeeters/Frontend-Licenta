import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactions/transactions";
import TransactionsTable from "./components/Table";
import CircularLoader from "../../components/Loader/CircularLoader";
import { Box, Button } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";

interface TransactionsProps {}

const Transactions: React.FunctionComponent<TransactionsProps> = () => {
  const [open, setOpen] = React.useState(false);
  const query = useQuery(["transactionsData"], () => getTransactions(), {
    retry: 1,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error.response.status);
    },
  });

  if (query.isLoading || query.isError) {
    return <CircularLoader />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          marginBottom: "15px",
          "&:hover": {
            // backgroundColor: theme.palette.success.light,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <AddCardIcon />
        Add Account
      </Button>
      <TransactionsTable data={query.data} />
    </Box>
  );
};

export default Transactions;
