import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CurrentMonthIncome from "./components/CurrentMonthIncome";
import StatisticsCard from "./components/StatisticsCard";
import Card from "@mui/material/Card";
import images from "../../constants/images";
import ExpenseOverview from "./charts/ExpenseOverview";
import TotalEarning from "./components/TotalEarning";

interface HomeProps {}

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  position: "relative",
  height: "100%",
}));

const Home: React.FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>
            <CurrentMonthIncome />
            <img
              src={images.triangle_light}
              alt="triangle-light"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                maxHeight: "90%",
              }}
            />
            <img
              src={images.trophy}
              alt="triangle-light"
              style={{
                position: "absolute",
                bottom: 0,
                right: 20,
                maxHeight: "50%",
                top: "60%",
                transform: "translateY(-50%)",
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>
            <StatisticsCard />
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Item>
            <ExpenseOverview />
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <TotalEarning />
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item></Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
