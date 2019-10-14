import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Tabs, Tab, Col, Row, Preloader } from "react-materialize";
import AllProducts from "../organisms/AllProducts";
import SearchBar from "../atoms/SearchBar";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
import RoutesService from "../../RoutesService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: null,
      products: null
    };
    this.router= new RoutesService;
  }

  componentDidMount() {
    this.router.getProducts()
    .then(response=> {
      let bids= response.map(product=> product.bid);
      bids.forEach(bid=> bid.productsList.map(id=> response.filter(product=> product._id===id)))
      let bidsId= []
      bids= bids.filter(bid=> {
        if(bidsId.includes(bid._id)) {
          return false
        }
        else {
          bidsId.push(bid._id);
          return true
        }
      })
      this.setState({
        ...this.state,
        products: response,
        bids: bids
      })
      console.log(this.state)
    })
  }


  render() {
    // if(false){
    //   this.props.history.push('/ruta')
    // }

    return (
      <div>
        <h1>
          Si te acabas de mudar o estás a punto de mudarte, podemos ayudarte
        </h1>
        {/* <NavLink to={"/create-bid"}>Me voy a mudar</NavLink>
        <NavLink to={"/create-bid"}>Me acabo de mudar</NavLink> */}
        <Tabs className="tab-demo z-depth-1 tabs-fixed-width">
          <Tab title="Me voy a mudar"></Tab>
          <Tab title="Me acabo de mudar" active>
            {this.props.products && this.state.bids ? (
              <div>
               
                <SearchBar
                  updateSearch={searchText => this.makeSearch(searchText)}
                  // updateInStock={stockCheckbox => this.changeStock(stockCheckbox)}
                />
                <Bidmapcontainer
                  bids={this.state.bids}
                  centerMap={this.props.centerMap}
                ></Bidmapcontainer>

                <AllProducts products={this.props.products}></AllProducts>
              </div>
            ) : (
              <Preloader flashing size="small" />
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Home);
