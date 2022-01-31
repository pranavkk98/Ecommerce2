import React, { useState, useContext } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";

import axios from "axios";

import HackContext from "../Context/HackContext";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { CategoryForm } from "../Components";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: "15px",
  },
}));

const CategoryEdit = () => {
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const { setLoading, setAlert } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);

  const initialFormData = {
    name: location.state.data.name,
    description: location.state.data.description,
  };

  const updateCategory = async (name, description, categoryId) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}admin/category/update/${categoryId}`,
        {
          name,
          description,
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

  const handleSubmit = async (name, description) => {
    const res = await updateCategory(name, description, id);
    setRedirect(res);
  };

  if (redirect) {
    return <Redirect to="/admin/categories" />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container component="main" maxWidth="md">
        <CategoryForm
          initialFormData={initialFormData}
          text="Edit Category"
          submitFunction={handleSubmit}
        />
      </Container>
    </Container>
  );
};

export default CategoryEdit;
