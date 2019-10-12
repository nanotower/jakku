import React from "react";
import { Marker } from "react-google-maps";

// import StethoscopeIcon from "../stethoscopeIcon.png";
import Box from "../../img/box.svg"

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