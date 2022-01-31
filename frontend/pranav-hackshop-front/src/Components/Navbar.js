import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";
import { Link as ReactLink } from "react-router-dom";

import logo from "../Media/HackShop.png";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "hsla(0,0%,100%,.2)",
    backdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",
  },
  toolbar: {
    flexWrap: "nowrap",
    justifyContent: "space-around",
  },
  link: {
    color: "#7C6E60",
  },
  logo: {
    height: "45%",
    width: "45%",
  },
  align: {
    textAlign: "center",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [small, setSmall] = useState(window.innerWidth < 550);

  const handleResize = () => {
    setSmall(window.innerWidth < 550);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <AppBar elevation={0} className={classes.appbar}>
      <Toolbar className={classes.toolbar} variant="regular">
        <Link
          className={classes.link}
          edge="start"
          component={ReactLink}
          to="/shop"
        >
          <Typography variant="h6">Shop</Typography>
        </Link>
        {!small && (
          <Link
            className={classes.link}
            edge="start"
            component={ReactLink}
            to="/contact"
          >
            <Typography variant="h6">Contact</Typography>
          </Link>
        )}
        <Link className={classes.align} component={ReactLink} to="/">
          <img className={classes.logo} src={logo} alt="logo" />
        </Link>
        {!small && (
          <IconButton component={ReactLink} to="/user">
            <PermIdentityIcon />
          </IconButton>
        )}
        <IconButton component={ReactLink} to="/user/cart">
          <ShoppingCartSharpIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
