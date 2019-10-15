import React, { Component } from "react";
import { Button, Modal } from "react-materialize";
import Signup from "./Signup";
import Login from "./Login";

export default class ModalLoginFirst extends Component {
  render() {
    return (
      <div className="modal-first-container">
        <Modal
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
            <Signup></Signup>
            <Login></Login>
            <Button
              node="a"
              waves="light"
              className="blue google-auth"
              large
              style={{ marginRight: "5px" }}
            >
              {" "}
              <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>
                Google login
              </a>
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
