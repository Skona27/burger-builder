import React from "react";
import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
    <ul className={classes.NavItems}>
      <NavigationItem link="/" active>Link 1</NavigationItem>
      <NavigationItem link="/" >Link 2</NavigationItem>
    </ul>
)

export default navigationItems;