import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
interface ExpenseOverviewProps {}

const ExpenseOverview: React.FunctionComponent<ExpenseOverviewProps> = () => {
  const theme = useTheme();
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      plotOptions: {
        bar: {
          borderRadius: 9,
          //   distributed: true,
          columnWidth: "40%",
          endingShape: "rounded",
          startingShape: "rounded",
        },
      },
      colors: [theme.palette.primary.main],
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "20px",
          colors: ["red"],
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });
  return (
    <>
      <div style={{ padding: "8px", height: "100%" }}>
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height="100%"
        />
        <Button variant="contained" sx={{ width: "100%" }}>
          Details
        </Button>
      </div>
    </>
  );
};

export default ExpenseOverview;
