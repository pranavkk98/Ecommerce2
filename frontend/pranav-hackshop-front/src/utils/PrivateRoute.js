import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HackContext from "../Context/HackContext";

const PrivateRoute = (props) => {
  const { isAuth } = useContext(HackContext);
  return isAuth ? props.children : <Redirect to="/login" />;
};

export default PrivateRoute;
