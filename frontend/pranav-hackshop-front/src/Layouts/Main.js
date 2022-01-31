import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Navbar, Footer } from "../Components";

const useStyles = makeStyles((theme) => ({
  overflow: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
}));

const Main = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.overflow}>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Main;
