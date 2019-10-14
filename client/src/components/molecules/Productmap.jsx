import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Bidmarker from "../atoms/Bidmarker";



const Productmap = withScriptjs(withGoogleMap((props) =>{
  console.log("dentro de Productmap", props)
  let active;
  let zoom= 12;
  if(props.zoomMap) {
    zoom=props.zoomMap
  }

  let markers = props.products.map( (product, idx) => <Bidmarker
                    product={product}
                    key={idx}
                    id={product._id}
                    closeMarkers={props.closeOtherMarkers}
                    location={{lat:product.bid.location.coordinates[1], lng: product.bid.location.coordinates[0]}}
                    toggleShowPage={props.toggleShowPage}
                    closeMarkers={props.closeOtherMarkers}
                    activeMarker={ product._id === props.activeMarker ? true : false}
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

export default Productmap;