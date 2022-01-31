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
    backgroundColor: "#385EFC",
    color: "#F7C09E",
    border: "1px solid #385EFC",
    "&:hover": {
      backgroundColor: "#F7C09E",
      color: "#385EFC",
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

const AddressForm = ({ initialFormData, text, submitFunction }) => {
  const classes = useStyles();
  const { setAlert } = useContext(HackContext);
  const [formData, setFormData] = useState({
    addressLineOne: initialFormData.addressLineOne,
    addressLineTwo: initialFormData.addressLineTwo,
    landmark: initialFormData.landmark,
    city: initialFormData.city,
    state: initialFormData.state,
    pincode: initialFormData.pincode,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.addressLineOne === "" ||
      formData.addressLineTwo === "" ||
      formData.landmark === "" ||
      formData.city === "" ||
      formData.state === "" ||
      formData.pincode === ""
    ) {
      setAlert(true, "Please fill in all the details", "error");
      return false;
    } else {
      (async () => {
        await submitFunction(
          formData.addressLineOne,
          formData.addressLineTwo,
          formData.landmark,
          formData.city,
          formData.state,
          formData.pincode
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="addressLineOne"
              label="Address Line One"
              autoFocus
              onChange={handleChange}
              value={formData.addressLineOne}
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="addressLineTwo"
              label="Address Line Two"
              autoFocus
              onChange={handleChange}
              value={formData.addressLineTwo}
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="landmark"
              label="Landmark"
              autoFocus
              onChange={handleChange}
              value={formData.landmark}
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="city"
              label="City"
              autoFocus
              onChange={handleChange}
              value={formData.city}
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="state"
              label="State"
              autoFocus
              onChange={handleChange}
              value={formData.state}
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="pincode"
              label="Pincode"
              type="number"
              autoFocus
              onChange={handleChange}
              value={formData.pincode}
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

export default AddressForm;
