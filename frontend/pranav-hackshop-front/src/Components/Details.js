import React, { useState, useContext } from "react";
import { Link as ReactLink, Redirect } from "react-router-dom";

import HackContext from "../Context/HackContext";

import {
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Paper,
  Chip,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    color: "#ccc",
    textTransform: "uppercase",
    "&:hover": {
      color: "#385EFC",
    },
  },
  button: {
    backgroundColor: "#385EFC",
    color: "#F7C09E",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: "#F7C09E",
      color: "#385EFC",
    },
  },
  card: {
    width: "100%",
  },
  chip: {
    color: "#F7C09E",
    backgroundColor: "#385EFC",
    marginLeft: "5px",
  },
}));

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid black",
    borderTop: "1px solid black",
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Details = ({ product, small }) => {
  const classes = useStyles();
  const { addCartItem } = useContext(HackContext);
  const [expanded, setExpanded] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClick = () => {
    (async () => {
      const res = await addCartItem(product._id, product.discountPrice);
      setRedirect(res);
    })();
  };

  if (redirect) {
    return <Redirect to="/user/cart" />;
  }

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent>
        <Breadcrumbs>
          <Link className={classes.breadcrumbs} component={ReactLink} to="/">
            Home
          </Link>
          <Link
            className={classes.breadcrumbs}
            component={ReactLink}
            to="/shop"
          >
            Shop
          </Link>
          <Typography className={classes.breadcrumbs}>Product</Typography>
        </Breadcrumbs>
        <br />
        {!small && <br />}
        <Typography gutterBottom variant={small ? "h5" : "h3"}>
          {product.name}
        </Typography>
        <Typography
          variant={small ? "body1" : "h5"}
        >{`₹ ${product.discountPrice}`}</Typography>
        <br />
      </CardContent>
      <Paper>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>DESCRIPTION</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{product.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>SERIES</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <b>{product.series.name}: </b>
              {product.series.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>CATEGORIES</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {product.categories.map((item) => {
              return (
                <Chip
                  className={classes.chip}
                  key={item.id}
                  label={item.name}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Paper>
      <br />
      <br />
      <Button
        size="large"
        variant="contained"
        className={classes.button}
        disableElevation
        onClick={handleClick}
      >
        Add To Cart
      </Button>
      <br />
      <br />
    </Card>
  );
};

export default Details;
