import React, { Component } from "react";
import Productmapcontainer from "../molecules/Productmapcontainer";
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import { withRouter } from 'react-router-dom'




class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
    };
  }
  componentDidMount(){
    this.props.productFromApp()
    .then(product => {
      this.setState({
        ...this.state,
        product: this.props.product,
        
      })
      console.log("showproductmount", this.props.product)
    })
  
  }
  change() {
    this.props.productFromApp()
    this.setState ({
      ...this.state,
      product: this.props.product,
    })
    console.log("%%%%", this.state)
  }
  buy() {
    this.props.buyFromApp(this.props.product._id)
  }
  goBack =()=> {
    this.props.history.goBack()
  }

  render() {
    if(this.props.product) {
      return (
     
        <div className="display-product">
        <a className="back-btn"><i class="medium material-icons" onClick={this.goBack}>arrow_back</i></a>
        <h1 className="title">Contenido de la caja</h1>
        <div className="container-product-display">
          <img src={this.props.product.imgPath1} alt="product image"></img>
          {/* <img src={this.props.product.imgPath2} alt="product image"></img>
          <img src={this.props.product.imgPath3} alt="product image"></img> */}
          <h3>{this.props.product.name}</h3>
          <p>{this.props.product.description}</p>
          <p>La mudanza de esta caja será el {this.props.product.bid.deadLine} de {this.props.product.bid.from} a {this.props.product.bid.to}</p>
          <p>Precio: {this.props.product.price} €</p>
          
          {/* {this.props.product.active && this.props.product.owner._id!=this.props.userId &&(<button onClick={e => this.buy(e)}>Comprar</button>)} */}
          {(this.props.product.active && this.props.product.owner._id!=this.props.userId) ?
            <button onClick={e => this.buy(e)}>Comprar</button>
            :
            <p>Esta caja es tuya</p>
            }
          <span>{!this.props.product.active && this.props.userId==this.props.product.buyer? "Comprado! Enhorabuena" : !this.props.product.active? "Vendido": ""}</span>
          <div className="owner-container">
            <div className="profile-image">
          <img src={this.props.product.owner.imgPath}></img>
            </div>
          <p>{this.props.product.owner.username}</p>
          </div>
          <p>Localización: {this.props.product.bid.location.address}</p>
          
          <Productmapcontainer products={[this.props.product]} zoomMap={18} centerMap={{lat: this.props.product.bid.location.coordinates[1], lng: this.props.product.bid.location.coordinates[0]}} ></Productmapcontainer>
          
        </div>
        </div>
      );
    }
    else {
      
      return (
 
        <PreloaderSpinner></PreloaderSpinner>
        
     
      )
    }
  }
}
export default withRouter(ShowProduct)