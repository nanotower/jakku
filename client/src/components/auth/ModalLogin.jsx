import React, { Component } from "react";
import { Button, Modal } from "react-materialize";
import Signup from "./Signup";
import Login from "./Login";


export default class ModalLogin extends Component {
  render() {
    return (
      <div>
        <Modal header="Acceso" fixedFooter trigger={<Button>Acceder</Button>} actions={<Button waves="green" modal="close" flat>Cerrar</Button>}>
          <Signup></Signup>
          <Login></Login>
          <Button
            node="a"
            waves="light"
            className="blue"
            small
            style={{ marginRight: "5px" }}
          >   <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>
          Google login
        </a></Button>
       
        </Modal>
      </div>
    );
  }
}
