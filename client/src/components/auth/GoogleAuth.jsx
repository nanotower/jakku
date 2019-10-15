import React, { Component } from 'react';
import AuthService from "./Authservice";

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

    this.service.googleauth(username, password)
    .then(response => {
      console.log("llama al setsate")
      console.log(response)

      this.setState({
        username : username,
        password : password,
        error : false
      });
      this.props.getUser(response.user);
    })
    .catch(error => {
      console.log("entra por catch")
      this.setState({
        username: username,
        password: password,
        error: true
      });
    })
  }
  render() {
    return (
      <div>
        <h1>Login with google</h1>
        <form onSubmit={this.sendLogin}>
        <input value={this.state.username} placeholder="User name"  name="username" onChange={e=>this.changeState(e)} type="text"></input>
        <input value={this.state.password} placeholder="Password"  name="password" onChange={e=>this.changeState(e)} type="password"></input>
        <input type="submit" value="Login" />
        </form>
        <h1>{this.state.error? "Login failed. Please, try again o signup." : ""}</h1>
      </div>
    )
  }
}