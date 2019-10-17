import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Bidmarker from "../atoms/Bidmarker";



const Bidmap2 = withScriptjs(withGoogleMap((props) =>{

  let active;
  let zoom= 12;
  if(props.zoomMap) {
    zoom=props.zoomMap
  }

  let markers = props.bids.map( (bid, idx) => <Bidmarker
                    bid={bid}
                    key={idx}
                    id={bid._id}
                    closeMarkers={props.closeOtherMarkers}
                    location={{lat:bid.location.coordinates[1], lng: bid.location.coordinates[0]}}
                    toggleShowPage={props.toggleShowPage}
                    closeMarkers={props.closeOtherMarkers}
                    activeMarker={ bid._id === props.activeMarker ? true : false}
                  />);          
  return (

      <GoogleMap
        defaultZoom={zoom}
        center={ { lat:  props.centerMap.lat , lng: props.centerMap.lng } }
        // center={ center }
        >
          {markers}
      </GoogleMap>
    );
  }
))

export default Bidmap2;