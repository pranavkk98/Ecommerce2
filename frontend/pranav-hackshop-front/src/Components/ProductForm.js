import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";

import HackContext from "../Context/HackContext";
import { Upload } from "../Components";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  Box,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    alignSelf: "left",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#3F51B5",
    color: "#FFFFFF",
    border: "1px solid #385EFC",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#3F51B5",
    },
  },
  textfield: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  text: {
    fontFamily: "IBM Plex Mono",
  },
}));

const ProductForm = ({ initialFormData, text, submitFunction }) => {
  const classes = useStyles();
  const { categories, getCategories, setAlert, setLoading } =
    useContext(HackContext);
  const [redirect, setRedirect] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: initialFormData.name,
    description: initialFormData.description,
    quantity: initialFormData.quantity,
    price: initialFormData.price,
    discountPrice: initialFormData.discountPrice,
  });
  const [category, setCategory] = useState(initialFormData.category);
  const [series, setSeries] = useState([
    {
      image:
        "https://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png",
      imagePublicId: "defaultImage",
      isActive: false,
      created: "2021-08-12T10:06:50.029Z",
      lastUpdate: "2021-08-12T10:06:50.029Z",
      _id: "6114f2cc13608b6b472730a4",
      name: "Sample",
      description: "Sample",
      __v: 0,
    },
  ]);
  const [mySeries, setMySeries] = useState(initialFormData.series);

  const getAllSeries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}admin/series/getAllSeries`
      );
      setSeries(res.data.info);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setAlert(
        true,
        typeof error.response.data.info !== "string"
          ? "Try Again!!"
          : error.response.data.info,
        "error"
      );
      return false;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const categoryChange = (e) => {
    setCategory(e.target.value);
  };

  const seriesChange = (e) => {
    setMySeries(e.target.value);
  };

  const addFiles = (fileToAdd) => {
    setFiles([...files, ...fileToAdd]);
  };

  const resetFiles = () => {
    setFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.description === "" ||
      formData.quantity <= 0 ||
      formData.price <= 0 ||
      formData.discountPrice <= 0 ||
      category === "default" ||
      mySeries === "default"
    ) {
      setAlert(true, "Please fill in all the details", "error");
      return false;
    } else {
      (async () => {
        await submitFunction(
          formData.name,
          formData.description,
          formData.quantity,
          formData.price,
          formData.discountPrice,
          mySeries,
          category,
          files
        );
      })();
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setRedirect(!res);
      let res1 = await getAllSeries();
      if (!res1) {
        res1 = await getAllSeries();
      }
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <Container className={classes.main}>
      <Box
        component={Grid}
        boxShadow={3}
        container
        justifyContent="flex-start"
        className={classes.container}
      >
        <Grid item>
          <Typography className={classes.text} component="h1" variant="h5">
            {text}
          </Typography>
        </Grid>
      </Box>
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              autoFocus
              id="name"
              label="Name"
              onChange={handleChange}
              value={formData.name}
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="description"
              label="Description"
              onChange={handleChange}
              value={formData.description}
              className={classes.textfield}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              variant="outlined"
              type="number"
              required
              fullWidth
              id="quantity"
              label="Quantity"
              onChange={handleChange}
              value={formData.quantity}
              className={classes.textfield}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              variant="outlined"
              type="number"
              required
              fullWidth
              id="price"
              label="Price"
              onChange={handleChange}
              value={formData.price}
              className={classes.textfield}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              variant="outlined"
              type="number"
              required
              fullWidth
              id="discountPrice"
              label="Discount Price"
              onChange={handleChange}
              value={formData.discountPrice}
              className={classes.textfield}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              variant="outlined"
              required
              select
              fullWidth
              id="series"
              label="Series"
              onChange={seriesChange}
              value={mySeries}
            >
              <MenuItem key="default" id="default" value="default">
                Select Series
              </MenuItem>
              {series.map((item) => {
                return (
                  <MenuItem key={item._id} id={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              variant="outlined"
              required
              select
              fullWidth
              id="category"
              label="Category"
              onChange={categoryChange}
              value={category}
            >
              <MenuItem key="default" id="default" value="default">
                Select Category
              </MenuItem>
              {categories.map((category) => {
                return (
                  <MenuItem
                    key={category._id}
                    id={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
      <Upload files={files} addFiles={addFiles} resetFiles={resetFiles} />
    </Container>
  );
};

export default ProductForm;
