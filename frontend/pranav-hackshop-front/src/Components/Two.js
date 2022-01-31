import React, { useState, useEffect } from "react";

import clothes from "../Media/Clothes.jpg";

import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "50vh",
    width: "100vw",
    margin: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  approvedContainer: {
    width: "80%",
  },
  approvedGrid: {
    height: "100%",
    width: "100%",
  },
  text: {
    fontFamily: "Hammersmith One",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: "15px",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  approveBox: {
    border: "2px groove black",
    borderRadius: "15px",
    display: "flex",
    height: "100%",
    width: "100%",
  },
  imgBox: {
    height: "100%",
    width: "100%",
    borderRadius: "15px",
    margin: theme.spacing(0),
    padding: theme.spacing(2),
    backgroundColor: "#72342B",
  },
}));

const Two = () => {
  const classes = useStyles();
  const [small, setSmall] = useState(window.innerWidth < 800);

  const handleResize = () => {
    setSmall(window.innerWidth < 800);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Grid className={classes.container} container spacing={2}>
      <Grid className={classes.imageContainer} item xs={12} sm={6}>
        <Box boxShadow={3} className={classes.imgBox}>
          <img className={classes.image} src={clothes} alt="Clothes" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.approvedGrid}>
        <Box boxShadow={3} className={classes.approveBox}>
          <Box m="auto" className={classes.approvedContainer}>
            <Typography
              align="center"
              gutterBottom
              component="h2"
              variant={small ? "h5" : "h4"}
              className={classes.text}
            >
              Customer Approved
            </Typography>
            <Typography
              align="center"
              gutterBottom
              component="h6"
              variant={small ? "body2" : "h6"}
              className={classes.text}
            >
              We want to develop an inspiring experience, synonymous with a
              sincere and intimate relationship with our clients. We are
              committed to leading a constant evolution to grow and offer
              collections that are more creative while always maintaining high
              quality.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Two;
