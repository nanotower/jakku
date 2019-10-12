import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Bidmarker from "../atoms/Bidmarker";

const Bidmap = withScriptjs(withGoogleMap((props) =>{
  

  // let actualCenter= props.actualCenter;
  // console.log(props.markers)
  // let markers = props.markers.map( (marker, idx) => <Bidmarker
  //                   key={idx}
  //                   // marker={Bidmarker}
  //                   location={marker}
  //                 />);
                  
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  44, lng: 33 } }
        >
          
      </GoogleMap>
    );
  }
))

export default Bidmap;