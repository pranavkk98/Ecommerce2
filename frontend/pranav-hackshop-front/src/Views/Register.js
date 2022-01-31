import React, { useState, useContext } from "react";
import HackContext from "../Context/HackContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
    backgroundColor: "white",
    borderRadius: "5px",
  },
  text: {
    color: "#385EFC",
  },
}));

const Register = () => {
  const classes = useStyles();
  const stateData = useContext(HackContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      stateData.setAlert(true, "Please fill in all the details", "error");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      stateData.setAlert(
        true,
        "Confirm Password should match the password",
        "error"
      );
      return;
    } else if (
      formData.password.length < 8 ||
      formData.confirmPassword.length < 8
    ) {
      stateData.setAlert(
        true,
        "Password should be 8 characters or more",
        "error"
      );
      return;
    }
    const registerSuccess = await stateData.registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    if (registerSuccess) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setRedirect(true);
    }
  };

  if (stateData.isAuth && stateData.token) {
    if (stateData.user.role === "APP_ADMIN") {
      return <Redirect to="/admin" />;
    }
    return <Redirect to="/" />;
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <Typography className={classes.text} component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              autoFocus
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={formData.email}
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={handleChange}
              value={formData.confirmPassword}
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
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              className={classes.text}
              component={ReactLink}
              to="/login"
              variant="body2"
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Register;
