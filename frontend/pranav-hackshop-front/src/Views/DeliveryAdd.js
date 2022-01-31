import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";

import HackContext from "../Context/HackContext";

import { DeliveryForm } from "../Components";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: "15px",
  },
}));

const DeliveryAdd = () => {
  const classes = useStyles();
  const { setLoading, setAlert } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);

  const initialFormData = {
    name: "",
    speed: "",
    price: 0,
    partner: "",
  };

  const addDelivery = async (name, speed, price, partner) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}admin/deliverySpeed/add`,
        {
          name,
          speed,
          price: Number(price),
          partner,
        }
      );
      setLoading(false);
      setAlert(true, res.data.info, "success");
      return true;
    } catch (error) {
      setLoading(false);
      setAlert(
        true,
        typeof error.response.data.info !== "string"
          ? "Something went wrong!!"
          : error.response.data.info,
        "error"
      );
      return false;
    }
  };

  const handleSubmit = async (name, speed, price, partner) => {
    const res = addDelivery(name, speed, price, partner);
    setRedirect(res);
  };

  if (redirect) {
    return <Redirect to="/admin/delivery" />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container component="main" maxWidth="md">
        <DeliveryForm
          initialFormData={initialFormData}
          text="Add a New Delivery Speed"
          submitFunction={handleSubmit}
        />
      </Container>
    </Container>
  );
};

export default DeliveryAdd;
