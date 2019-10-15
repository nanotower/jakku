import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Tabs, Tab } from "react-materialize";
import { withRouter } from "react-router-dom";
import ShowBid from "./ShowMyBid";
import AllProducts from "../organisms/AllProducts";
import SearchBar from "../atoms/SearchBar";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
import RoutesService from "../../RoutesService";
import ModalLoginFirst from "../auth/ModalLoginFirst";

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
      this.setState({
        ...this.state,
        products: response,
        bids: bids
      });
      console.log(this.state);
    });
  }

  makeSearch(searchText) {
    console.log(this.props);
    const searchProductsResults = this.state.products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(this.state);

    this.setState({
      ...this.state,
      searchProducts: searchProductsResults
    });
  }

  // changeStock(stockCheckbox) {
  //   this.setState({
  //     ...this.state,
  //     inStock: stockCheckbox
  //   });
  // }

  render() {
    
      if (!this.props.user.bid) {
        return(
          <div className="home">
          <div>
            <div className="title-container">
              <h1>
                Si te acabas de mudar o estás a punto de mudarte, podemos ayudarte
              </h1>
              <img src="bkg-img.svg" alt="background image"></img>
            </div>
            <Tabs className="tab-demo z-depth-1 tabs-fixed-width tab-container">
              <Tab title="Me voy a mudar" className="me-mudo">
                <div className="mudo-container">
                  <div className="create-bid-container">
                    <label>Crear mudanza</label>
                    <ModalLoginFirst passText={""}></ModalLoginFirst>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        )
      }
      else {
        return (
          <div>
            
          </div>

        )
      }
     
    ;
  }
}

export default withRouter(HomeLogged);
