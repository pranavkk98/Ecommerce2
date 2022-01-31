import React from "react";

import { Details } from "../Components";

import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  details: {
    width: "40%",
    height: "100vh",
    display: "flex",
  },
  imagesPage: {
    width: "60%",
  },
  imageDiv: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    maxWidth: "70%",
    maxHeight: "70%",
    minWidth: "40%",
    minHeight: "40%",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  section: {
    display: "flex",
    height: "100vh",
  },
}));

const ProductSingleImg = ({ product }) => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <div className={classes.imagesPage}>
        <div className={classes.imageDiv}>
          <img
            className={classes.image}
            src={product.image[0].imgUrl}
            alt={product.name}
          />
        </div>
      </div>
      <div className={classes.details}>
        <Details product={product} small={false} />
      </div>
    </Box>
  );
};

export default ProductSingleImg;
