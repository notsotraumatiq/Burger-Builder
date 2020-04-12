import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <li>
        <a href="/">A link</a>
      </li>
    </ul>
  );
};

export default navigationItems;
