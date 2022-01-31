import React, { useContext } from "react";

import HackContext from "../Context/HackContext";

import { Link as ReactLink } from "react-router-dom";

import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import fourOFour from "../Media/404.svg";
import wrong from "../Media/WentWrong.svg";
import denied from "../Media/AccessDenied.svg";
import success from "../Media/PaymentSuccess.svg";
import failed from "../Media/PaymentFailed.svg";

const types = {
  "Not Found": fourOFour,
  "Something Went Wrong": wrong,
  "Access Denied": denied,
  "Order Confirmed": success,
  "Payment Failed": failed,
  "User Verified": success,
  "Verification Failed": failed,
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  box: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "700px",
    marginBottom: "20px",
  },
  src: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: "30px",
  },
  link: {
    color: "#7C6E60",
    textDecoration: "underline",
  },
}));

const SvgInfo = ({ type }) => {
  const stateData = useContext(HackContext);
  const classes = useStyles();

  let redirect = "/";

  if (stateData.isAuth && stateData.token) {
    if (stateData.user.role === "admin") {
      redirect = "/admin";
    }
  }

  return (
    <Container className={classes.container}>
      <Container className={classes.box}>
        <img alt={type} className={classes.src} src={types[type]} />
      </Container>
      <Typography className={classes.text} align="center" varaint="h3">
        {type}
      </Typography>
      <Box display="flex" justifyContent="center">
        <Typography
          component={ReactLink}
          to={redirect}
          className={classes.link}
          align="center"
          varaint="body1"
        >
          Continue Shopping
        </Typography>
      </Box>
    </Container>
  );
};

export default SvgInfo;
