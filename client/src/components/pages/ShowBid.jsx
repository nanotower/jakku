import React, { Component } from "react";
import RoutesService from "../../RoutesService";
import AllProductsAndSearch from "../organisms/AllProductsAndSearch";
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import AllProductsAndSearchOfBid from "../organisms/AllProductsAndSearchOfBid";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
moment.locale("es");

class ShowBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: null
    };
    this.router = new RoutesService();
  }

  componentDidMount() {
    this.router.getBid(this.props.id).then(bid => {
      const centerBid = {
        lat: bid.location.coordinates[1],
        lng: bid.location.coordinates[0]
      };
      this.setState({
        ...this.state,
        bid,
        centerBid,
        centerMap: this.props.centerMap
      });
    });
  }
  goBack = () => {
    this.props.history.goBack();
  };
  transformDate = () => {
    moment.lang("es");
    const dateTransformed = moment(this.state.bid.deadLine).format("LL");
    return <p>{dateTransformed}</p>;
  };

  render() {
    if (this.state.bid && this.state.centerMap) {
      return (
        <div className="render-bid-container">
          <div className="upper-section">
          <div className="bid-info-container">
            <div className="bid-text-container">
              <a className="back-btn">
                <i class="medium material-icons" onClick={this.goBack}>
                  arrow_back
                </i>
              </a>
              <p>
                Recogerán las cosas el día {this.transformDate()} entre las{" "}
                {this.state.bid.from} y las {this.state.bid.to}
              </p>
            </div>
            
            <Bidmapcontainer
              zoomMap={17}
              title={"Localización de la subasta"}
              bids={[this.state.bid]}
              centerMap={this.state.centerMap}
              centerBid={this.state.centerBid}
              mapSize={[60, 350]}
            ></Bidmapcontainer>
          </div>
          </div>

          <AllProductsAndSearchOfBid
            title={"Localización de la subasta"}
            products={this.state.bid.productsList}
          ></AllProductsAndSearchOfBid>
          {/* <AllProductsAndSearch
        title={"Localización de la subasta"}
        bids={[this.state.bid]}
        centerMap={this.state.centerMap}
        centerBid={this.state.centerBid}
        products={this.state.bid.productsList}
        zoomMap={16}
        ></AllProductsAndSearch> */}
        </div>
      );
    } else {
      return <PreloaderSpinner></PreloaderSpinner>;
    }
  }
}
export default withRouter(ShowBid);
