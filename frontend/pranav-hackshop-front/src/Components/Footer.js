import React from "react";
import { Link as ReactLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@material-ui/core";

import StoreIcon from "@material-ui/icons/Store";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import { Copyright } from "../Components";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#F7C09E",
  },
  overflow: {
    overflowX: "hidden",
    overflowY: "hidden",
    marginTop: "auto",
    backgroundColor: "#385EFC",
    color: "#F7C09E",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      className={classes.overflow}
    >
      <Grid container spacing={5}>
        <Grid item md={7} sm={10}>
          <Typography variant="h4">HackShop</Typography>
          <br />
          <Typography variant="body1">
            HackShop is a cooperative portfolio project from The Hacking School
            - Web Development Bootcamp graduating students. We developed this
            website from scratch, which includes the backend and the frontend.
            It is based on M-E-R-N stack.
          </Typography>
        </Grid>
        <Grid item md={5} sm={6}>
          <Typography variant="h4">Discover</Typography>
          <List className={classes.list}>
            <ListItem component={ReactLink} to="/shop" className={classes.link}>
              <ListItemIcon className={classes.link}>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Shop" />
            </ListItem>
            <ListItem component={ReactLink} to="/user" className={classes.link}>
              <ListItemIcon className={classes.link}>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
            <ListItem
              component={ReactLink}
              to="/contact"
              className={classes.link}
            >
              <ListItemIcon className={classes.link}>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Navbar;
