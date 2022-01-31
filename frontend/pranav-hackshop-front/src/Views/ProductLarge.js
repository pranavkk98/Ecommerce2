import React, { useEffect } from "react";
import ScrollMagic from "scrollmagic";

import { Details } from "../Components";

import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  details: {
    width: "40%",
    height: "100vh",
    display: "flex",
    margin: "0px",
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
}));

const ProductLarge = ({ product }) => {
  const classes = useStyles();

  const sectionStyle = {
    display: "flex",
    height: `${product.image.length}00vh`,
    alignItems: "center",
    justifyContent: "center",
  };

  const controller = new ScrollMagic.Controller();

  useEffect(() => {
    new ScrollMagic.Scene({
      duration: "100%",
      triggerElement: "#triggerelement",
      triggerHook: 0.1,
    })
      .setPin("#triggerelement")
      .addTo(controller);
  }, []);

  return (
    <Box component="section" style={sectionStyle}>
      <div className={classes.imagesPage}>
        {product.image.map((image) => {
          return (
            <div className={classes.imageDiv}>
              <img
                className={classes.image}
                src={image.imgUrl}
                alt={product.name}
              />
            </div>
          );
        })}
      </div>
      <div id="triggerelement" className={classes.details}>
        <div className={classes.flex}>
          <Details product={product} small={false} />
        </div>
      </div>
    </Box>
  );
};

export default ProductLarge;
