import React, { useState, useEffect, useContext } from "react";

import { useParams, Redirect } from "react-router-dom";

import axios from "axios";

import HackContext from "../Context/HackContext";
import { OrderProduct, OrderAddress, OrderDelivery } from "../Components";

import { Container, Grid, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const sampleOrder = {
  orderStatus: "Sample",
  paymentStatus: "Sample",
  created: "2021-09-10T12:13:36.564Z",
  _id: "12345678",
  user: "12345678",
  products: [
    {
      _id: "12345678",
      product: {
        isActive: false,
        created: "2021-08-12T10:06:50.033Z",
        lastUpdate: "2021-08-12T10:06:50.033Z",
        _id: "12345678",
        deliverySpeeds: ["12345678", "12345678", "12345678", "12345678"],
        name: "Sample",
        description: "Sample",
        quantity: 50,
        price: 1500,
        discountPrice: 1399,
        series: "12345678",
        image: [
          {
            imgUrl:
              "https://res.cloudinary.com/dnzqkdk4g/image/upload/v1628762912/productImg/89c5e4cc-0327-4925-9613-d17f3815d86c.png",
            publicId: "productImg/89c5e4cc-0327-4925-9613-d17f3815d86c",
            _id: "12345678",
          },
          {
            imgUrl:
              "https://res.cloudinary.com/dnzqkdk4g/image/upload/v1628762912/productImg/cd74b18a-dc05-4953-9563-ca93b210c0dd.png",
            publicId: "productImg/cd74b18a-dc05-4953-9563-ca93b210c0dd",
            _id: "12345678",
          },
        ],
        __v: 1,
      },
      quantity: 2,
      amount: 2798,
    },
  ],
  address: {
    created: "2021-09-10T08:12:38.059Z",
    lastUpdate: "2021-09-10T08:12:38.059Z",
    _id: "12345678",
    user: "12345678",
    addressLineOne: "Sample",
    addressLineTwo: "Sample",
    landmark: "Sample",
    city: "Sample",
    state: "Sample",
    pincode: 123456,
    __v: 0,
  },
  orderTotal: 5896,
  deliverySpeed: {
    created: "2021-08-12T04:23:04.754Z",
    lastUpdate: "2021-08-12T04:23:04.754Z",
    _id: "12345678",
    name: "Sample",
    speed: "Sample",
    price: 300,
    partner: "Sample",
    __v: 0,
  },
  __v: 0,
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  innerContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(4),
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  gridItem: {
    height: "100%",
    width: "100%",
    borderRadius: theme.spacing(0.5),
    //border: "1px groove black",
  },
  buttonLeft: {
    backgroundColor: "#385EFC",
    color: "#F7C09E",
    borderRadius: theme.spacing(0.5),
    float: "left",
    "&:hover": {
      backgroundColor: "#F7C09E",
      color: "#385EFC",
    },
  },
  buttonRight: {
    backgroundColor: "#385EFC",
    color: "#F7C09E",
    borderRadius: theme.spacing(0.5),
    float: "right",
    "&:hover": {
      backgroundColor: "#F7C09E",
      color: "#385EFC",
    },
  },
  buttonContainer: {
    width: "100%",
    display: "inline-block",
    overflow: "auto",
    whiteSpace: "nowrap",
    marginTop: theme.spacing(6),
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
  productGrid: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    border: "1px groove black",
    borderRadius: theme.spacing(0.5),
  },
  totalContainer: {
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
}));

const Order = () => {
  const classes = useStyles();
  const { order, getOrder, deleteOrder, setOrder, user, setAlert } =
    useContext(HackContext);
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [redirectToCart, setRedirectToCart] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    (async () => {
      const res = await getOrder(id);
      setRedirect(!res);
    })();
  }, []);

  const editOrder = (e) => {
    const res = deleteOrder(id);
    if (!res) {
      setRedirect(true);
      return;
    }
    setOrder(sampleOrder);
    setRedirectToCart(true);
  };

  const goToPay = async () => {
    try {
      const payment = await axios.get(
        `${process.env.REACT_APP_API_URL}user/order/payment/${id}`
      );
      const info = payment.data.info;
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const options = {
        key: info.key_id,
        order_id: info.id,
        name: "HackShop",
        description: `HackShop is a cooperative portfolio project from The Hacking School
            - Web Development Bootcamp graduating students.`,

        handler: function (response) {
          if (
            typeof response.razorpay_payment_id === "undefined" ||
            response.razorpay_payment_id < 1
          ) {
            var redirect_url = `/order/fail`;
          } else {
            redirect_url = `/order/success`;
          }
          window.location.href = redirect_url;
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setAlert(
        true,
        typeof error.response.data.info !== "string"
          ? "Payment Failed!!"
          : error.response.data.info,
        "error"
      );
    }
  };

  const placeOrder = (e) => {
    goToPay();
  };

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  if (redirectToCart) {
    return <Redirect to="/user/cart" />;
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Box
        component={Grid}
        className={classes.container1}
        boxShadow={3}
        container
        justifyContent="flex-start"
      >
        <Grid item>
          <Typography className={classes.heading} component="h1" variant="h5">
            Review Your Order
          </Typography>
        </Grid>
      </Box>
      <Box
        component={Container}
        boxShadow={2}
        className={classes.innerContainer}
      >
        {order.products.map((product) => {
          return (
            <Container key={product._id}>
              <Grid className={classes.productGrid} container spacing={2}>
                <OrderProduct
                  product={{
                    name: product.product.name,
                    image: product.product.image[0].imgUrl,
                    quantity: product.quantity,
                    totalPrice: product.amount,
                  }}
                  isCurrent={true}
                />
              </Grid>
            </Container>
          );
        })}
      </Box>
      <Grid container spacing={2}>
        <Grid sm={12} md={6} item container>
          <Box component={Grid} boxShadow={2} className={classes.gridItem} item>
            <OrderAddress address={order.address} />
          </Box>
        </Grid>
        <Grid sm={12} md={6} container item>
          <Box component={Grid} boxShadow={2} className={classes.gridItem} item>
            <OrderDelivery delivery={order.deliverySpeed} />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Box
          className={classes.totalContainer}
          boxShadow={2}
          component={Grid}
          item
          justifyContent="space-betweeen"
        >
          <Typography
            className={classes.heading}
            variant="h5"
          >{`Order Total: ₹${order.orderTotal}`}</Typography>
        </Box>
      </Grid>
      <Container className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={classes.buttonLeft}
          startIcon={<ArrowBackIosRoundedIcon />}
          onClick={editOrder}
        >
          Edit Order
        </Button>
        <Button
          variant="contained"
          className={classes.buttonRight}
          endIcon={<ArrowForwardIosRoundedIcon />}
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </Container>
    </Container>
  );
};

export default Order;
