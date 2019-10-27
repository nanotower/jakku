import React, { Component } from "react";
import { Button, Modal } from "react-materialize";
import Signup from "./Signup";
import Login from "./Login";
import { withRouter } from 'react-router-dom';


class ModalLogin extends Component {
  render() {
    return (
      <div>
        <Modal  
        open={true}
        header="Tienes que identificarte primero"
        actions={<Button waves="green"
         modal="close"
       flat>Cerrar</Button>}>
          <Signup></Signup>
          <Login></Login>
          <Button
            node="a"
            waves="light"
            className="blue"
            large
            style={{ marginRight: "5px" }}
          >   <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>
          Google login
        </a></Button>
       
        </Modal>
      </div>
    );
  }
}
//   render() {
//     return (
//       <div>
//         <Modal header="Tienes que identificarte primero" fixedFooter trigger={<Button>Acceder</Button>} actions={<Button waves="green" modal="close" flat>Cerrar</Button>}>
//           <Signup></Signup>
//           <Login></Login>
//           <Button
//             node="a"
//             waves="light"
//             className="blue"
//             large
//             style={{ marginRight: "5px" }}
//           >   <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>
//           Google login
//         </a></Button>
       
//         </Modal>
//       </div>
//     );
//   }
// }

export default withRouter(ModalLogin)
