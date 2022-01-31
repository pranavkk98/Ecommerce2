import { createContext } from "react";

let HackContext = createContext({
  user: null,
  loading: false,
  isAuth: false,
  token: null,
  alert: {
    open: false,
    payload: "",
    severity: "",
  },
  categories: [
    {
      isActive: false,
      products: [
        {
          isActive: false,
          created: "2021-08-12T10:06:50.033Z",
          lastUpdate: "2021-08-12T10:06:50.033Z",
          _id: "6114f2e213608b6b472730ac",
          name: "Sample",
          description: "Sample",
          quantity: 50,
          price: 1500,
          discountPrice: 1399,
          series: "6114f2cc13608b6b472730a4",
          image: [
            {
              imgUrl:
                "https://res.cloudinary.com/dnzqkdk4g/image/upload/v1628762912/productImg/89c5e4cc-0327-4925-9613-d17f3815d86c.png",
              publicId: "productImg/89c5e4cc-0327-4925-9613-d17f3815d86c",
              _id: "6114f32013608b6b472730b3",
            },
          ],
          __v: 1,
        },
      ],
      created: "2021-09-02T11:30:32.458Z",
      lastUpdate: "2021-09-02T11:30:32.458Z",
      _id: "6130b672df9c9374bed5a711",
      name: "Sample",
      description: "Sample",
      __v: 0,
    },
  ],
  product: {
    _id: "123456425",
    isActive: false,
    created: "2021-08-12T10:06:50.033Z",
    lastUpdate: "2021-08-12T10:06:50.033Z",
    name: "Sample",
    description: "Sample",
    quantity: 50,
    price: 1500,
    discountPrice: 1399,
    series: {
      _id: "12345678",
      image:
        "https://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png",
      imagePublicId: "defaultImage",
      isActive: false,
      created: "2021-08-12T10:06:50.029Z",
      lastUpdate: "2021-08-12T10:06:50.029Z",
      name: "Mark",
      description: "Ancient",
      __v: 0,
    },
    image: [],
    __v: 1,
    categories: [
      {
        name: "Sample",
        id: "12345678",
      },
      {
        name: "Sample",
        id: "12345678",
      },
    ],
  },
  cart: {
    cart: {
      cartItems: [
        {
          totalPrice: 0,
          _id: "12345678",
          product: "12345678",
          quantity: 1,
          __v: 0,
        },
        {
          totalPrice: 0,
          _id: "12345678",
          product: "12345678",
          quantity: 1,
          __v: 0,
        },
      ],
      created: "2021-08-14T12:56:29.773Z",
      lastUpdate: "2021-09-08T06:45:44.045Z",
      _id: "12345678",
      lestUpdate: "2021-08-14T12:56:29.773Z",
      user: "12345678",
      __v: 0,
    },
    products: [
      {
        name: "Sample",
        image:
          "https://i5.walmartimages.com/asr/4add4de6-7b92-4846-8316-b7a0cbec4dc7_1.8e2f7305081b9284e56d112fe146dc90.png",
      },
    ],
  },
  location: "",
  deliverySpeeds: [
    {
      created: "2021-08-12T04:23:04.754Z",
      lastUpdate: "2021-08-12T04:23:04.754Z",
      _id: "12345678",
      name: "Sample Delivery",
      speed: "Sample Day",
      price: 123,
      partner: "Sample Partner",
      __v: 0,
    },
  ],
  addresses: [
    {
      created: "2021-08-19T05:16:55.813Z",
      lastUpdate: "2021-08-19T05:16:55.813Z",
      _id: "12345678",
      user: "12345678",
      addressLineOne: "Sample",
      addressLineTwo: "Sample",
      landmark: "Sample",
      city: "Surrey",
      state: "Sample",
      pincode: 12345678,
      __v: 0,
    },
  ],
  order: {
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
  },
  yourOrders: [
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
  ],
});

export default HackContext;
