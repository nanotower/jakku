import React from "react";
import Productmap from "./Productmap";
import { relativeTimeThreshold } from "moment";

export default class Productmapcontainer extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      activeMarker:null

    }

  }
  closeOtherMarkers = (id) => {
		this.setState({activeMarker: id})
	}
  


	render() {
    let mapSize= [80, 600]
    if(this.props.mapSize) {
      mapSize=this.props.mapSize
    }
		return (
			<Productmap
        products={this.props.products}
        centerMap={this.props.centerMap}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
        // containerElement={<div style={{ height: `600px`, width: `600px` }} />}
        containerElement={<div style={{ height: `${mapSize[1]}px`, width: `${mapSize[0]}vw` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        zoomMap={this.props.zoomMap}
        activeMarker={this.state.activeMarker}
        closeOtherMarkers={this.closeOtherMarkers}
        toggleShowPage={this.props.toggleShowPage}
			/>
		);
	}
}