import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
import { Row, Card, CardTitle, Col, Preloader } from "react-materialize";
import AllProducts from "../organisms/AllProducts";
import ButtonAdd from "../atoms/ButtonAdd";
import CollapsibleProducs from "../molecules/CollapsibleProducs";
import RoutesService from "../../RoutesService";
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import DelModalWarning from "../molecules/DelModalWarning";
moment.locale("es");

class ShowMyBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      product: this.props.user.products
    };
    this.router = new RoutesService();
  }
  componentDidMount = () => {
    // this.setState({
    //   ...this.state,
    //   products:this.props.user.products
    // })
    // this.router.getProducts().then(response => {
    //   const products= response.filter(product=> product.owner==this.props.user._id)
    //   this.setState({
    //     ...this.state,
    //     products: products
    //   });
    // });
    // console.log(this.state)
    this.props.fromApp().then(() => {
      this.setState({
        ...this.state,
        user: this.props.user,
        products: this.props.user.products
      });
    });
  };

  deleteProduct = id => {
    console.log(id);
    console.log("borrando");
    this.router.deleteProduct(id).then(user => {
      this.setState({
        ...this.state,
        user: user,
        products: user.products
      });
    });
  };

  goBack = () => {
    this.props.history.push("/");
  };
  
  transformDate = () => {
    moment.lang("es");
    const dateTransformed = moment(this.props.user.bid.deadLine).format("LL");
    return <p>{dateTransformed}</p>;
  };

  extractCoordinates(latlng) {
    const lat = latlng[0];
    const lng = latlng[1];
    return [{ lat, lng }];
  }

  render() {
    if (this.props.user.bid) {
      if (this.state.user.products) {
        return (
          <div className="your-bid-container">
            <a className="back-btn">
                <i class="medium material-icons" onClick={this.goBack}>
                  arrow_back
                </i>
              </a>
            <h1>Panel de control de tu mudanza</h1>
            <div className="content">
            <div className="top-box">
              
              
              <p>
                Recogerán las cosas el día <span>{this.transformDate()}</span>{" "}
                entre las
                <span>{this.props.user.bid.from}</span> y las{" "}
                <span>{this.props.user.bid.to}</span>
              </p>

              <Bidmapcontainer
                  title={"Localización de la subasta"}
                  bids={[this.props.user.bid]}
                  centerBid={this.props.centerBid}
                  zoomMap={18}
                  mapSize={this.props.mapSize}
                  centerMap={{
                    lat: this.props.user.bid.location.coordinates[1],
                    lng: this.props.user.bid.location.coordinates[0]
                  }}
                  mapSize={[30,300]}
                ></Bidmapcontainer>
                            
            </div>
            <div className="box-container"> 
            <h2>TUS CAJAS</h2>
            <ButtonAdd
                product={true}
                passText="Ya no vendo esta caja"
              ></ButtonAdd>
            <CollapsibleProducs
              products={this.state.products}
              user={this.state.user}
              deleteFromShow={id => this.deleteProduct(id)}
            ></CollapsibleProducs>

            </div>
            </div>
          </div>
        );
      } else {
        return <PreloaderSpinner></PreloaderSpinner>;
      }
    } else {
      return (
        <div className="your-bid-container">
          <p>No tienes ninguna mudanza creada.</p>
          <ButtonAdd bid={true}></ButtonAdd>
        </div>
      );
    }
  }
}
export default withRouter(ShowMyBid);
