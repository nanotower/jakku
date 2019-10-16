import React from "react";
import Bidmap from "./Bidmap";
import { relativeTimeThreshold } from "moment";

export default class Bidmapcontainer extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      activeMarker:null

    }

  }
  closeOtherMarkers = (id) => {
		this.setState({activeMarker: id})
  }
  componentDidMount = () => {
    if(this.props.centerBid) {
      this.setState({
        ...this.state,
        centerMap: this.props.centerBid
      })
    }
    else {
      this.setState({
        ...this.state,
        centerMap: this.props.centerMap
      })
    }
  }
  


	render() {
		return (
			<Bidmap
        bids={this.props.bids}
        centerMap={this.state.centerMap}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        zoomMap={this.props.zoomMap}
        activeMarker={this.state.activeMarker}
        closeOtherMarkers={this.closeOtherMarkers}
        toggleShowPage={this.props.toggleShowPage}
			/>
		);
	}
}