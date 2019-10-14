import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import CardMap from "../organisms/CardMap";



import Box from "../../img/boxMapIcon.png"

export default class Bidmarker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      activeMarker: this.props.activeMarker
    }
  }

  toggleOpen = () => {
    console.log("inside bidmarker", this.state)
    this.setState({isOpen: !this.state.isOpen}, () =>{
        if (!this.state.isOpen){
          this.setState({activeMarker: false}, () => {
            this.props.closeMarkers(null)
          })
        } else{
          this.props.closeMarkers(this.props.id)
        }
      }
    )
  }

  // render(){
  //   return(
  //       <Marker
  //         position={this.props.location}
  //         icon={Box}
  //         onClick={this.toggleOpen}
  //       >
  //       </Marker>
  //   );
  // }

  render(){
    return(

        <Marker onClick={this.toggleOpen}
          position={this.props.location}
          icon={Box}
        >
        { this.state.isOpen && this.state.activeMarker ?
          <InfoWindow maxWidth={800} defaultPosition={ this.props.location } onCloseClick={this.props.onToggleOpen}>
            <CardMap toggleShowPage={this.props.toggleShowPage} bid={this.props.product.bid}/>
          </InfoWindow> : null
        }
        </Marker>
    
    )

  }
}
