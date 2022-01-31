import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

const OrderDelivery = ({ delivery }) => {
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h5">{delivery.name}</Typography>
        <Typography variant="body1">{delivery.speed}</Typography>
        <Typography variant="body1">{`Price: ₹${delivery.price}`}</Typography>
        <Typography variant="body1">{`Partner: ${delivery.partner}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default OrderDelivery;
