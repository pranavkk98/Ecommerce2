import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import { OrderProduct } from "../Components";

const orderStatus = {
  ORDER_CREATED: {
    text: "Order Created",
    color: "#385EFC",
  },
  ORDER_ACCEPTED: {
    text: "Order Accepted",
    color: "green",
  },
  ORDER_DISPATCHED: {
    text: "Order Dispatched",
    color: "#EDBC03",
  },
  ORDER_DELIVERED: {
    text: "Order Delivered",
    color: "green",
  },
  ORDER_REJECTED: {
    text: "Order Rejected",
    color: "red",
  },
};

const paymentStatus = {
  PAYMENT_PENDING: {
    text: "Payment Pending",
    color: "#EDBC03",
  },
  PAYMENT_SUCCESS: {
    text: "Payment Success",
    color: "green",
  },
  PAYMENT_FAILED: {
    text: "Payment Failed",
    color: "red",
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    borderRadius: "8px",
    border: "1px groove black",
  },
  container1: {
    padding: theme.spacing(2),
    backgroundColor: "#F2F2F2",
    borderBottom: "1px groove #E5E5E5",
    borderRadius: "8px 8px 0px 0px",
  },
  productsGrid: {
    padding: theme.spacing(2),
    borderBottom: "1px groove #E5E5E5",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  detailsGrid: {
    padding: theme.spacing(2),
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  text: {
    fontFamily: "IBM Plex Mono",
  },
}));

const YourOrder = ({ order }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      <Grid item container className={classes.container1}>
        <Grid container item sm={6} xs={12} justifyContent="flex-start">
          <Grid item>
            <Typography variant="body1">{`ORDER PLACED: ${order.created.slice(
              0,
              10
            )}`}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={6} xs={12} justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2">{`ORDER # ${order._id}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.productsGrid}>
        {order.products.map((product) => {
          return (
            <Grid container spacing={2}>
              <OrderProduct
                product={{
                  name: product.product.name,
                  image: product.product.image[0].imgUrl,
                  quantity: product.quantity,
                  totalPrice: product.amount,
                }}
                isCurrent={false}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid className={classes.detailsGrid} item>
        <Typography className={classes.text} variant="body1">
          <b>Order Total:</b> {order.orderTotal}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <b>Order Status: </b>
          <i style={{ color: orderStatus[order.orderStatus].color }}>
            {orderStatus[order.orderStatus].text}
          </i>
        </Typography>
        <Typography className={classes.text} variant="body1">
          <b>Payment Status: </b>
          <span style={{ color: paymentStatus[order.paymentStatus].color }}>
            {paymentStatus[order.paymentStatus].text}
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default YourOrder;
