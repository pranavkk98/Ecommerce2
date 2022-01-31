import React, { useEffect, useContext } from "react";
import HackState from "./Context/HackState";
import HackContext from "./Context/HackContext";
import Routing from "./utils/Routing";
import SetAuthToken from "./utils/SetAuthToken";

import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { useLocation } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Sans",
  },
});

const App = () => {
  const { getUserInfo, setLocation } = useContext(HackContext);
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setLocation(location);
    (async () => {
      if (token) {
        SetAuthToken(token);
        await getUserInfo();
      } else {
        SetAuthToken();
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routing />
    </ThemeProvider>
  );
};

const AppContext = () => {
  return (
    <HackState>
      <App />
    </HackState>
  );
};

export default AppContext;
