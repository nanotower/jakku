import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import RoutesService from "../../RoutesService";
import LocationSearchInput from "../atoms/LocationSearchInput";
import moment from 'moment';
import { withRouter } from 'react-router-dom'




class CreateBid extends Component {
  constructor(props) {
    super();
    this.state = {
      sent: false
     
    }
    this.routes = new RoutesService()
  }
  updateFormData(e,field){
    let newState = {
      ...this.state
    };
    newState[field] = e.target.value;

    this.setState(newState);
  }

  sendState(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      sent: true
    });
    this.routes.createBid(this.state)
    // .then(() => {
    
    //   this.props.fromApp(this.state);
    //   // this.props.history.push('/show-bid')
    // })
    // .catch(e => console.log(e))
    
  }
  changeState(newValue) {
    this.setState({
      ...this.state,
      location: {
        lat: newValue.lat,
        lng: newValue.lng,
        address: newValue.address
      }
    });
  }
 
  transformDate = () => {
    moment.lang('es');
    const dateTransformed= moment(this.state.bid.deadLine).format('LLLL')
    console.log(dateTransformed)
    return <p>{dateTransformed}</p>
  }


  render() {
    if(!this.state.sent) {
      return (
        <React.Fragment>
        <form>
          <label  htmlFor="input-day">Día de finalización</label>
          <input type="date" placeholder="Cuando quieres que se lo lleven" name="dia" id="input-day" onChange={e => this.updateFormData(e, "deadLine")} ></input>
          <label htmlFor="hora">Hora de recogida</label>
          <input type="time" placeholder="Hora de comienzo de recogida" name="hora"  onChange={e => this.updateFormData(e, "from")} ></input>
          <label htmlFor="fin">Finalización de recogida</label>
          <input type="time" placeholder="Hora de finalización de recogida" name="fin"  onChange={e => this.updateFormData(e, "to")}></input>
          <label htmlFor="location">Lugar de recogida</label>
          <LocationSearchInput changeState={newValue => this.changeState(newValue)}
          value={this.state.value} name="location" placeholder="Calle o barrio" onChange={e => this.updateFormData(e, "location")}></LocationSearchInput>
          <button  onClick={e => this.sendState(e)}>Submit</button>
        </form>
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <h1>Tu mudanza</h1>
           <h3>Finaliza el día {this.transformDate()}</h3>
        <h3>Los compradores irán a recogerlo de {this.state.from} a {this.state.to}</h3>
        <h3>en {this.state.location.address}</h3>
        <p>Ya puedes añadir cajas a tu mudanza</p>
        <NavLink to={`/create-product`}>Añadir caja</NavLink>
        </React.Fragment>  
      )
    }
    
  }
}

export default withRouter(CreateBid)