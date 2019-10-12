import React from "react";
import Bidmap from "./Bidmap";

export default class Bidmapcontainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount(props) {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     let pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     }; 
    //     this.setState({
    //       ...this.state,
    //       userLocation: pos});     
    //     console.log("location", this.state);
    //   }
    // }
    // else {
      let pos = {
        lat: 40.412613,
        lng: 3.668405
      }; 
      this.setState({
        ...this.state,
        userLocation: pos})     
      console.log("no location",this.state)

    // }
  }

	render() {
		return (
			<Bidmap
        actualCenter={this.state.userLocation}
				// doctors={this.props.doctors}
				markers={this.props.position}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `600px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}