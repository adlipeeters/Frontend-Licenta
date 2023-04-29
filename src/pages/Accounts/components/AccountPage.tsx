import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import EditAccount from "./EditAccount";
import TransactionsByAccount from "./TransactionsByAccount";
import { getTransactions } from "../../../api/transactions/transactions";
import { useState, useEffect } from "react";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  position: "relative",
  // height: "100%",
}));

interface AccountPageProps {}

const AccountPage: React.FunctionComponent<AccountPageProps> = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState();

  const query = useQuery(["transactionsData"], () => getTransactions(), {
    retry: 1,
    onSuccess: (data) => {},
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  useEffect(() => {
    let filteredTransactions: any = [];
    if (query?.isSuccess) {
      query?.data?.map((transaction: any) => {
        if (transaction.account.id === Number(id)) {
          filteredTransactions.push(transaction);
        }
      });
      setTransactions(filteredTransactions);
    }
  }, [query?.data, query?.isSuccess, id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>
            <EditAccount id={id} />
          </Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item style={{ height: "100%" }}>
            <TransactionsByAccount
              transactions={transactions}
              isLoading={query.isLoading}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountPage;
