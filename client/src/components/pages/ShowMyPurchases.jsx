import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import CollapsibleProducs from "../molecules/CollapsibleProducs";


class ShowMyPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
    console.log(this.props)
    const productsOwned = this.props.products.filter(product =>{
      console.log(product, product.buyer, this.props.user._id, product.buyer == this.props.user._id)
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
  goBack =()=> {
    this.props.history.push("/")
  }

  render() {
    if(this.state.products && this.props.user) {
      if(this.state.products.length>0){
        return (
          <div className="my-purchases">
             <a className="back-btn"><i class="medium material-icons" onClick={this.goBack}>arrow_back</i></a>
            <h2>Tus cajas compradas</h2>
            <CollapsibleProducs 
            products={this.state.products} user={this.props.user}
            // deleteFromShow={(id)=>this.deleteProduct(id)}
            ></CollapsibleProducs>
          </div>
        );
      }
      else {
        return(
          <h2>Todavía no has comprado nada</h2>
        )
      }
    
    }
    else {
      return (
        <PreloaderSpinner></PreloaderSpinner>
       
      )
    } 
  }
}

export default withRouter(ShowMyPurchases)