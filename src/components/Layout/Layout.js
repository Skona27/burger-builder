// import react library
import React, {Component} from "react";

// high order component, used to wrap adjecent jsx elements
import Aux from "../../hoc/Aux";
//
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

// import CSS classes
import classes from "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showSideDrawer: false
    };
  } 
  
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }
  
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }
  
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer isOpened={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className = {classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}


export default Layout;
