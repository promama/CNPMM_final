import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { NavLink } from "react-router-dom";
import "./listItems.scss";
import MenuBookIcon from '@material-ui/icons/MenuBook';

export const mainListItems = (
    <div>
        
        <NavLink
            to="/admin/books"
            className="item-sidebar"
            activeClassName="active-menu"
        >
            <ListItem button>
                <ListItemIcon>
                    <MenuBookIcon/>
                </ListItemIcon>
                <ListItemText primary="Sách" />
            </ListItem>
        </NavLink>
    </div>
);
