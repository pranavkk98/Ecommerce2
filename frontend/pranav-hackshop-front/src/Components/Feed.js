import React from "react";

import { Card } from "../Components";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";

const useStyles = makeStyles(() => ({
  card: {
    marginRight: "20px",
    marginLeft: "20px",
  },
}));

const Feed = ({ products }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((item) => {
          return (
            <div key={item._id}>
              <Card className={classes.card} product={item} />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
};

export default Feed;
