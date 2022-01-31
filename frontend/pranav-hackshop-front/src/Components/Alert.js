import React, { useContext } from "react";
import HackContext from "../Context/HackContext";

import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const MyAlert = () => {
  const { alert, setAlert } = useContext(HackContext);

  const handleClose = () => {
    setAlert(false, "", alert.severity);
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        sx={{ width: "100%" }}
        onClose={handleClose}
        severity={alert.severity}
      >
        {alert.payload.toString()}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
