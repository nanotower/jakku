import React, { Component } from "react";
import { Collapsible, CollapsibleItem, Icon, Switch } from "react-materialize";
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import DelModalWarning from "./DelModalWarning";

export default class CollapsibleProducs extends Component {
  constructor(props){
    super(props)
    // this.state={
    //   products: this.props.products
    // }
  }
  
  // deleteProduct(id) {
  //   this.props.deleteFromShow(id)
  //   .then(()=> {
  //     this.setState({
  //       ...this.state,
  //       products: this.props.products
  //     })
  //   })
  // }

  render() {
    if(this.props.products && this.props.user) {
      return (
        
        <div className="collapsible-container">
          <Collapsible accordion={true}>
            {this.props.products.map((product, idx) => {
              if (product.buyer == this.props.user._id) {
                return (
                  <CollapsibleItem
                    header={product.name}
                    icon={<i class="medium material-icons">done</i>}
                    
                  >
                    <div className="collaps-open">
                      <img src={product.imgPath1} alt="Product image"></img>
                      <p>{product.description}</p>
                      <p>{product.price} €</p>
                      
                      
                    </div>
                  
                  </CollapsibleItem>
                );
              } else {
                return (
                  <CollapsibleItem
                    // btnFunction={()=> console.log(product._id)}
                    // btnDel={<div className="borrar">"Ya no vendo esta caja"</div>}
                    btnDel={
                      <DelModalWarning deleteFunction={()=>this.props.deleteFromShow(product._id)}></DelModalWarning>
                    }
                    header={product.name}   
                    key={idx}
                    info={
                      product.active ? (
                            <div>
                              <p>Disponible</p>
                            </div>
                          ) : (
                            <div>
                              <i class="medium material-icons">done</i>
                              <p>Vendido</p>
                            </div>
                          )
                    }
                    // icon={
                    //  
                    // }
                    
                  >
                    <div className="collaps-open">
                      <img src={product.imgPath1} alt="Product image"></img>
                      <p>{product.price} €</p>
                      <p>{product.description}</p>
                     
                    </div>
                  </CollapsibleItem>
                );
              }
            })}
          </Collapsible>
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
