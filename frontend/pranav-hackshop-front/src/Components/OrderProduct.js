import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, ButtonBase, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    border: "1px groove black",
    borderRadius: theme.spacing(0.5),
  },
  imageCurrent: {
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "5px",
  },
}));

const OrderProduct = ({ product, isCurrent }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item>
        <ButtonBase
          className={isCurrent ? classes.imageCurrent : classes.image}
        >
          <img className={classes.img} alt={product.name} src={product.image} />
        </ButtonBase>
      </Grid>
      <Grid spacing={1} item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="body1">
              {product.name}
            </Typography>
            {isCurrent && <br />}
            <Typography variant="body1">{`Quantity: ${product.quantity}`}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1">{`₹${product.totalPrice}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderProduct;
