import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Bidmarker from "../atoms/Bidmarker";

const Bidmap = withScriptjs(withGoogleMap((props) =>{
  

  let actualCenter= props.actualCenter;

  let markers = props.markers.map( (marker, idx) => <Bidmarker
                    key={idx}
                    marker={Bidmarker}
                    location={marker.userlocation}
                  />);
                  
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  40.412613, lng: 3.668405 } }
        >
        {markers}
      </GoogleMap>
    );
  }
))

export default Bidmap;