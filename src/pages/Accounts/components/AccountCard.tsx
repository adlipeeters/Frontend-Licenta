import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import images from "../../../constants/images";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import LinkIcon from "@mui/icons-material/Link";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Tooltip from "@mui/material/Tooltip";

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  position: "relative",
  height: "100%",
  width: "100%",
}));

export default function ActionAreaCard(props: any) {
  const theme = useTheme();

  return (
    <Item>
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
          {props.data.name}
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
          Current balance
          <span style={{ color: theme.palette.primary.main }}>&nbsp;(RON)</span>
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
          {props.data.amount}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Click for more information">
          <Link
            to={`/accounts/${props.data.id}`}
            style={{
              color: "white",
              fontWeight: 500,
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button size="small" variant="contained">
              <LinkIcon />
            </Button>
          </Link>
        </Tooltip>
      </CardActions>
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
    </Item>
  );
}
