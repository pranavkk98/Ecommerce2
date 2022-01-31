import React from "react";
import { Link as ReactLink } from "react-router-dom";

import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    color: "#3F51B5",
    border: "1px groove #3F51B5",
    borderRadius: theme.spacing(3),
    "&:hover": {
      backgroundColor: "#3F51B5",
      color: "#FFFFFF",
    },
  },
  width: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const AddButton = ({ to, text }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid className={classes.width} item>
        <Button
          component={ReactLink}
          to={to}
          className={classes.button}
          variant="contained"
          disableElevation
        >
          {text}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddButton;
