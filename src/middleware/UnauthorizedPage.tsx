import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import images from "../constants/images";
import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

interface UnauthorizedProps {}

const Unauthorized = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
  // marginTop: "20%",
});

const UnauthorizedPage: React.FunctionComponent<UnauthorizedProps> = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Unauthorized>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: 500, color: theme.palette.grey[800] }}
        >
          401
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            color: theme.palette.grey[800],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Unauthorized
          <ReportProblemIcon
            sx={{ marginLeft: "10px", color: theme.palette.grey[800] }}
          />
        </Typography>
        <Typography
          sx={{
            color: theme.palette.grey[500],
            fontWeight: 300,
            marginTop: "10px",
          }}
        >
          You do not have the appropriate permissions to access this page !!!
        </Typography>
        <img
          src={images[404]}
          alt="404"
          style={{ maxWidth: isSmallScreen ? "350px" : "500px" }}
        />
        <Button
          onClick={() => navigate("/")}
          sx={{
            background: theme.palette.primary.light,
            color: "white",
            paddingX: "20px",
            "&:hover": {
              background: theme.palette.primary.main,
            },
          }}
        >
          BACK TO HOME
        </Button>
      </Container>
    </Unauthorized>
  );
};

export default UnauthorizedPage;
