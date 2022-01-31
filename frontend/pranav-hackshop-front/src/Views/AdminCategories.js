import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link as ReactLink } from "react-router-dom";

import axios from "axios";

import HackContext from "../Context/HackContext";
import { AddButton } from "../Components";

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

const AdminCategories = () => {
  const classes = useStyles();
  const { categories, getCategories, setAlert, setLoading } =
    useContext(HackContext);
  const [redirect, setRedirect] = useState(false);

  const deleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}admin/category/delete/${categoryId}`
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

  const handleDelete = async (categoryId) => {
    let res1 = await deleteCategory(categoryId);
    setRedirect(!res1);
    const res2 = await getCategories();
    setRedirect(!res2);
  };

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setRedirect(!res);
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/wentWrong" />;
  }

  return (
    <React.Fragment>
      <AddButton to="/admin/categories/add" text="Add Category" />
      <Paper className={classes.paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1">
                  <b className={classes.text}>Category ID</b>
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
            {categories.map((category) => {
              return (
                <TableRow key={category._id}>
                  <TableCell>
                    <Typography variant="body2">{category._id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{category.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {category.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={ReactLink}
                      to={{
                        pathname: `/admin/categories/edit/${category._id}`,
                        state: {
                          data: {
                            name: category.name,
                            description: category.description,
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
                      onClick={() => handleDelete(category._id)}
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

export default AdminCategories;
