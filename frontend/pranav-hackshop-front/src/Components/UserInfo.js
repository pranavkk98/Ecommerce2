import React from "react";

import { Grid, Box, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px groove black",
    borderRadius: "8px",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  gridContainer: {
    borderRadius: "8px",
  },
  innerContainer: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: "1px groove black",
  },
  imgContainer: {
    width: 128,
    height: 128,
    backgroundColor: "#FFFFFF",
  },
  image: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%",
  },
  gridItem: {
    padding: theme.spacing(2),
    borderRadius: "8px",
  },
}));

const UserInfo = ({ user }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            className={classes.innerContainer}
          >
            <Box className={classes.imgContainer}>
              <img
                className={classes.image}
                src={user.avatar}
                alt={user.name}
              />
            </Box>
          </Box>
        </Grid>
        <Grid className={classes.gridItem} item xs={12}>
          <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
          >{`Email: ${user.email}`}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserInfo;
