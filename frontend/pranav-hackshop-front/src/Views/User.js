import React, { useContext } from "react";

import { UserInfo, UserLinks } from "../Components";
import HackContext from "../Context/HackContext";

import { Container, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: theme.spacing(5),
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

const User = () => {
  const classes = useStyles();
  const { user } = useContext(HackContext);

  return (
    <Container className={classes.outerContainer} maxWidth="sm">
      <Container className={classes.innerContainer}>
        <UserInfo user={user} />
      </Container>
      <Container className={classes.innerContainer}>
        <Container className={classes.listContainer}>
          <List>
            <UserLinks type="cart" />
            <UserLinks type="address" />
            <UserLinks type="order" />
          </List>
        </Container>
      </Container>
    </Container>
  );
};

export default User;
