import React, { useState, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";

import HackContext from "../Context/HackContext";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { AddressForm } from "../Components";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: "15px",
  },
}));

const AddressFormAdd = () => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const { addAddress } = useContext(HackContext);
  const location = useLocation();

  const initialFormData = {
    addressLineOne: "",
    addressLineTwo: "",
    landmark: "",
    city: "",
    state: "",
    pincode: 0,
  };

  const handleSubmit = async (
    addressLineOne,
    addressLineTwo,
    landmark,
    city,
    state,
    pincode
  ) => {
    const res = await addAddress(
      addressLineOne,
      addressLineTwo,
      landmark,
      city,
      state,
      pincode
    );
    setRedirect(res);
  };

  if (redirect) {
    return <Redirect to={location.state.from} />;
  }

  console.log(location);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container component="main" maxWidth="md">
        <AddressForm
          initialFormData={initialFormData}
          text="Add a New Address"
          submitFunction={handleSubmit}
        />
      </Container>
    </Container>
  );
};

export default AddressFormAdd;
