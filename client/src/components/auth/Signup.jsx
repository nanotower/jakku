import React, { Component } from 'react'
import AuthService from "./Authservice";
import { Button, TextInput } from "react-materialize";
import { withRouter } from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
    super(props);
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
    .then( response => {
      this.setState({
        username: "",
        password: ""
      });
      this.props.getUser(response.user);
      this.props.history.goBack();
    })
    .catch(error=> {
      console.log("catch e", error);
      this.setState({
        username: username,
        password: password,
        error: true
      });
    })

  }

  render() {
    return (
      <div className="sign-container .fade-in">
             <p>Signup</p>
        <form onSubmit={this.sendSignup} >
        <TextInput label="Nombre" value={this.state.username} type="text" name="username" onChange={(e)=> this.changeState(e)}></TextInput>
  
        <TextInput label="Contraseña" value={this.state.password} type="password"  name="password"  onChange={(e)=> this.changeState(e)}/>
 
          <Button type="submit" value="Sign up">Signup</Button>
        </form>
        <p>{this.state.error? "Something was wrong. Please, try again" : ""}</p>
      </div>
    )
  }
}


export default withRouter(Signup)