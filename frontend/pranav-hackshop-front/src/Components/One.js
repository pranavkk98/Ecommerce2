import React, { useState, useEffect } from "react";

import { Link as ReactLink } from "react-router-dom";

import fashionGif from "../Media/FashionIllustration.gif";

import { Grid, Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90vh",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  smallContainer: {
    height: "80vh",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(10),
  },
  textContainer: {
    alignItems: "center",
    padding: theme.spacing(3),
    width: "80%",
  },
  gifContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    maxWidth: "40vw",
    maxheight: "80vh",
  },
  text: {
    fontFamily: "Hammersmith One",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    fontFamily: "Hammersmith One",
    borderRadius: "15px",
    marginTop: theme.spacing(1.5),
    border: "2px solid black",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));
const One = () => {
  const classes = useStyles();
  const [small, setSmall] = useState(window.innerWidth < 610);

  const handleResize = () => {
    setSmall(window.innerWidth < 610);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Grid
      className={small ? classes.smallContainer : classes.container}
      alignContent="center"
      alignItems="center"
      container
    >
      <Grid item xs={12} sm={6}>
        <Container className={classes.textContainer}>
          <Typography
            gutterBottom
            className={classes.text}
            component="h1"
            variant={small ? "h4" : "h3"}
          >
            Explore Real Quality
          </Typography>
          <Typography
            gutterBottom
            className={classes.text}
            variant={small ? "h6" : "h5"}
          >
            Our fashion empowers you to feel your best in everyday life.
          </Typography>
          <Button
            component={ReactLink}
            to="/shop"
            disableElevation
            variant="contained"
            size={small ? "small" : "medium"}
            className={classes.button}
          >
            Shop Now
          </Button>
        </Container>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Container className={classes.gifContainer} maxWidth="sm">
          <img className={classes.gif} src={fashionGif} alt="Fashion" />
        </Container>
      </Grid>
    </Grid>
  );
};

export default One;
