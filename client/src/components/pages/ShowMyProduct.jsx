import React, { Component } from "react";


export default class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    this.props.fromApp();
    const productSelected = this.props.user.products.filter(
      product => product._id == this.props.productId
    )[0];
    this.setState({
      ...this.state,
      product: productSelected
    });
  }

  render() {
    return (
      <React.Fragment>
      <h1>Mostrar caja</h1>
      <div>
        <img src={this.state.product.imgPath1} alt="product image"></img>
        <img src={this.state.product.imgPath2} alt="product image"></img>
        <img src={this.state.product.imgPath3} alt="product image"></img>
        <h1>{this.state.product.name}</h1>
        <p>{this.state.product.description}</p>
        <p>Precio: {this.state.product.price} €</p>
        <button onClick={e => this.change(e)}>Editar</button>
      </div>
      </React.Fragment>
    );
  }
}
