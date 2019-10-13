import React from "react";
import { Marker, InfoWindow } from "react-google-maps"; 



import Box from "../../img/stethoscopeIcon.png"

export default class Bidmarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
          icon={Box}
        >
        </Marker>
    );
  }
}
