import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import HackContext from "../Context/HackContext";

import {
  Container,
  Divider,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CartItem, StyledRadio } from "../Components";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  innerContainer: {
    borderRadius: "8px",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
    maxWidth: "600px",
  },
  container: {
    padding: theme.spacing(2),
    alignSelf: "left",
    borderRadius: "8px",
    marginBottom: theme.spacing(6),
    color: "black",
  },
  cartItemDiv: {
    margin: "0px",
    padding: theme.spacing(2),
  },
  grid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  speeds: {
    textAlign: "end",
  },
  buttonContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
  },
  button: {
    backgroundColor: "#385EFC",
    color: "#F7C09E",
    borderRadius: "15px",
    border: "1px solid #385EFC",
    "&:hover": {
      backgroundColor: "#F7C09E",
      color: "#385EFC",
    },
  },
  formControlLabel: {
    marginBottom: theme.spacing(2),
  },
  heading: {
    fontFamily: "IBM Plex Mono",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const {
    cart,
    getCart,
    deliverySpeeds,
    getDeliverySpeeds,
    addresses,
    getAddresses,
    order,
    compareCartToOrder,
    setAlert,
    generateOrder,
    deleteOrder,
  } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);
  const [value, setValue] = useState(deliverySpeeds[0]._id);
  const [speed, setSpeed] = useState(
    deliverySpeeds.find((item) => item._id === value)
  );
  const [adId, setAdId] = useState("12345678");
  const [redirectToOrder, setRedirectToOrder] = useState({
    do: false,
    id: "",
  });

  const handleChange = (e) => {
    setValue(e.target.value);
    setSpeed(deliverySpeeds.find((item) => item._id === e.target.value));
  };

  const handleChangeAddress = (e) => {
    setAdId(e.target.value);
  };

  const subtotal = cart.cart.cartItems.reduce(
    (previousValue, currentValue) => previousValue + currentValue.totalPrice,
    0
  );

  const isOrderSameAsCart = () => {
    if (value !== order.deliverySpeed._id || adId !== order.address._id) {
      return false;
    }
    return compareCartToOrder();
  };

  const proceedToCheckout = async (e) => {
    if (!cart.cart.cartItems.length) {
      setAlert(
        true,
        "You need to have products in your cart to checkout",
        "warning"
      );
      return;
    }
    if (value === "12345678") {
      setAlert(true, "Please select a Shipping Method", "warning");
      return;
    }
    if (adId === "12345678") {
      setAlert(true, "Please select an Address", "warning");
      return;
    }
    if (isOrderSameAsCart()) {
      setRedirectToOrder({ do: true, id: order._id });
      return;
    }
    if (order._id !== "12345678") {
      const res = await deleteOrder(order._id);
      if (!res) {
        setRedirect(true);
        return;
      }
    }
    const orderId = await generateOrder(adId, value);
    if (orderId) {
      setRedirectToOrder({ do: true, id: orderId });
      return;
    } else {
      setRedirect(true);
    }
  };

  useEffect(() => {
    (async () => {
      const res1 = await getCart();
      setRedirect(!res1);
      const res2 = await getDeliverySpeeds();
      setRedirect(!res2);
      const res3 = await getAddresses();
      setRedirect(!res3);
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  if (redirectToOrder.do) {
    return <Redirect to={`/user/order/${redirectToOrder.id}`} />;
  }

  return (
    <Container className={classes.outerContainer}>
      <Box
        boxShadow={3}
        component={Grid}
        className={classes.container}
        container
        justifyContent="flex-start"
      >
        <Grid item>
          <Typography className={classes.heading} component="h1" variant="h5">
            Shopping Cart
          </Typography>
        </Grid>
      </Box>
      <Box
        component={Container}
        boxShadow={2}
        className={classes.innerContainer}
      >
        {!cart.products.length ? (
          <Typography variant="body1">Your Cart Is Empty</Typography>
        ) : (
          cart.products.map((item, index) => {
            return (
              <div
                className={classes.cartItemDiv}
                id={cart.cart.cartItems[index]._id}
                key={cart.cart.cartItems[index]._id}
              >
                <CartItem
                  className={classes.cartItem}
                  item={{ ...cart.cart.cartItems[index], ...item }}
                />
              </div>
            );
          })
        )}
      </Box>
      <Box
        boxShadow={2}
        component={Container}
        className={classes.innerContainer}
      >
        <Grid className={classes.grid} container spacing={2}>
          <Grid item sm={6}>
            <Typography variant="body1">
              <b>Subtotal</b>
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography
              align="right"
              variant="body1"
            >{`₹${subtotal}`}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid className={classes.grid} container spacing={2}>
          <Grid item sm={4}>
            <Typography variant="body1">
              <b>Shipping</b>
            </Typography>
          </Grid>
          <Grid className={classes.speeds} item sm={8}>
            <form>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Delivery Speed"
                  name="deliverySpeed"
                  value={value}
                  onChange={handleChange}
                >
                  {deliverySpeeds.map((speed) => {
                    return (
                      <FormControlLabel
                        key={speed._id}
                        value={speed._id}
                        control={<StyledRadio />}
                        label={`${speed.name} (${speed.speed}): ${speed.price}`}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </form>
          </Grid>
        </Grid>
        <Divider />
        <Grid className={classes.grid} container spacing={2}>
          <Grid item sm={3}>
            <Typography variant="body1">
              <b>Address</b>
            </Typography>
          </Grid>
          <Grid className={classes.speeds} item sm={9}>
            {!addresses.length ? (
              <Typography variant="body1">
                You have no stored addresses
              </Typography>
            ) : (
              <form>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="Addresses"
                    name="addresses"
                    value={adId}
                    onChange={handleChangeAddress}
                  >
                    {addresses.map((address) => {
                      return (
                        <FormControlLabel
                          key={address._id}
                          value={address._id}
                          className={classes.formControlLabel}
                          control={<StyledRadio />}
                          label={`${address.addressLineOne}, ${address.addressLineTwo}, ${address.city}, ${address.state}, ${address.pincode}`}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </form>
            )}
          </Grid>
        </Grid>
        <Grid className={classes.grid} container spacing={2}>
          <Grid item sm={6}>
            <Typography variant="body1">
              <b>Total</b>
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography align="right" variant="body1">{`₹${
              subtotal + speed.price
            }`}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Container className={classes.buttonContainer} maxWidth="sm">
        <Button
          size="large"
          variant="contained"
          className={classes.button}
          disableElevation
          fullWidth={true}
          onClick={proceedToCheckout}
        >
          Proceed to Checkout
        </Button>
      </Container>
    </Container>
  );
};

export default Cart;
