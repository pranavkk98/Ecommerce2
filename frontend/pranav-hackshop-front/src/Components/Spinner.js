import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HackContext from "../Context/HackContext";
import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Spinner = () => {
  const classes = useStyles();
  const { loading } = useContext(HackContext);

  return (
    <Backdrop transition={100} className={classes.backdrop} open={loading}>
      <CircularProgress className={classes.loading} />
    </Backdrop>
  );
};

export default Spinner;
