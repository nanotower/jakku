import React from "react";
import Bidmap from "./Bidmap";

export default class Bidmapcontainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          ...this.state,
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
        console.log(this.state)
      },
      () => {
        this.setState({ loading: false });
      }
    );
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