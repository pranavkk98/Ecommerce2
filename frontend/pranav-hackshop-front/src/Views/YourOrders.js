import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import HackContext from "../Context/HackContext";

import { Container, Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { YourOrder } from "../Components";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  container1: {
    padding: theme.spacing(2),
    alignSelf: "left",
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(6),
  },
  heading: {
    fontFamily: "IBM Plex Mono",
  },
  innerContainer: {
    borderRadius: "8px",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
    maxWidth: "900px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const YourOrders = () => {
  const classes = useStyles();
  const { yourOrders, getYourOrders } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getYourOrders();
      setRedirect(!res);
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <Container>
      <Box
        component={Grid}
        boxShadow={3}
        className={classes.container1}
        container
        justifyContent="flex-start"
      >
        <Grid item>
          <Typography className={classes.heading} component="h1" variant="h5">
            Your Orders
          </Typography>
        </Grid>
      </Box>
      <Box
        component={Container}
        boxShadow={2}
        className={classes.innerContainer}
      >
        {!yourOrders.length ? (
          <Typography variant="body1">You Have No Previous Orders</Typography>
        ) : (
          yourOrders.map((order) => {
            return <YourOrder order={order} />;
          })
        )}
      </Box>
    </Container>
  );
};

export default YourOrders;
