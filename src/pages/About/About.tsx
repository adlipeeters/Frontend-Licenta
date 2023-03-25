import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../context/AuthUserContext";

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = () => {
  const stateContext = useStateContext();
  // console.log(stateContext);
  const [message, setMessage] = useState("");
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      setMessage("The number is " + number);
    } else {
      setMessage("There is no number provided");
    }
  }, []);

  return (
    <div>
      <Typography>About pageasdasdasdasdasdasdasdasdasdasdasdasdasd</Typography>
      <p>{message}</p>
    </div>
  );
};

export default About;
