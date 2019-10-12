import React, { Component } from "react";


export default class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      julito: 99
    };
  }
  componentDidMount(){
   
    this.props.productFromApp()
    this.setState({
      ...this.state,
      product: this.props.product,
      julito: 1
    })
  }
  change() {
    this.props.productFromApp()
    this.setState ({
      ...this.state,
      product: this.props.product,
      julito:55
    })
    console.log("%%%%", this.state)
  }
  buy() {
    this.props.buyFromApp(this.props.product._id)
  }

  render() {
    if(this.props.product) {
      return (
        <React.Fragment>
        <h1>Contenido de la caja</h1>
        <div>
          <img src={this.props.product.imgPath1} alt="product image"></img>
          <img src={this.props.product.imgPath2} alt="product image"></img>
          <img src={this.props.product.imgPath3} alt="product image"></img>
          <h1>{this.props.product.name}</h1>
          <p>{this.props.product.description}</p>
          <p>La mudanza de esta caja será el {this.props.product.bid.deadLine} de {this.props.product.bid.from} a {this.props.product.bid.to}</p>
          <p>Precio: {this.props.product.price} €</p>
          
          {this.props.product.active && (<button onClick={e => this.buy(e)}>Comprar</button>)}
          <span>{!this.props.product.active && this.props.userId==this.props.product.buyer? "Comprado! Enhorabuena" : !this.props.product.active? "Vendido": ""}</span>
          <div className="owner-container">
          <img src={this.props.product.owner.imgPath}></img>
          <p>{this.props.product.owner.username}</p>
          </div>
       
          
        </div>
        </React.Fragment>
      );
    }
    else {
      
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        
        </React.Fragment>
      )
    }
  
  }
}
