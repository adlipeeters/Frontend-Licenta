import React, { useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { calcExpenses } from "./Helper";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../../api/transactions/transactions";
import _ from "lodash";

interface ExpenseOverviewProps {}
type ChartData = {
  categories: any;
  data: any;
};
const ExpenseOverview: React.FunctionComponent<ExpenseOverviewProps> = () => {
  const theme = useTheme();
  const chartRef = useRef(null);

  // const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartState, setChartState] = useState<any | null>({
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
        // data: [],
      },
    ],
  });

  const query = useQuery(["transactionsData"], () => getTransactions(), {
    retry: 1,
    onSuccess: (data) => {},
    onError: (error: any) => {},
  });

  const fake = [1, 2, 3, 4, 5, 6, 7];

  React.useEffect(() => {
    if (query.data) {
      const data = calcExpenses(query.data);

      setChartState({
        options: {
          chart: {
            id: "basic-bar",
            type: "line",
            events: {
              beforeZoom: function (ctx: any) {
                // we need to clear the range as we only need it on the iniital load.
                ctx.w.config.xaxis.range = 1;
              },
            },
          },
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: true,
            autoScaleXaxis: true,
            zoomedArea: {
              fill: {
                color: "#90CAF9",
                opacity: 0.4,
              },
              stroke: {
                color: "#0D47A1",
                opacity: 0.4,
                width: 1,
              },
            },
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              customIcons: [],
            },
          },
          xaxis: {
            categories: data ? data.categories : [],
            stroke: {
              width: 2,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 9,
              columnWidth: "20%",
              endingShape: "rounded",
              startingShape: "rounded",
            },
          },
          colors: [theme.palette.primary.main],
          stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            // colors: undefined,
            width: 3,
            dashArray: 0,
          },
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
            name: "Total",
            data: data
              ? data.series.map((value) => {
                  if (typeof value !== "number") {
                    return Number(value);
                  }
                  return value;
                })
              : [],
          },
        ],
      });
    }
  }, [query.data]);

  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box flexGrow={1}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "start",
              color: theme.palette.grey[800],
            }}
          >
            Overview of monthly expenses
          </Typography>
          <Chart
            ref={chartRef}
            options={chartState.options}
            series={chartState.series}
            type="line"
            height="100%"
          />
          <Button variant="contained" sx={{ width: "100%" }}>
            Details
          </Button>
        </Box>
      </CardContent>
    </>
  );
};

export default ExpenseOverview;
