import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import CollapsibleProducs from "../molecules/CollapsibleProducs";


class ShowMyPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
     products:null
    };
  }

  componentDidMount() {
    // const productsOwned = this.props.products.filter(product =>{
    //   return  product.buyer?  product.buyer == this.props.user._id 
    //   : false
    // });
    // this.setState({
    //   ...this.state,
    //   products: productsOwned
    // })
  }
  getmyproducts=()=>{
    const productsOwned = this.props.products.filter(product =>{
      return  product.buyer?  product.buyer == this.props.user._id 
      : false
    }
   
    );
    this.setState({
      ...this.state,
      products: productsOwned
    })
  }

  goBack =()=> {
    this.props.history.push("/")
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.products !==
  //     prevState.someStatefulValue
  //   ) {
  //     this.props.onChange(this.state.someStatefulValue);
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.products !== this.state.products) {
  //     let firebaseRef=firebase.database().ref(this.state.products);
  //     this.setState({firebaseRef});
     
  //   }
  // }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.products!==prevState.products){
  //     let firebaseRef=prevState.firebaseRef;
  //     return {products : nextProps.products};
  //   }
  //   else return null;
  // }

  render() {
    
    
    if(this.props.products && this.props.user) { 
       
      if(this.props.products.length>0){
        return (
          <div className="my-purchases">
             <a className="back-btn"><i class="medium material-icons" onClick={this.goBack}>arrow_back</i></a>
            <h2>Tus cajas compradas</h2>
            <CollapsibleProducs 
            products={this.props.products} user={this.props.user}
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