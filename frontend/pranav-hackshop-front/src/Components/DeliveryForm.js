import React, { useState, useContext } from "react";

import HackContext from "../Context/HackContext";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  Box,
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

const DeliveryForm = ({ initialFormData, text, submitFunction }) => {
  const classes = useStyles();
  const { setAlert } = useContext(HackContext);
  const [formData, setFormData] = useState({
    name: initialFormData.name,
    speed: initialFormData.speed,
    price: initialFormData.price,
    partner: initialFormData.partner,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.speed === "" ||
      formData.partner === "" ||
      formData.price <= 0
    ) {
      setAlert(true, "Please fill in all the details", "error");
      return false;
    } else {
      (async () => {
        await submitFunction(
          formData.name,
          formData.speed,
          formData.price,
          formData.partner
        );
      })();
    }
  };

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
          <Grid item sm={6} xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              onChange={handleChange}
              value={formData.name}
              className={classes.textfield}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="speed"
              label="Speed"
              onChange={handleChange}
              value={formData.speed}
              className={classes.textfield}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="number"
              id="price"
              label="Price"
              onChange={handleChange}
              value={formData.price}
              className={classes.textfield}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="partner"
              label="Partner"
              onChange={handleChange}
              value={formData.partner}
              className={classes.textfield}
            />
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
    </Container>
  );
};

export default DeliveryForm;
