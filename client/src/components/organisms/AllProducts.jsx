import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class AllProducts extends Component {
  render() {
    return (
     <React.Fragment>
        {this.props.products.map((product, idx) => {
          return (
            <NavLink to={`/product/${product._id}`} key={idx}> 
              <div className="product-container">
                <img src={product.imgPath1} alt="Product image" />
                <h2>{product.name}</h2>
                <p>Precio: {product.price} €</p>
                <p>
                  {product.isBundle.length > 0
                    ? "Displnible en pack furgo"
                    : "No se vende en pack"}
                </p>
              </div>
            </NavLink>
     </React.Fragment>
    )
  }
}
