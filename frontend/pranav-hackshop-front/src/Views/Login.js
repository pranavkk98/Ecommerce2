import React, { useState, useContext } from "react";
import HackContext from "../Context/HackContext";

import { Button, TextField, Link, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as ReactLink, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#385EFC",
    color: "#F7C09E",
    "&:hover": {
      backgroundColor: "#388AFC",
    },
  },
  textfield: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
  text: {
    color: "#385EFC",
  },
}));

const Login = () => {
  const classes = useStyles();
  const stateData = useContext(HackContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      stateData.setAlert(true, "Please fill in all the details", "error");
      return;
    }
    await stateData.loginUser(formData.email, formData.password);
  };

  if (stateData.isAuth && stateData.token) {
    if (stateData.user.role === "APP_ADMIN") {
      if (stateData.location.pathname === "/login") {
        return <Redirect to="/admin" />;
      }
      return <Redirect to={stateData.location.pathname} />;
    }
    if (
      stateData.location.pathname === "/login" ||
      stateData.location.pathname === "/verificationSuccess"
    ) {
      return <Redirect to="/" />;
    }
    return <Redirect to={stateData.location.pathname} />;
  }

  return (
    <React.Fragment>
      <Typography className={classes.text} component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          value={formData.email}
          className={classes.textfield}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={formData.password}
          className={classes.textfield}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link
              className={classes.text}
              component={ReactLink}
              to="/register"
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Login;
