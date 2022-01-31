import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HackContext from "../Context/HackContext";

const AdminRoute = (props) => {
  const { isAuth, user } = useContext(HackContext);

  return isAuth ? (
    user.role === "APP_ADMIN" ? (
      props.children
    ) : (
      <Redirect to="/accessDenied" />
    )
  ) : (
    <Redirect to="/login" />
  );
};

export default AdminRoute;
