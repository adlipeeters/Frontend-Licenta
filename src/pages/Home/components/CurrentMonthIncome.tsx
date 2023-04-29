import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { getTransactions } from "../../../api/transactions/transactions";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { parseISO, format, isThisMonth } from "date-fns";
import { Link } from "react-router-dom";

interface CurrentMonthIncomeProps {}

const CurrentMonthIncome: React.FunctionComponent<
  CurrentMonthIncomeProps
> = () => {
  const theme = useTheme();
  const query = useQuery(["transactionsData"], () => getTransactions(), {
    retry: 1,
    onSuccess: (data) => {},
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  const income = useMemo(() => {
    if (query.data) {
      return query.data.reduce((total: any, tr: any) => {
        if (tr.type === "income") {
          if (isThisMonth(parseISO(tr.createdAt))) {
            return total + tr.amount;
          }
        }
        return total;
      }, 0);
    }
    return 0;
  }, [query.data]);

  return (
    <>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "start",
            color: theme.palette.grey[800],
          }}
        >
          Current month income
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "start",
            color: theme.palette.grey[500],
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          Current month income
        </Typography>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "start",
            color: theme.palette.primary.main,
            marginTop: "20px",
            // fontSize: "20px",
          }}
        >
          RON {income}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/transactions" style={{ textDecoration: "none" }}>
          <Button size="small" variant="contained">
            View More
          </Button>
        </Link>
      </CardActions>
    </>
  );
};

export default CurrentMonthIncome;
