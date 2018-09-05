// import react library
import React from "react";

// high order component, used to wrap adjecent jsx elements
import Aux from "../../hoc/Aux";
//
import Toolbar from "../Navigation/Toolbar/Toolbar";

// import CSS classes
import classes from "./Layout.css";

const layout = props => (
  <Aux>
    <Toolbar />
    <main className = {classes.Content}>
      {props.children}
    </main>
  </Aux>
);


export default layout;
