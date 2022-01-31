import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Link, Container } from "@material-ui/core";

import { Link as ReactLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#385EFC",
    textDecoration: "none",
  },
  linkAt: {
    color: "#F7C09E",
    textDecoration: "none",
  },
}));

const Subheader = ({ items, at }) => {
  const classes = useStyles();
  const [small, setSmall] = useState(window.innerWidth < 860);

  const handleResize = () => {
    setSmall(window.innerWidth < 860);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  };

  const containerStyle = {
    borderRadius: small ? "10px" : "50%",
    backgroundColor: "#F7C09E",
    height: !small && "150px",
    width: !small && "150px",
    textAlign: "center",
    border: small && "6px solid #F7C09E",
    marginBottom: "10px",
  };

  const containerStyleAt = {
    borderRadius: small ? "10px" : "50%",
    backgroundColor: "#385EFC",
    height: !small && "150px",
    width: !small && "150px",
    textAlign: "center",
    border: small && "6px solid #385EFC",
    marginBottom: "10px",
  };

  return (
    <Container maxWidth="md">
      <Box style={boxStyle}>
        {items.map((item) => {
          return (
            <div
              key={item}
              style={item === at ? containerStyleAt : containerStyle}
            >
              {!small && <br />}
              {!small && <br />}
              {!small && <br />}
              <Link
                component={ReactLink}
                to={`/shop/${item}`}
                className={item === at ? classes.linkAt : classes.link}
              >
                {item}
              </Link>
            </div>
          );
        })}
        <div style={"All" === at ? containerStyleAt : containerStyle}>
          {!small && <br />}
          {!small && <br />}
          {!small && <br />}
          <Link
            component={ReactLink}
            to={`/shop/All`}
            className={"All" === at ? classes.linkAt : classes.link}
          >
            All
          </Link>
        </div>
      </Box>
      {!small && <br />}
      {!small && <br />}
    </Container>
  );
};

export default Subheader;
