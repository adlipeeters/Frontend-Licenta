import React from "react";
import images from "../../constants/images";
import { Player } from "@lottiefiles/react-lottie-player";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useLocation } from "react-router-dom";
import LandingAppBar from "../../components/Header&Sidebar/LandingAppBar";
import { Button, Container, Grid, Typography } from "@mui/material";
import "./Welcome.css";

interface LandingProps {}

const Landing: React.FunctionComponent<LandingProps> = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div
      style={{
        // backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%",
        backgroundImage: "linear-gradient(to right, #9155FD 0%, #2575fc 100%",
        // height: `calc(100vh-64px)`,
        height: "100vh",
      }}
    >
      <Container>
        <LandingAppBar />
        <div className="fullHeight">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* <Item>xs=6 md=8</Item> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: "600" }}
                  >
                    Start saving your money
                    <br /> right now
                  </Typography>
                  <Typography sx={{ color: "white" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nulla magnam sequi nemo deleniti modi molestias dolor
                    ducimus similique sapiente amet!
                  </Typography>
                  <div>
                    <Link to="pricing" style={{ textDecoration: "none" }}>
                      <Button
                        className="getStartedBtn"
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          padding: "10px 30px",
                          // border: "1px solid white",
                        }}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {/* <Player src={images.landing_lottie} loop autoplay /> */}
                {/* <Player src={images.landing_lottie_second_violet} loop autoplay /> */}
                <Player
                  src={images.landing_lottie_second_violet}
                  loop
                  autoplay
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
