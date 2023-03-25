import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Tabs from "./components/Tabs";

interface ProfileProps {}

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  position: "relative",
  height: "100%",
}));

const Profile: React.FunctionComponent<ProfileProps> = () => {
  return (
    <Item>
      <Tabs />
    </Item>
  );
};

export default Profile;
