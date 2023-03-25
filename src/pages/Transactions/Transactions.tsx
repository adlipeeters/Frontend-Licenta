import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactions/transactions";

interface TransactionsProps {}

const Transactions: React.FunctionComponent<TransactionsProps> = () => {
  const query = useQuery(["transactionsData"], () => getTransactions(), {
    retry: 1,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error.response.status);
    },
  });
  return <></>;
};

export default Transactions;
