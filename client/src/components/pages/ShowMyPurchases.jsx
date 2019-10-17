import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import CollapsibleProducs from "../molecules/CollapsibleProducs";


class ShowMyPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    console.log(this.props)
    const productsOwned = this.props.products.filter(product =>{
      console.log(product.buyer, this.props.user._id, product.buyer == this.props.user._id)
      return  product.buyer?  product.buyer == this.props.user._id 
      : false
    }
    );
    console.log(productsOwned)
    this.setState({
      ...this.state,
      products: productsOwned
    })

  }

  render() {
    if(this.state.products && this.props.user) {
      return (
        <div className="my-purchases">
          <h1>Tus cajas compradas</h1>
          <CollapsibleProducs 
          products={this.state.products} user={this.props.user}
          // deleteFromShow={(id)=>this.deleteProduct(id)}
          ></CollapsibleProducs>
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

export default withRouter(ShowMyPurchases)