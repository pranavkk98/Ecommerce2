import React from "react";

import { Slider, Details } from "../Components";

const ProductSmall = ({ product }) => {
  return (
    <React.Fragment>
      <Slider image={product.image} />
      <br />
      <br />
      <Details product={product} small={true} />
    </React.Fragment>
  );
};

export default ProductSmall;
