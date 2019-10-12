import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Bidmarker from "../atoms/Bidmarker";

const Bidmap = withScriptjs(withGoogleMap((props) =>{
  

  let actualCenter= props.actualCenter;
  // console.log(props.markers)
  let markers = props.markers.map( (marker, idx) => <Bidmarker
                    key={idx}
                    marker={Bidmarker}
                    location={{}}
                    location={marker.userlocation}
                  />);
                  
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  actualCenter.lat, lng: actualCenter.lng } }
        >
        {markers}
      </GoogleMap>
    );
  }
))

export default Bidmap;