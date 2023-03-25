import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "../../api/accounts/accounts";
import AccountCard from "./components/AccountCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import Modal from "../../components/Dialog/Dialog";
import { useTheme } from "@mui/material/styles";
import CreateAccount from "./components/CreateAccount";

interface AccountsProps {}

const Accounts: React.FunctionComponent<AccountsProps> = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const query = useQuery(["accountsData"], () => getAccounts(), {
    retry: 1,
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  if (query.isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        // variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          // background: theme.palette.success.main,
          // color: "white",
          "&:hover": {
            // backgroundColor: theme.palette.success.light,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <AddCardIcon />
        Add Account
      </Button>
      <Grid container spacing={2} sx={{ marginTop: "0" }}>
        {query.data.map((account: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            xl={3}
            key={account.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AccountCard data={account} />
          </Grid>
        ))}
      </Grid>
      <CreateAccount open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Accounts;
