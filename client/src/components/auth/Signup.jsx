import React, { Component } from 'react'
import AuthService from "./Authservice";

export default class Signup extends Component {
  constructor(props) {
    super();
    this.state= {
      username:"",
      password: ""
    }
    this.service = new AuthService();
  }

  changeState(e) {
    const {name, value} = e.target;
    this.setState({
      [name] : value
    })
  }

  sendSignup= (event) => {
    event.preventDefault();
    const {username, password} = this.state;

    this.service.signup(username, password)
    .then(response => {
      console.log("response sing", response)
      this.setState({
        username: "",
        password: ""
      });
      this.props.getUser(response.user)
      debugger
    })
    .catch(error=> {
      this.setState({
        username: username,
        password: "",
        error: true
      })
    })

  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.sendSignup}>
          <input placeholder="User Name" name="username" value={this.state.username} type="text" onChange={(e)=> this.changeState(e)}></input>
          <input placeholder="Password" name="password" value={this.state.password} type="password" onChange={(e)=> this.changeState(e)}></input>
          <input type="submit" value="Sign up"></input>
        </form>
        <h1>{this.state.error? "Something was wrong. Please, try again" : ""}</h1>
        
      </div>
    )
  }
}