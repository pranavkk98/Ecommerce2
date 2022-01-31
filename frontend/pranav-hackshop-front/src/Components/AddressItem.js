import React, { useState, useContext } from "react";
import { Link as ReactLink, Redirect } from "react-router-dom";

import HackContext from "../Context/HackContext";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px groove black",
  },
  icon: {
    color: "#385EFC",
    marginLeft: "5px",
    "&:hover": {
      fontSize: "25px",
      color: "#F7C09E",
      backgroundColor: "#385EFC",
    },
  },
  content: {
    borderBottom: "1px groove black",
  },
}));

const AddressItem = ({ address }) => {
  const classes = useStyles();
  const { user, deleteAddress } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);

  const handleDelete = (e) => {
    (async () => {
      const res = await deleteAddress(address._id);
      setRedirect(!res);
    })();
  };

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <Card elevation={0} className={classes.card}>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Typography variant="body1">{address.addressLineOne}</Typography>
        <Typography variant="body1">{address.addressLineTwo}</Typography>
        <Typography variant="body1">{`${address.city}, ${address.state}, ${address.pincode}.`}</Typography>
        <Typography variant="subtitle1">{address.landmark}</Typography>
        <Typography variant="subtitle1">{`Email: ${user.email}`}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          component={ReactLink}
          to={`/user/address/edit/${address._id}`}
          className={classes.icon}
        >
          <EditRoundedIcon />
        </IconButton>
        <IconButton onClick={handleDelete} className={classes.icon}>
          <DeleteRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AddressItem;
