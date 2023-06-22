import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import IncomVsExpenseChart from "./Chart";

interface ReportProps {}

const Report: any = (props: any) => {
  return (
    <Box>
      <IncomVsExpenseChart data={props.data} />
    </Box>
  );
};

export default Report;
