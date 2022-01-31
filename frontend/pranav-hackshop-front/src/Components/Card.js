import React, { useState, useEffect, useContext } from "react";
import { Link as ReactLink, Redirect } from "react-router-dom";

import HackContext from "../Context/HackContext";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card as CardComponent,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
  IconButton,
  Grid,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(3),
    borderRadius: "10px",
  },
  name: {
    textAlign: "left",
  },
  price: {
    textAlign: "right",
  },
  icon: {
    "&:hover": {
      color: "#385EFC",
    },
  },
}));

const Card = ({ product }) => {
  const classes = useStyles();
  const { isAuth, addCartItem, setAlert } = useContext(HackContext);
  const [small, setSmall] = useState(window.innerWidth < 610);
  const [redirect, setRedirect] = useState(false);

  const handleResize = () => {
    setSmall(window.innerWidth < 610);
  };

  const handleClick = () => {
    if (isAuth) {
      (async () => {
        const res = await addCartItem(product._id, product.discountPrice);
        setRedirect(res);
      })();
    }
    setAlert(true, "Please Login first!!", "warning");
    setRedirect(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const textStyle = {
    fontSize: small ? "12px" : "15px",
  };

  if (redirect) {
    return <Redirect to="/user/cart" />;
  }

  return (
    <CardComponent elevation={0} className={classes.card}>
      <CardActionArea component={ReactLink} to={`/product/${product._id}`}>
        <CardMedia
          className={classes.img}
          component="img"
          image={product.image[0].imgUrl}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography style={textStyle} align="left" variant="body1">
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                align="right"
                variant="body1"
                style={textStyle}
              >{`₹${product.discountPrice}`}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          className={classes.icon}
          onClick={handleClick}
          aria-label="add to favorites"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </CardComponent>
  );
};

export default Card;
