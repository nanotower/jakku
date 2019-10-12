import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { NavBar, NavItem} from 'react-materialize';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  logout(e) {
    e.preventDefault();
    this.props.fromApp();
    // .then(()=>{
    //   this.props.history.push('/')
    // })
  }

  render() {
    return (
      <React.Fragment>
        esta es la navbar
      </React.Fragment>
        
      
      // <div>
      //      <NavLink to={"/"}><h1>Logo link home</h1> </NavLink>
      //      <button onClick={e=>this.logout(e)}>Logout</button>

      //   <p>menu</p>

      // </div>
      // <Navbar brand={<a />} alignLinks="left">
      //   <NavItem onClick={this.logout}>Getting started</NavItem>
      //   <NavItem href="components.html">Components</NavItem>
      // </Navbar>
    );
  }
}
export default withRouter(Navbar);
