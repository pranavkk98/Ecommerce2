import React, { useState, useEffect, useContext } from "react";

import HackContext from "../Context/HackContext";

import axios from "axios";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  text: {
    fontFamily: "IBM Plex Mono",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const AdminOrders = () => {
  const classes = useStyles();
  const { setLoading, setAlert } = useContext(HackContext);
  const [orders, setOrders] = useState([
    {
      orderStatus: "ORDER_CREATED",
      paymentStatus: "PAYMENT_PENDING",
      created: "2021-09-11T05:06:52.226Z",
      _id: "12345678",
      user: "12345678",
      products: [
        {
          _id: "12345678",
          product: {
            isActive: false,
            created: "2021-09-10T16:40:11.923Z",
            lastUpdate: "2021-09-10T16:40:11.923Z",
            _id: "12345678",
            name: "Sample",
            description: "Sample",
            quantity: 0,
            price: 0,
            discountPrice: 0,
            series: "12345678",
            image: [
              {
                imgUrl:
                  "https://res.cloudinary.com/dnzqkdk4g/image/upload/v1631298257/productImg/56048849-b671-440c-9357-f96da171fb46.jpg",
                publicId: "productImg/56048849-b671-440c-9357-f96da171fb46",
                _id: "12345678",
              },
              {
                imgUrl:
                  "https://res.cloudinary.com/dnzqkdk4g/image/upload/v1631298257/productImg/e0fb7821-0172-4a65-bde1-4b0c9c34cd9b.jpg",
                publicId: "productImg/e0fb7821-0172-4a65-bde1-4b0c9c34cd9b",
                _id: "12345678",
              },
            ],
            __v: 2,
          },
          quantity: 0,
          amount: 0,
        },
      ],
      address: "12345678",
      orderTotal: 3848,
      deliverySpeed: "12345678",
      __v: 0,
      rzpOrderId: "order_HwsbCS664BEc8n",
      paymentData: {
        entity: "event",
        account_id: "acc_HmB80hTbJ7KYNe",
        event: "payment.captured",
        contains: ["payment"],
        payload: {
          payment: {
            entity: {
              id: "pay_Hwsd6xrohmF3F5",
              entity: "payment",
              amount: 384800,
              currency: "INR",
              status: "captured",
              order_id: "order_HwsbCS664BEc8n",
              invoice_id: null,
              international: false,
              method: "upi",
              amount_refunded: 0,
              refund_status: null,
              captured: true,
              description:
                "HackShop is a cooperative portfolio project from The Hacking School\n            - Web Development Bootcamp graduating students.",
              card_id: null,
              bank: null,
              wallet: null,
              vpa: "success@razorpay",
              email: "abc@gmail.com",
              contact: "+911234567890",
              notes: [],
              fee: 9082,
              tax: 1386,
              error_code: null,
              error_description: null,
              error_source: null,
              error_step: null,
              error_reason: null,
              acquirer_data: {
                rrn: "184476981195",
                upi_transaction_id: "37FB0C5721FDA0C84AF8D196D5EACE54",
              },
              created_at: 1631520986,
            },
          },
        },
        created_at: 1631520986,
      },
    },
  ]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}user/order/getAllOrders`
        );
        setOrders(res.data.info);
        setLoading(false);
        return true;
      } catch (error) {
        setLoading(false);
        setAlert(
          true,
          typeof error.response.data.info !== "string"
            ? "Try Again!!"
            : error.response.data.info,
          "error"
        );
        return false;
      }
    };
    (async () => {
      let res = await getAllOrders();
      if (!res) {
        res = await getAllOrders();
      }
    })();
  }, []);

  return (
    <Paper className={classes.paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                <b className={classes.text}>Order ID</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                <b className={classes.text}>Order Status</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                <b className={classes.text}>Payment Status</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                <b className={classes.text}>Order Total</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                <b className={classes.text}>Delivery Speed</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            return (
              <TableRow key={order._id}>
                <TableCell>
                  <Typography variant="body2">{order._id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    style={{ color: orderStatus[order.orderStatus].color }}
                    variant="body2"
                  >
                    {orderStatus[order.orderStatus].text}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    style={{ color: paymentStatus[order.paymentStatus].color }}
                    variant="body2"
                  >
                    {paymentStatus[order.paymentStatus].text}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{`₹${order.orderTotal}`}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.deliverySpeed.name}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminOrders;
