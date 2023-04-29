import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreateScheduledTransaction from "./components/CreateScheduledTransaction";
import { useQuery } from "@tanstack/react-query";
import CircularLoader from "../../components/Loader/CircularLoader";
import { getTransactions } from "../../api/transactions/transactions";
import { ScheduledTransactions } from "../../api/scheduled-transactions/scheduled-transactions";
import ScheduledTransactionsTable from "./components/Table";

interface AboutProps {}

const RecurringTransactions: React.FunctionComponent<AboutProps> = () => {
  const [open, setOpen] = React.useState(false);

  const query = useQuery(
    ["scheduledTransactionsData"],
    () => ScheduledTransactions(),
    {
      retry: 1,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: any) => {
        console.log(error.response.status);
      },
    }
  );

  if (query.isLoading || query.isError) {
    return <CircularLoader />;
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
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
        Schedule Transaction
      </Button>
      <ScheduledTransactionsTable data={query.data} />
      <CreateScheduledTransaction open={open} setOpen={setOpen} />
    </Box>
  );
};

export default RecurringTransactions;
