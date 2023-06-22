import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ReportChartProps {}

const ReportChart: any = (props: any) => {
  // console.log(props?.data);
  const [series, setSeries] = useState([]);

  React.useEffect(() => {
    if (props?.data !== null) {
      setSeries(props?.data?.series);
    }
  }, [props.data]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: props?.data?.categories ? props?.data?.categories : [],
    },
    yaxis: {
      title: {
        text: "Amount",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "RON " + val;
        },
      },
    },
  };
  return (
    <Box>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </Box>
  );
};

export default ReportChart;
