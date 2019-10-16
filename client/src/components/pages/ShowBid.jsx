import React, { Component } from 'react'
import RoutesService from "../../RoutesService";
import AllProductsAndSearch from '../organisms/AllProductsAndSearch';
import { Preloader } from "react-materialize";

export default class ShowBid extends Component {
  constructor(props) {
    super(props)
    this.state= {
      bid: null
    }
    this.router= new RoutesService;
  }

  componentDidMount() {
    this.router.getBid(this.props.id)
    .then(bid=>{
      console.log("llega bid id desde back", bid)
      const centerBid = {lat:bid.location.coordinates[1], lng: bid.location.coordinates[0]}
      this.setState({
        ...this.state,
        bid,
        centerBid,
        centerMap: this.props.centerMap,
      })
    })
  }

  render() {
    if(this.state.bid && this.state.centerMap) {
      return (
        <div>
        <p>
          Recogerán las cosas el día {this.state.bid.deadLine} entre las{" "}
          {this.state.bid.from} y las {this.state.bid.to}
        </p>
        <AllProductsAndSearch
        title={"Localización de la subasta"}
        bids={[this.state.bid]}
        centerMap={this.state.centerMap}
        centerBid={this.state.centerBid}
        products={this.state.bid.productsList}
        zoomMap={16}
        ></AllProductsAndSearch>
        
        </div>
        )
    }
    else {
      return (
        <div className="preloader">
            <Preloader flashing size="big" />
        </div>
       
      )
    }
  
  }
}
