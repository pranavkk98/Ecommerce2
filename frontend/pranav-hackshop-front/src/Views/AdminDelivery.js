import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link as ReactLink } from "react-router-dom";

import HackContext from "../Context/HackContext";
import { AddButton } from "../Components";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Paper,
} from "@material-ui/core";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: "IBM Plex Mono",
  },
  icon: {
    color: "#3F51B5",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const AdminDelivery = () => {
  const classes = useStyles();
  const { deliverySpeeds, getDeliverySpeeds, deleteDeliverySpeed } =
    useContext(HackContext);
  const [redirect, setRedirect] = useState(false);

  const handleDelete = async (deliverySpeedId) => {
    let res1 = await deleteDeliverySpeed(deliverySpeedId);
    setRedirect(!res1);
    const res2 = await getDeliverySpeeds();
    setRedirect(!res2);
  };

  useEffect(() => {
    (async () => {
      let res = await getDeliverySpeeds();
      if (!res) {
        res = await getDeliverySpeeds();
      }
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <React.Fragment>
      <AddButton to="/admin/delivery/add" text="Add Delivery Speed" />
      <Paper className={classes.paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Delivery Speed ID</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Name</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Speed</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Price</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Partner</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Edit</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Delete</b>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliverySpeeds.map((deliverySpeed) => {
              return (
                <TableRow key={deliverySpeed._id}>
                  <TableCell>
                    <Typography variant="body2">{deliverySpeed._id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {deliverySpeed.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {deliverySpeed.speed}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {`₹${deliverySpeed.price}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {deliverySpeed.partner}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={ReactLink}
                      to={{
                        pathname: `/admin/delivery/edit/${deliverySpeed._id}`,
                        state: {
                          data: {
                            name: deliverySpeed.name,
                            speed: deliverySpeed.speed,
                            price: deliverySpeed.price,
                            partner: deliverySpeed.partner,
                          },
                        },
                      }}
                      className={classes.icon}
                      size="small"
                    >
                      <EditSharpIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(deliverySpeed._id)}
                      className={classes.icon}
                      size="small"
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default AdminDelivery;
