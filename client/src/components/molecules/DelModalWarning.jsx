import React, { Component } from "react";
import { Button, Modal } from "react-materialize";

export default class DelModalWarning extends Component {
  render() {
    return (
      <div className="modal-delwarning-container">
        <Modal
          header={this.props.passText}
          trigger={
     
              <i class="material-icons">cancel</i>
          
          }
     
        >
          <div className="modal-cancel-container">
            <p>¿Estás seguro de que quieres eliminar esta caja?</p>

            <Button waves="light" className="red del-product-btn modal-close" onClick={()=>this.props.deleteFunction()}>
              Eliminar
            </Button>
            <Button waves="light" className="red del-product-btn modal-close">
              Cerrar
            </Button>
          
          </div>
        </Modal>
      </div>
    );
  }
}
