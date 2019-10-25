import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";

export default class Card extends Component {
  render() {
    return (
      


          // <div class="row">
          // <div class="col s12 m7">
            <div class="card">
            <NavLink to={`/product/${this.props.product._id}`}className={`product-card ${this.props.idx}`}>
                {this.props.product.active? 
                
                  <div class="card-image" >
                  <img src={this.props.product.imgPath1}/>
                  <div className="description-container">
                  <p className="description-show">{this.props.product.description}</p>
                  </div>
           
                </div> 
                 : 
                  <div class="card-image">
                 <i class="medium material-icons">done</i>
                  <p className="vendido">Vendido</p>
                  <img className="selled-img" src={this.props.product.imgPath1}/>
                
                </div>
              
              }
              
    
              
              <div class="card-content">
                <div className="price-container">
                <p className="card-price">{this.props.product.price} €</p>
                </div>
                <span class="card-title">{this.props.product.name}</span>
                
                {/* <p>{this.props.product.description}</p> */}
              </div>
              </NavLink>
              <div class="card-action">
                <a className="link-btn" href={`/bid/${this.props.product.bid._id}`} onClick={()=>console.log(this.props.product)}>Ir a su mudanza</a>
              </div>
            </div>
          // </div>
        // </div>
    )
  }
}
