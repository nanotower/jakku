import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

import { withRouter } from 'react-router-dom'

 class Home extends Component {
  render() {

    // if(false){
    //   this.props.history.push('/ruta')
    // }
    return (
      <div>
        <h1>Si te acabas de mudar o estás a punto de mudarte, podemos ayudarte</h1>
        <NavLink to={"/create-bid"}>Me voy a mudar</NavLink>
        <NavLink to={"/create-bid"}>Me acabo de mudar</NavLink>
      </div>
    )
  }
}

export default withRouter(Home)
