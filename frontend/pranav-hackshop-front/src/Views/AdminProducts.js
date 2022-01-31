import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link as ReactLink } from "react-router-dom";

import axios from "axios";

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

const AdminProducts = () => {
  const classes = useStyles();
  const { setLoading, setAlert, getCategories, getProducts } =
    useContext(HackContext);
  const [redirect, setRedirect] = useState(false);
  let products = getProducts("All");

  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}admin/product/delete/${productId}`
      );
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

  const handleDelete = async (productId) => {
    let res1 = await deleteProduct(productId);
    if (!res1) {
      setLoading(false);
      setRedirect(!res1);
    }
  };

  useEffect(() => {
    (async () => {
      await getCategories();
      products = getProducts("All");
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <React.Fragment>
      <AddButton text="Add Product" to="/admin/products/add" />
      <Paper className={classes.paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Name</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Description</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Quantity</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Price</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Discount Price</b>
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
            {products.map((product) => {
              return (
                <TableRow key={product._id}>
                  <TableCell>
                    <Typography variant="body2">{product.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{product.quantity}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{`₹${product.price}`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{`₹${product.discountPrice}`}</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={ReactLink}
                      to={{
                        pathname: `/admin/products/edit/${product._id}`,
                        state: {
                          data: {
                            name: product.name,
                            description: product.description,
                            quantity: product.quantity,
                            price: product.price,
                            discountPrice: product.discountPrice,
                            series: product.series,
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
                      onClick={() => handleDelete(product._id)}
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

export default AdminProducts;
