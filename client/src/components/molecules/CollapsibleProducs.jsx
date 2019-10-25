import React, { Component } from "react";
import { Collapsible, CollapsibleItem, Icon, Switch } from "react-materialize";
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import DelModalWarning from "./DelModalWarning";
import Productmapcontainer from "../molecules/Productmapcontainer";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export default class CollapsibleProducs extends Component {
  constructor(props) {
    super(props);
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
  transformDate = deadLine => {
    moment.locale("es");
    const dateTransformed = moment(deadLine).format("LL");
    return dateTransformed;
  };

  render() {
    if (this.props.products && this.props.user) {
      return (
        <div className="collapsible-container">
          <Collapsible accordion={true}>
            {this.props.products.map((product, idx) => {
              if (product.buyer == this.props.user._id) {
                return (
                  <CollapsibleItem
                    key={idx}
                    // header={product.name}
                    // icon={<i class="medium material-icons">done</i>}
                    info={
                      <div className="inside-box-purchased">
                        <p className="product-title-inside">{product.name}</p>

                        <p className="info-purchased-container">
                          Recogida el {this.transformDate(product.bid.deadLine)}{" "}
                          de {product.bid.from} a {product.bid.to}
                        </p>
                      </div>
                    }
                  >
                    <div className="collaps-open">
                      <div className="image-uncol-container">
                        <img
                          className="product-image-uncol"
                          src={product.imgPath1}
                          alt="Product image"
                        ></img>
                      </div>
                      <p>{product.description}</p>
                      <p>
                        <span>{product.price} €</span>
                      </p>
                      <div className="map-uncol-container">
                        <p className="map-location-title">{product.bid.location.address}</p>
                      <Productmapcontainer
                        products={[product]}
                        zoomMap={19}
                        mapSize={[40, 300]}
                        centerMap={{
                          lat: product.bid.location.coordinates[1],
                          lng: product.bid.location.coordinates[0]
                        }}
                      ></Productmapcontainer>
                      </div>
                    </div>
                  </CollapsibleItem>
                );
              } else {
                return (
                  <CollapsibleItem
                    // btnFunction={()=> console.log(product._id)}
                    // btnDel={<div className="borrar">"Ya no vendo esta caja"</div>}
                    btnDel={
                      <DelModalWarning
                        deleteFunction={() =>
                          this.props.deleteFromShow(product._id)
                        }
                      ></DelModalWarning>
                    }
                    // header={product.name}
                    key={idx}
                    info={
                      product.active ? (
                        <div className="inside-box">
                          <p className="product-title">{product.name}</p>
                        </div>
                      ) : (
                        <div className="inside-box">
                          <p>{product.name}</p>
                          <div className="selled-badge">
                            <i class="medium material-icons">done</i>
                            <p className="selled-title">Vendido</p>
                          </div>
                        </div>
                      )
                    }
                    // icon={
                    //
                    // }
                  >
                    <div className="collaps-open">
                      <div className="product-image-uncollapsed-container">
                        <img
                          className="product-image-uncollapsed"
                          src={product.imgPath1}
                          alt="Product image"
                        ></img>
                      </div>
                      <div className="info-uncollapsed">
                        <p>
                          <span>{product.price} €</span>
                        </p>
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </CollapsibleItem>
                );
              }
            })}
          </Collapsible>
        </div>
      );
    } else {
      return <PreloaderSpinner></PreloaderSpinner>;
    }
  }
}
