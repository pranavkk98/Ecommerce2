import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HackContext from "../Context/HackContext";

const UserRoute = (props) => {
  const { isAuth, user } = useContext(HackContext);

  return isAuth ? (
    user.role === "APP_USER" ? (
      props.children
    ) : (
      <Redirect to="/accessDenied" />
    )
  ) : (
    props.children
  );
};

export default UserRoute;
