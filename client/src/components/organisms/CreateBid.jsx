import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
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
import ButtonAdd from '../atoms/ButtonAdd';





class CreateBid extends Component {
  constructor(props) {
    super();
    this.state = {
      sent: false,
      isBid: false
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
    .then(() => {
      
      this.props.fromApp(this.state);
      // this.props.history.push('/show-bid')
    })
    .catch(e => console.log(e))
    
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
    const dateTransformed= moment(this.state.deadLine).format('LLLL')
    console.log(dateTransformed)
    return <p>{dateTransformed}</p>
  }
  componentDidMount=()=>{
    if(this.props.user.bid) {
      this.setState({
        ...this.state,
        isBid: true
      })
    }
  }


  render() {
    if(this.state.isBid){
      return(
        <div className="create-bid-active">
        <h1>Ya tienes una subasta activa</h1>
        <ButtonAdd></ButtonAdd>
     
      </div>
      )
    }
    else 
    {

      if(!this.state.sent) {
        return (
          <div className="create-bid">
          <div className="create-bid-container">
            <h1>CREA TU MUDANZA</h1>
          <form>
            <label  htmlFor="input-day">Día de finalización</label>
            <input type="date" class="datepicker" placeholder="Cuando quieres que se lo lleven" name="dia" id="input-day" onChange={e => this.updateFormData(e, "deadLine")} ></input>
            <label htmlFor="hora">Hora de recogida</label>
            <input type="time" placeholder="Hora de comienzo de recogida" name="hora"  onChange={e => this.updateFormData(e, "from")} ></input>
            <label htmlFor="fin">Finalización de recogida</label>
            <input type="time" placeholder="Hora de finalización de recogida" name="fin"  onChange={e => this.updateFormData(e, "to")}></input>
            <label htmlFor="location">Lugar de recogida</label>
            <LocationSearchInput changeState={newValue => this.changeState(newValue)}
            value={this.state.value} name="location" placeholder="Calle o barrio" onChange={e => this.updateFormData(e, "location")}></LocationSearchInput>
            <button  className="send-form" onClick={e => this.sendState(e)}>Listo para añadir cajas</button>
          </form>
          </div>
          </div>
        )
      }
      else {
        console.log(this.state)
        return (
          <div className="create-bid">
          <div className="created-bid-container">
            <h1>Tu mudanza</h1>
             <p>Finaliza el <span>{this.transformDate()}</span></p>
          <p>Los compradores irán a recogerlo de <span>{this.state.from}</span> a <span>{this.state.to}</span></p>
          <p>en <span>{this.state.location.address}</span></p>
          {/* <Bidmapcontainer
                  title={""}
                  bids={[this.state]}
                  centerBid={this.props.centerBid}
                  zoomMap={18}
                  mapSize={this.props.mapSize}
                  centerMap={{
                    lat: this.state.location.lat,
                    lng: this.state.location.lng
                  }}
                  mapSize={[30,300]}
                ></Bidmapcontainer> */}
          <p>Ya puedes añadir cajas a tu mudanza</p>
          <NavLink to={`/create-product`} className="add-box">Añadir caja</NavLink>
          </div>  
          </div>  
        )
      }
    }
    
  }
}

export default withRouter(CreateBid)