import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";

import { Alert, Spinner } from "../Components";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "auto",
    overflowX: "hidden",
    margin: "0px",
    padding: "0px",
  },
  container: {
    margin: "0px",
    padding: "0px",
  },
  border: {
    backgroundColor: "#FFFFFF",
  },
}));

const View = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.border}>
        <Box className={classes.container}>
          <Alert />
          <Spinner />
          {props.children}
        </Box>
      </div>
    </main>
  );
};

export default View;
