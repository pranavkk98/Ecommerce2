import React from "react";
import { Link as ReactLink } from "react-router-dom";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import TimelineIcon from "@material-ui/icons/Timeline";
import ListIcon from "@material-ui/icons/List";
import WidgetsIcon from "@material-ui/icons/Widgets";

const Sidebar = () => {
  return (
    <React.Fragment>
      <ListItem component={ReactLink} to="/admin" button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem component={ReactLink} to="/admin/categories" button>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <ListItem component={ReactLink} to="/admin/series" button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Series" />
      </ListItem>
      <ListItem component={ReactLink} to="/admin/products" button>
        <ListItemIcon>
          <WidgetsIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
      <ListItem component={ReactLink} to="/admin/delivery" button>
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Delivery Speeds" />
      </ListItem>
    </React.Fragment>
  );
};

export default Sidebar;
