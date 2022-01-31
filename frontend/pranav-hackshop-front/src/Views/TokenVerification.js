import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

import HackContext from "../Context/HackContext";

const TokenVerification = () => {
  const { token } = useParams();
  const { verifyToken } = useContext(HackContext);
  const [redirect, setRedirect] = useState({
    do: false,
    to: "/",
  });

  useEffect(() => {
    (async () => {
      const res = await verifyToken(token);
      setRedirect({
        do: true,
        to: res ? "/verificationSuccess" : "/verificationFailed",
      });
    })();
  }, []);

  if (redirect.do) {
    return <Redirect to={redirect.to} />;
  }

  return <div></div>;
};

export default TokenVerification;
