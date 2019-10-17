import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Bidmapcontainer from "../molecules/Productmapcontainer";
import { Row, Card, CardTitle, Col, Preloader} from 'react-materialize';
import AllProducts from "../organisms/AllProducts";
import ButtonAdd from "../atoms/ButtonAdd";
import CollapsibleProducs from "../molecules/CollapsibleProducs";
import RoutesService from "../../RoutesService";
import PreloaderSpinner from "../atoms/PreloaderSpinner";
import { withRouter } from 'react-router-dom';
import moment from "moment";
import 'moment/locale/es'
moment.locale('es')

class ShowMyBid extends Component {
  constructor(props) {
    super(props);
    this.state= {

    }
    this.router = new RoutesService()
  }
  componentDidMount=() =>{
    return this.router.getProducts().then(response => {
      const products= response.filter(product=> product.owner==this.props.user._id);
      this.setState({
        ...this.state,
        products: products
      });
    });
    // console.log(this.state)
    // this.props.fromApp()
    // .then(()=> {
    //   this.setState({
    //     ...this.state,
    //     user: this.props.user,
    //   })
    // })

  }
  // deleteProduct = (id) => {
  //   console.log("borrando")
  //   this.route.deleteProduct(id)
  //   .then(user => {
  //     this.setState({
  //       ...this.state,
  //       user
  //     })
  //   })
  // }
  goBack =()=> {
    this.props.history.push("/")
  }
  transformDate = () => {
    moment.lang('es');
    const dateTransformed= moment(this.props.user.bid.deadLine).format('LL')
    return <p>{dateTransformed}</p>
  }
  extractCoordinates(latlng) {
    const lat = latlng[0];
    const lng = latlng[1];
    return [{ lat, lng }];
  }

  render() {
    if(this.props.user.bid ) {
      if(this.state.products) {
        return (

          <div className="your-bid-container">
            <a className="back-btn"><i class="medium material-icons" onClick={this.goBack}>arrow_back</i></a>
          <h1>Panel de control de tu mudanza</h1>
           <p>{this.props.user.username}</p>
          <p>
            Recogerán las cosas el día {this.transformDate()} entre las{" "}
            {this.props.user.bid.from} y las {this.props.user.bid.to}
          </p>
          
          <ButtonAdd product={true}></ButtonAdd>
        
          <h2>Tus cajas</h2>
          <CollapsibleProducs 
          products={this.state.products} user={this.props.user}
          // deleteFromShow={(id)=>this.deleteProduct(id)}
          ></CollapsibleProducs>
         
    
        
          </div>
    
          )

      }
      else {
        return (
          <PreloaderSpinner></PreloaderSpinner>
        )

      }
      
    }
    else {
      return(
        <div className="your-bid-container">
        <p>No tienes ninguna mudanza creada.</p>
        <ButtonAdd bid={true}></ButtonAdd>
        </div>
      )
    }
    
      
      
   

   
  }

}
export default withRouter(ShowMyBid)
