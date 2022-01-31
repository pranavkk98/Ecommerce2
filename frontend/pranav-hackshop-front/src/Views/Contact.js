import React from "react";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { UserInfo } from "../Components";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  innerContainer: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },
  listContainer: {
    border: "1px groove black",
    borderRadius: "8px",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
}));

const ashlin = {
  avatar: "",
  name: "Ashlin",
  email: "ashlin@gmail.com",
};

const consulero = {
  avatar: "",
  name: "Consulero",
  email: "Consulero@gmail.com",
};

const Contact = () => {
  const classes = useStyles();

  return (
    <Container className={classes.outerContainer} maxWidth="sm">
      <Container className={classes.innerContainer}>
        <UserInfo user={ashlin} />
      </Container>
      <Container className={classes.innerContainer}>
        <UserInfo user={consulero} />
      </Container>
    </Container>
  );
};

export default Contact;
