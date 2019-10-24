import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class ButtonAdd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    {
      if (this.props.bid) {
        return (
          <div className="create-bid-container btnadd">
            <div className="create-hover">
        <label className="label-crear">Crear mudanza</label>
        <NavLink to={"/create-bid"} class="btn-floating btn-large waves-effect waves-light red create-box-txt">
              <i class="material-icons">add</i>
            </NavLink>
        </div>
        </div>
        )
      } else {
        return (
          <div className="create-bid-container btnadd">
 <div className="create-hover">
        <label className="label-crear">Crear caja</label>
        <NavLink to={"/create-product"} class="btn-floating btn-large waves-effect waves-light red create-box-txt">
              <i class="material-icons">add</i>
            </NavLink>
        </div>
        </div>
        )
      }
    }
  }
}
