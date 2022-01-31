import React, { useContext } from "react";

import HackContext from "../Context/HackContext";

import { Card, CardContent, Typography } from "@material-ui/core";

const OrderAddress = ({ address }) => {
  const { user } = useContext(HackContext);

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">{address.addressLineOne}</Typography>
        <Typography variant="body1">{address.addressLineTwo}</Typography>
        <Typography variant="body1">{`${address.city}, ${address.state}, ${address.pincode}.`}</Typography>
        <Typography variant="subtitle1">{address.landmark}</Typography>
        <Typography variant="subtitle1">{`Email: ${user.email}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default OrderAddress;
