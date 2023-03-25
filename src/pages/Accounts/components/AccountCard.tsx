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

const Item = styled(Card)(({ theme }) => ({
  // background: theme.palette.grey[300],
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  position: "relative",
  height: "100%",
  width: "100%",
}));

export default function ActionAreaCard(props: any) {
  const theme = useTheme();

  return (
    <Item sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image={images.avatar}
          alt="account"
        /> */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              color: theme.palette.primary.main,
              alignItems: "center",
              gap: "5px",
            }}
          >
            <CreditCardIcon />
            {props.data.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              color: theme.palette.text.secondary,
            }}
          >
            Current Balance: {props.data.amount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ float: "right" }}>
        <Button
          size="small"
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            <Link
              to={`/accounts/${props.data.id}`}
              style={{
                color: theme.palette.primary.main,
                fontWeight: 500,
                textDecoration: "none",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LinkIcon />
            </Link>
          </Typography>
        </Button>
      </CardActions>
    </Item>
  );
}
