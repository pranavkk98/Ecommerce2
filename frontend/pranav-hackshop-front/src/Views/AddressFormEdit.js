import React, { useState, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";

import HackContext from "../Context/HackContext";
import { AddressForm } from "../Components";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: "15px",
  },
}));

const AddressFormEdit = () => {
  const classes = useStyles();
  const { addresses, setAlert, editAddress } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  const address = addresses.find((item) => item._id === id);

  if (!address) {
    setAlert(true, "Address not Found", "error");
    return <Redirect to="/wentWrong" />;
  }

  const initialFormData = {
    addressLineOne: address.addressLineOne,
    addressLineTwo: address.addressLineTwo,
    landmark: address.landmark,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  };

  const handleSubmit = async (
    addressLineOne,
    addressLineTwo,
    landmark,
    city,
    state,
    pincode
  ) => {
    const res = await editAddress(
      addressLineOne,
      addressLineTwo,
      landmark,
      city,
      state,
      pincode,
      id
    );
    setRedirect(res);
  };

  if (redirect) {
    return <Redirect to="/user/address" />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container component="main" maxWidth="md">
        <AddressForm
          initialFormData={initialFormData}
          text="Edit Address"
          submitFunction={handleSubmit}
        />
      </Container>
    </Container>
  );
};

export default AddressFormEdit;
