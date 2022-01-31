import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link as ReactLink } from "react-router-dom";

import HackContext from "../Context/HackContext";
import { AddButton } from "../Components";

import axios from "axios";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Paper,
} from "@material-ui/core";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: "IBM Plex Mono",
  },
  icon: {
    color: "#3F51B5",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const AdminSeries = () => {
  const classes = useStyles();
  const { setLoading, setAlert } = useContext(HackContext);
  const [redirect, setRedirect] = useState(false);
  const [series, setSeries] = useState([
    {
      image:
        "https://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png",
      imagePublicId: "defaultImage",
      isActive: false,
      created: "2021-08-12T10:06:50.029Z",
      lastUpdate: "2021-08-12T10:06:50.029Z",
      _id: "6114f2cc13608b6b472730a4",
      name: "Sample",
      description: "Sample",
      __v: 0,
    },
  ]);

  const getAllSeries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}admin/series/getAllSeries`
      );
      setSeries(res.data.info);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setAlert(
        true,
        typeof error.response.data.info !== "string"
          ? "Try Again!!"
          : error.response.data.info,
        "error"
      );
      return false;
    }
  };

  const deleteSeries = async (seriesId) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}admin/series/delete/${seriesId}`
      );
      setLoading(false);
      setAlert(true, res.data.info, "success");
      return true;
    } catch (error) {
      setLoading(false);
      setAlert(
        true,
        typeof error.response.data.info !== "string"
          ? "Something went wrong!!"
          : error.response.data.info,
        "error"
      );
      return false;
    }
  };

  const handleDelete = async (seriesId) => {
    let res1 = await deleteSeries(seriesId);
    setRedirect(!res1);
    const res2 = await getAllSeries();
    setRedirect(!res2);
  };

  useEffect(() => {
    (async () => {
      let res = await getAllSeries();
      if (!res) {
        res = await getAllSeries();
      }
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <React.Fragment>
      <AddButton to="/admin/series/add" text="Add Series" />
      <Paper className={classes.paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Series ID</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Name</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Description</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Edit</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Delete</b>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {series.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>
                    <Typography variant="body2">{item._id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={ReactLink}
                      to={{
                        pathname: `/admin/series/edit/${item._id}`,
                        state: {
                          data: {
                            name: item.name,
                            description: item.description,
                          },
                        },
                      }}
                      className={classes.icon}
                      size="small"
                    >
                      <EditSharpIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(item._id)}
                      className={classes.icon}
                      size="small"
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default AdminSeries;
