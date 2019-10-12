import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  logout (e) {
    e.preventDefault();
    this.props.fromApp()
    // .then(()=>{
    //   this.props.history.push('/')
    // })
  }


  render() {
    return (
      <div>
           <NavLink to={"/"}><h1>Logo link home</h1> </NavLink>
           <button onClick={e=>this.logout(e)}>Logout</button>
        
        <p>menu</p>
        
      </div>
    )
  }
}
export default withRouter(Navbar)