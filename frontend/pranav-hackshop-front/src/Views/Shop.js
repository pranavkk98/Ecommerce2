import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import HackContext from "../Context/HackContext";

import { Subheader, Feed } from "../Components";

const Shop = () => {
  const { categories, getCategories, getProducts } = useContext(HackContext);
  const { category } = useParams();
  const [products, setProducts] = useState(getProducts(category));

  useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  useEffect(() => {
    setProducts(getProducts(category));
    return () => {
      setProducts([]);
    };
  }, [categories, category]);

  let items = categories.map((item) => item.name);

  return (
    <React.Fragment>
      <br />
      <Subheader items={items} at={category} />
      <Feed products={products} />
    </React.Fragment>
  );
};

export default Shop;
