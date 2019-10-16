import React, { Component } from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import PreloaderSpinner from "../atoms/PreloaderSpinner";

export default class CollapsibleProducs extends Component {
  constructor(props){
    super(props)
    this.state={
      products: this.props.products
    }
  }
  
  deleteProduct(id) {
    this.props.deleteFromShow(id)
    .then(()=> {
      this.setState({
        ...this.state,
        products: this.props.products
      })
    })
  }
  componentDidMount(){
    console.log(this.props)
  }

  render() {
    if(this.props.products) {
      return (
        <div className="collapsible-container">
          <Collapsible accordion={false}>
            {this.state.products.map((product, idx) => {
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
                    header={product.name}
                    icon={
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
                  >
                    <div className="collaps-open">
                      <img src={product.imgPath1} alt="Product image"></img>
                      <p>{product.price} €</p>
                      <p>{product.description}</p>
                      <div className="borrar" ><i class="medium material-icons">cancel</i><p>Borrar</p></div>
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
