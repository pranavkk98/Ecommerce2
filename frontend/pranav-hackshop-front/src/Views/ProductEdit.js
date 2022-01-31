import React, { useState, useContext } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";

import axios from "axios";

import HackContext from "../Context/HackContext";

import { ProductForm } from "../Components";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: "15px",
  },
}));

const ProductEdit = () => {
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const { setLoading, setAlert } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialFormData = {
    name: location.state.data.name,
    description: location.state.data.description,
    quantity: location.state.data.quantity,
    price: location.state.data.price,
    discountPrice: location.state.data.discountPrice,
    series: location.state.data.series,
  };

  const updateProduct = async (
    name,
    description,
    quantity,
    price,
    discountPrice,
    series
  ) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}admin/product/update/${id}`,
        {
          name,
          description,
          quantity: Number(quantity),
          price: Number(price),
          discountPrice: Number(discountPrice),
          series,
        }
      );
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

  const addProductToCategory = async (category) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}admin/category/addProduct/${id}`,
        {
          categoryIds: [category],
        }
      );
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

  const uploadImages = async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("photos", file);
      });
      await axios.put(
        `${process.env.REACT_APP_API_URL}admin/product/addImages/${id}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
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

  const handleSubmit = async (
    name,
    description,
    quantity,
    price,
    discountPrice,
    series,
    category,
    files
  ) => {
    setLoading(true);
    const res1 = await updateProduct(
      name,
      description,
      quantity,
      price,
      discountPrice,
      series
    );
    if (!res1) {
      setLoading(false);
      setRedirect(true);
    }
    const res2 = await addProductToCategory(category, res1);
    if (!res2) {
      setLoading(false);
      setRedirect(true);
    }
    setRedirect(!res2);
    const res3 = await uploadImages(files, res1);
    if (!res3) {
      setLoading(false);
      setRedirect(true);
    }
    setSuccess(true);
  };

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  if (success) {
    return <Redirect to="/admin/products" />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container component="main" maxWidth="md">
        <ProductForm
          initialFormData={initialFormData}
          text="Edit Product"
          submitFunction={handleSubmit}
        />
      </Container>
    </Container>
  );
};

export default ProductEdit;
