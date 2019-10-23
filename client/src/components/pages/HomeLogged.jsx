import React, { Component } from "react";
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import { Button, Tabs, Tab, Preloader } from "react-materialize";
import { withRouter } from "react-router-dom";
import ShowBid from "./ShowMyBid";
import AllProducts from "../organisms/AllProducts";
import SearchBar from "../atoms/SearchBar";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
import RoutesService from "../../RoutesService";
import ModalLoginFirst from "../auth/ModalLoginFirst";
import AllProductsAndSearch from "../organisms/AllProductsAndSearch";
import ButtonAdd from "../atoms/ButtonAdd";

class HomeLogged extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      searchProducts: props.products,
      bids: null
    };
    this.router = new RoutesService();
  }

  componentDidMount() {
    this.router.getProducts().then(response => {
      let bids = response.map(product => product.bid);
      bids.forEach(bid =>
        bid.productsList.map(id =>
          response.filter(product => product._id === id)
        )
      );
      let bidsId = [];
      bids = bids.filter(bid => {
        if (bidsId.includes(bid._id)) {
          return false;
        } else {
          bidsId.push(bid._id);
          return true;
        }
      });
      response.sort((a, b) => Math.random() - 0.5);
      this.setState({
        ...this.state,
        products: response,
        bids: bids,
        centerMap: this.props.centerMap,
        loaded: true
      });
    });
  }

  render() {
    if (!this.props.user.bid) {
      return (
        <div className="home home-logged">
          <div className="title-container">
            <h1>
              Si te acabas de mudar<br></br>o estás a punto de mudarte,<br></br>
              podemos ayudarte
            </h1>
            <img src="bkg-img.svg" alt="background image"></img>
          </div>
          <Tabs className="tab-demo z-depth-1 tabs-fixed-width tab-container">
            <Tab title="Me voy a mudar" className="me-mudo">
              <div className="mudo-container-login">
                <h3>Crea tu mudanza para poder poner cajas a la venta</h3>
                <ButtonAdd bid={true}></ButtonAdd>
              </div>
            </Tab>

            <Tab title="Me acabo de mudar" active>
              {this.state.products &&
              this.state.bids &&
              this.state.centerMap ? (
                <AllProductsAndSearch
                  bids={this.state.bids}
                  centerMap={this.props.centerMap}
                  products={this.props.products}
                ></AllProductsAndSearch>
              ) : (
                <PreloaderSpinner></PreloaderSpinner>
              )}
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return (
        <div className="home home-logged">
          <div className="title-container">
            <h1>Hacemos tu mudanza <br></br>más fácil</h1>
            <img src="bkg-img.svg" alt="background image"></img>
          </div>

          

          <Tabs className="tab-demo z-depth-1 tabs-fixed-width tab-container">
            <Tab title="Me voy a mudar" className="me-mudo">
              <div className="mudo-container-login">
                <h3>Tienes una mudanza creada. Puedes añadir cajas a la venta.</h3>
                <ButtonAdd product={true}></ButtonAdd>
              </div>
            </Tab>

            <Tab title="Me acabo de mudar" active>
              {this.state.loaded &&
              this.state.bids &&
              this.state.products &&
              this.state.centerMap ? (
                <AllProductsAndSearch
                  bids={this.state.bids}
                  centerMap={this.state.centerMap}
                  products={this.state.products}
                ></AllProductsAndSearch>
              ) : (
                <PreloaderSpinner></PreloaderSpinner>
              )}
            </Tab>
          </Tabs>
        </div>
      );
    }
  }
}

export default withRouter(HomeLogged);
