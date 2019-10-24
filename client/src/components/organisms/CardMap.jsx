import React, { Component } from "react";
import { Row, Col, Card } from "react-materialize";
import { NavLink } from "react-router-dom";

import moment from "moment";
import 'moment/locale/es'
moment.locale('es')

export default class CardMap extends Component {
  constructor(props) {
    super(props)
    this.state={

    }
  }
  transformDate = () => {
    moment.lang('es');
    //const dateTransformed= moment(this.props.bid.deadLine).format('LLLL')
    const dateTransformed= moment(this.props.bid.deadLine).fromNow()
    console.log(dateTransformed)
    return <p>{dateTransformed}</p>
  }


  render() {
    return (
      <div className="card-map-container">
       
            <Card
              // className="blue-grey darken-1"
              className="card-inside-map"
              textClassName="white-text"
              title=""
              actions={[<NavLink to={`/bid/${this.props.bid._id}`}>Ir a la Mudanza</NavLink>]}
            >
              <p>Esta mudanza acaba {this.transformDate()}</p>
          
            </Card>
        
       
      </div>
    );
  }



  
}


