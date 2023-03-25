import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import images from "../../../constants/images";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

interface TotalEarningProps {}

const Div = styled(Card)(({ theme }) => ({
  flexGrow: 1,
  boxShadow: "none",
}));

const BottomElement = () => {
  const theme = useTheme();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "40px",
              width: "40px",
              background: theme.palette.grey[200],
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <img
              src={images.logo_zipcar}
              style={{ maxWidth: "100%" }}
              alt="alt"
            />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              Title
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "start",
                fontWeight: "light",
                fontSize: "12px",
              }}
            >
              Subtitle
            </Typography>
          </div>
        </div>
        <div>
          <Typography sx={{ color: theme.palette.grey[800] }}>
            $24,895.65
          </Typography>
          <div
            style={{
              width: "100%",
              height: "5px",
              background: theme.palette.primary.main,
              marginTop: "5px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

const TotalEarning: React.FunctionComponent<TotalEarningProps> = () => {
  const theme = useTheme();

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
            Total Earning
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                color: theme.palette.grey[700],
                marginTop: "25px",
                fontWeight: 700,
                fontSize: "32px",
              }}
            >
              $24.895
              <ArrowDropUpIcon
                sx={{ color: theme.palette.success.main, fontSize: "32px" }}
              />
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  color: theme.palette.success.main,
                  fontWeight: "600",
                }}
              >
                10%
              </Typography>
            </Typography>
          </div>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "start",
              color: theme.palette.grey[500],
              fontSize: "12px",
              fontWeight: "light",
            }}
          >
            Compared to $84,325 last year
          </Typography>
        </Box>
        <Box
          flexGrow={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            gap: "15px",
            marginTop: "40px",
          }}
        >
          {[1, 2, 3].map((el, index) => (
            <BottomElement key={index} />
          ))}
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small" variant="contained">
          View More
        </Button>
      </CardActions> */}
    </>
  );
};

export default TotalEarning;
