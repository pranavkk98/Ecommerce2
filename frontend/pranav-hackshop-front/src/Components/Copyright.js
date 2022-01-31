import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as ReactLink } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link component={ReactLink} color="inherit" to="/about">
        HackShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
