import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
interface CurrentMonthIncomeProps {}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

const CurrentMonthIncome: React.FunctionComponent<
  CurrentMonthIncomeProps
> = () => {
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
          $42.8k
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          View More
        </Button>
      </CardActions>
    </>
  );
};

export default CurrentMonthIncome;
