import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { styled } from "@mui/material/styles";

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
          Statistics Card
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
          😎 this month
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "35px" }}>
        {/* <Button size="small" variant="contained">
          View More
        </Button> */}
        <Div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                background: theme.palette.primary.main,
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
          </div>
        </Div>
      </CardActions>
    </>
  );
};

export default StatisticsCard;
