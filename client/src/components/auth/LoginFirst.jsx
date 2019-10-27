import React, { Component } from "react";
import { Button, Modal } from "react-materialize";
import Signup from "./Signup";
import Login from "./Login";

export default class LoginFirst extends Component {
  render() {
    return (
      <div className="modal-first-container">
        <Modal
          open={true}
          header={this.props.passText}
          fixedFooter
          trigger={
            <a class="btn-floating btn-large waves-effect waves-light red">
              <i class="material-icons">add</i>
            </a>
          }
          actions={
            <Button waves="green" modal="close" flat>
              Cerrar
            </Button>
          }
        >
          <div className="auth-container">
            <p>Accede con tu cuenta de google</p>

            <Button waves="light" className="blue google-auth">
              <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>
                Google Login
              </a>
            </Button>
            <Signup></Signup>
            <Login></Login>
          </div>
        </Modal>
      </div>
    );
  }
}
