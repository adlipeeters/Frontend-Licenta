import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../../api/transactions/transactions";
import _ from "lodash";
import { parseISO, format, isThisMonth } from "date-fns";

interface StatisticsCardProps {}

const Div = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  gap: "20px",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const StatisticsCard: React.FunctionComponent<StatisticsCardProps> = () => {
  const theme = useTheme();

  const [filteredByCategory, setFiltered] = React.useState<[]>([]);

  const query = useQuery(["transactionsData"], () => getTransactions(), {
    retry: 1,
    onSuccess: (data) => {},
    onError: (error: any) => {},
  });

  React.useEffect(() => {
    let filter: any = [];
    if (query.data) {
      const groupedData = _.groupBy(query.data, "category.name");
      for (let obj in groupedData) {
        let totalAmount = 0;
        let type = "";
        for (let transaction of groupedData[obj]) {
          if (isThisMonth(parseISO(transaction.createdAt))) {
            totalAmount += transaction.amount;
            type = transaction.type;
          }
        }
        filter.push({ category: obj, type: type, total: totalAmount });
      }
    }
    if (filter.length !== 0) {
      setFiltered(filter);
    }
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
          Transactions by Category this Month
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
          <span style={{ color: theme.palette.grey[600], fontWeight: 600 }}>
            Total 48.5% growth
          </span>{" "}
          😎 this month<code style={{ color: "red" }}>(Modify THIS)</code>
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "35px" }}>
        {/* <Button size="small" variant="contained">
          View More
        </Button> */}
        <Div>
          {filteredByCategory.map((item: any) => (
            <div style={{ display: "flex", gap: "10px" }} key={item.category}>
              <div
                style={{
                  background:
                    item.type === "income"
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                  borderRadius: "5px",
                  height: "45px",
                  width: "45px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.type === "income" ? (
                  <TrendingUpIcon sx={{ color: "white" }} />
                ) : (
                  <TrendingDownIcon sx={{ color: "white" }} />
                )}
              </div>
              <div>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: theme.palette.grey[600],
                    fontWeight: "light",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  {item.category}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <span>RON&nbsp;</span>
                  {item.total}
                </Typography>
              </div>
            </div>
          ))}
          {/* <div style={{ display: "flex", gap: "10px" }}>
          <div
          style={{
            background: theme.palette.success.main,
            borderRadius: "5px",
                height: "45px",
                width: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TrendingUpIcon sx={{ color: "white" }} />
            </div>
            <div>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: theme.palette.grey[600],
                  fontWeight: "light",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Sales
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                245k
              </Typography>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                background: theme.palette.warning.main,
                borderRadius: "5px",
                height: "45px",
                width: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TrendingUpIcon sx={{ color: "white" }} />
            </div>
            <div>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: theme.palette.grey[600],
                  fontWeight: "light",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Sales
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                245k
              </Typography>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                background: theme.palette.info.main,
                borderRadius: "5px",
                height: "45px",
                width: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TrendingUpIcon sx={{ color: "white" }} />
            </div>
            <div>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: theme.palette.grey[600],
                  fontWeight: "light",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Sales
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                245k
              </Typography>
            </div>
          </div> */}
        </Div>
      </CardActions>
    </>
  );
};

export default StatisticsCard;
