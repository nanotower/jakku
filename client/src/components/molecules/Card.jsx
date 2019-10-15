import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";

export default class Card extends Component {
  render() {
    return (
      <NavLink to={`/product/${this.props.product._id}`}className="product-card">
      <div class="row">
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img src={this.props.product.imgPath1}/>
            <span class="card-title">{this.props.product.name}</span>
           

          </div>
          <div class="card-content">
            <p className="card-price">{this.props.product.price}</p>
            <p>{this.props.product.description}</p>
          </div>
          <div class="card-action">
            <a href="#">Otras cajas en la misma mudanza</a>
          </div>
        </div>
      </div>
    </div>
    </NavLink>
    )
  }
}
