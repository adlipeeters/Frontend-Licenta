import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { format, parseISO } from "date-fns";
import ReportFilter from "./components/Filter";
import Report from "./components/Report";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactions/transactions";
import { calcExpenseVsIncome } from "./Helper";

interface ReportsProps {}

const ReportWrapper = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  // textAlign: "center",
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  background: "white",
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

const Reports: React.FunctionComponent<ReportsProps> = () => {
  const theme = useTheme();
  const [type, setType] = React.useState(0);
  const [accounts, setAccounts] = React.useState([]);
  const [excludeCategories, setExcludeCategories] = React.useState([]);
  const [period, setPeriod] = useState<null | any | Date>(new Date());
  const [data, setData] = useState<null | any | Date>(null);

  const query = useQuery(["transactionsData"], () => getTransactions(), {
    retry: 1,
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  React.useEffect(() => {
    if (query.data) {
      const data = calcExpenseVsIncome(
        query.data,
        period,
        accounts,
        excludeCategories
      );
      setData(data);
    }
  }, [query.data, period, accounts, excludeCategories]);

  return (
    <ReportWrapper>
      {/* Filter */}
      <ReportFilter
        type={type}
        period={period}
        accounts={accounts}
        setType={setType}
        setPeriod={setPeriod}
        setAccounts={setAccounts}
      />
      <Divider light sx={{ paddingY: "5px" }} />
      <Report data={data} />
      {/* <Divider light sx={{ paddingY: "5px" }} />
      <div style={{ background: theme.palette.grey[50] }}>Report Footer</div> */}
    </ReportWrapper>
  );
};

export default Reports;
