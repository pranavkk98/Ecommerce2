import React from "react";

import { Link as ReactLink } from "react-router-dom";

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: "#F7C09E",
    backgroundColor: "#385EFC",
    border: "1px solid #385EFC",
  },
  forwardIcon: {
    color: "#385EFC",
    "&:hover": {
      fontSize: "25px",
      color: "#F7C09E",
      backgroundColor: "#385EFC",
    },
  },
  text: {
    color: "black",
    "&:hover": {
      color: "black",
    },
  },
  container: {
    "&:hover": {
      backgroundColor: "#F2F2F2",
    },
  },
}));

const icons = {
  cart: {
    text: "Shopping Cart",
    to: "/user/cart",
    icon: <ShoppingCartRoundedIcon />,
  },
  address: {
    text: "Your Addresses",
    to: "/user/address",
    icon: <HomeRoundedIcon />,
  },
  order: {
    text: "Your Orders",
    to: "/user/your-orders",
    icon: <ShoppingBasketRoundedIcon />,
  },
};

const UserLinks = ({ type }) => {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.container}
      component={ReactLink}
      to={icons[type].to}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{icons[type].icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.text}
        primary={icons[type].text}
      ></ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          component={ReactLink}
          to={icons[type].to}
          className={classes.forwardIcon}
          edge="end"
          aria-label="Go to cart"
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserLinks;
