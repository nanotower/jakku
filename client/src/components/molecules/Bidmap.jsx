import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Bidmarker from "../atoms/Bidmarker";



const Bidmap = withScriptjs(withGoogleMap((props) =>{
  console.log("dentro de bidmap", props)
  let zoom= 12;
  if(props.zoomMap) {
    zoom=props.zoomMap
  }

  let markers = props.products.map( (product, idx) => <Bidmarker
                    product={product}
                    key={idx}
                    location={{lat:product.bid.location.coordinates[1], lng: product.bid.location.coordinates[0]}}
                    activeMarker={idx === props.activeMarker ? true : false}
                    toggleShowPage={props.toggleShowPage}
                    closeMarkers={props.closeOtherMarkers}
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

export default Bidmap;