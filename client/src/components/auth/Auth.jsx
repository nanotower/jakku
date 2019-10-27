import React, { Component } from "react";
import { Button } from "react-materialize";
import Signup from "./Signup";
import Login from "./Login";





export default class Auth extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="sign-backgnd">
        <div className="auth-standalone">
        <div className="auth-container">
          <p>Accede con tu cuenta de google</p>

          
          <Button waves="light" className="blue google-auth">
          <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>
          Google Login
          </a>
          </Button>

          <Signup getUser={this.props.getUser}></Signup>
          <Login getUser={this.props.getUser}></Login>
        </div>
      </div>

      </div>
      
    );
  }
}
