import React, { Component } from 'react';
import AuthService from "./Authservice";
import { Button, TextInput } from "react-materialize";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : ""
    }
    this.service = new AuthService();
  }
  changeState(e) {
    const {name, value} = e.target;
    this.setState({
      [name] : value
    });
  }

  sendLogin = (event) => {
    event.preventDefault();
    const {username, password} = this.state;

    this.service.login(username, password)
    .then(response => {
      this.setState({
        username : username,
        password : password,
        error : false
      });
      this.props.userVerified(response)
    })
    .catch(error => {
      this.setState({
        username: username,
        password: password,
        error: true
      });
    })
  }
  render() {
    return (
      <div className="login-container">
        <p>Login</p>
        <form onSubmit={this.sendLogin}>
        <TextInput label="Nombre" value={this.state.username}   name="username" onChange={e=>this.changeState(e)} type="text"></TextInput>
        <TextInput label="Contraseña" value={this.state.password} name="password" onChange={e=>this.changeState(e)} type="password"></TextInput>
        <Button type="submit" value="Log in">Login</Button>
        </form>
        <p>{this.state.error? "Login failed. Please, try again o signup." : ""}</p>
      </div>
    )
  }
}