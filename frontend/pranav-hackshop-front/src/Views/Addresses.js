import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link as ReactLink } from "react-router-dom";

import HackContext from "../Context/HackContext";
import { AddressItem } from "../Components";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Fab, Grid, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Masonry from "react-masonry-css";

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
  innerContainer: {
    borderRadius: theme.spacing(0.5),
    border: "1px solid black",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  card: {
    borderRadius: "20px",
  },
  text: {
    color: "#385EFC",
  },
  icon: {
    color: "#F7C09E",
    backgroundColor: "#385EFC",
    border: "1px solid #385EFC",
    "&:hover": {
      backgroundColor: "#F7C09E",
      color: "#385EFC",
    },
  },
  heading: {
    fontFamily: "IBM Plex Mono",
  },
}));

const Addresses = () => {
  const classes = useStyles();
  const { addresses, getAddresses } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);
  const breakpoints = {
    default: 2,
    800: 1,
  };

  useEffect(() => {
    (async () => {
      const res = await getAddresses();
      setRedirect(!res);
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <Container className={classes.container} maxWidth="lg">
      <Box
        component={Grid}
        className={classes.container1}
        boxShadow={3}
        container
        justifyContent="flex-start"
      >
        <Grid item>
          <Typography className={classes.heading} component="h1" variant="h5">
            Your Addresses
          </Typography>
        </Grid>
      </Box>
      {!addresses.length ? (
        <Container className={classes.innerContainer} maxWidth="sm">
          <Typography variant="body1">You Have No Stored Addresses</Typography>
        </Container>
      ) : (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {addresses.map((address) => {
            return (
              <div className={classes.card} key={address._id}>
                <AddressItem address={address} />
              </div>
            );
          })}
        </Masonry>
      )}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Fab
            component={ReactLink}
            to={{
              pathname: "/user/address/add",
              state: { from: "/user/address" },
            }}
            // to="/user/address/add"
            className={classes.icon}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Addresses;
