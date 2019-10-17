import React, { Component } from 'react'
import RoutesService from "../../RoutesService";
import AllProductsAndSearch from '../organisms/AllProductsAndSearch';
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import { withRouter } from 'react-router-dom';
import moment from "moment";
import 'moment/locale/es'
moment.locale('es')

class ShowBid extends Component {
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
      const centerBid = {lat:bid.location.coordinates[1], lng: bid.location.coordinates[0]}
      this.setState({
        ...this.state,
        bid,
        centerBid,
        centerMap: this.props.centerMap,
      })
    })
  }
  goBack =()=> {
    this.props.history.goBack()
  }
  transformDate = () => {
    moment.lang('es');
    const dateTransformed= moment(this.state.bid.deadLine).format('LL')
    return <p>{dateTransformed}</p>
  }

  render() {
    if(this.state.bid && this.state.centerMap) {
      return (
        <div>
        <a className="back-btn"><i class="medium material-icons" onClick={this.goBack}>arrow_back</i></a>
        <p>
          Recogerán las cosas el día {this.transformDate()} entre las{" "}
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
        <PreloaderSpinner></PreloaderSpinner>
       
      )
    }
  
  }
}
export default withRouter(ShowBid)