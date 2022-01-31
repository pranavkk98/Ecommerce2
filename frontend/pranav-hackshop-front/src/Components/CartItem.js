import React, { useState, useContext } from "react";

import HackContext from "../Context/HackContext";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  ButtonBase,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: "8px",
    border: "1px groove black",
  },
  image: {
    width: 128,
    height: 128,
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "5px",
  },
  textfield: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
    maxWidth: "70px",
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  icon: {
    color: "#385EFC",
    marginLeft: "5px",
    "&:hover": {
      fontSize: "25px",
      color: "#F7C09E",
      backgroundColor: "#385EFC",
    },
  },
  name: {},
}));

const CartItem = ({ item }) => {
  const classes = useStyles();
  const { updateCartItem, deleteCartItem } = useContext(HackContext);
  const [price, setPrice] = useState(item.totalPrice / item.quantity);

  const handleChange = (e) => {
    (async () => {
      if (e.target.value < 1) {
        await handleDelete();
      } else {
        const res = await updateCartItem(
          item._id,
          e.target.value,
          e.target.value * price
        );
        if (res) {
          setPrice(item.totalPrice / item.quantity);
        }
      }
    })();
  };

  const handleDelete = () => {
    (async () => {
      await deleteCartItem(item._id);
    })();
  };

  return (
    <Grid className={classes.container} container spacing={2}>
      <Grid item>
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt={item.name} src={item.image} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography className={classes.name} variant="body1">
              {item.name}
            </Typography>
            <TextField
              className={classes.textfield}
              onChange={handleChange}
              type="number"
              value={item.quantity}
            />
          </Grid>
          <Grid item>
            <IconButton
              className={classes.icon}
              onClick={handleDelete}
              aria-label="delete"
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1">{`₹${item.quantity * price}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
