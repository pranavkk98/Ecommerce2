import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

import HackContext from "../Context/HackContext";
import { ProductSmall, ProductSingleImg, ProductLarge } from "../Views";

import { Grid, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  smallContainer: {
    margin: theme.spacing(4),
    color: "#FFFFFF",
  },
  largeContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));

const Product = () => {
  const classes = useStyles();
  const { getProduct, product, setLoading } = useContext(HackContext);
  const { id } = useParams();
  const [small, setSmall] = useState(window.innerWidth < 1120);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    (async () => {
      const res = await getProduct(id);
      setRedirect(!res);
    })();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    window.addEventListener("load", (e) => {
      setLoading(false);
    });
  }, []);

  const handleResize = () => {
    setSmall(window.innerWidth < 1120);
  };

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return small ? (
    <Grid className={classes.smallContainer}>
      <div>
        <ProductSmall product={product} />
      </div>
    </Grid>
  ) : (
    <Box>
      <Container>
        <Container>
          <Container>
            {product.image.length === 1 ? (
              <ProductSingleImg product={product} />
            ) : (
              <ProductLarge product={product} />
            )}
          </Container>
        </Container>
      </Container>
    </Box>
  );
};

export default Product;
