import React from "react";

import { One, Two } from "../Components";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <section className={classes.section}>
        <One />
      </section>
      <section className={classes.section}>
        <Two />
      </section>
    </div>
  );
};

export default Home;
