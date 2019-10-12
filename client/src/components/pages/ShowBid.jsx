import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Bidmapcontainer from '../molecules/Bidmapcontainer';


export default class ShowBid extends Component {
  constructor(props) {
    super(props) 
  }
  componentDidMount() {
    this.props.fromApp();
  //   axios.get("").then(beer => {
  //    this.setState({
  //      ...this.state,
  //      randomBeer: {...beer.data}
  //    })
  //    console.log(this.state.randomBeer)
  //  })

 }
 extractCoordinates(latlng) {
  const lat= latlng[0];
  const lng= latlng[1];
  return [{lat, lng}];
}

  render() {
    return (
      <React.Fragment>
        <h1>Panel de control de tu mudanza</h1>
        <p>{this.props.user.username}</p>
        <p>Recogerán las cosas el día {this.props.user.bid.deadLine} entre las {this.props.user.bid.from} y las {this.props.user.bid.to}</p>
        <Bidmapcontainer position={this.extractCoordinates(this.props.user.bid.location.coordinates)}></Bidmapcontainer>
        <NavLink to={"/create-product"}>Añadir caja</NavLink>
        <h2>Tus cajas</h2>
        {this.props.user.products.map((product, idx)=> {
          return (
            <NavLink to={`/box/${product._id}`} key={idx}>
              <img src={product.imgPath1} alt="Product image"/>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Precio: {product.price} €</p>
              <p>{product.isBundle.length>0? "Pertenece a un pack furgo" : "No se vende en pack"}</p>
              
            </NavLink>
          )
        })}
        





      </React.Fragment>
    )
  }
}
