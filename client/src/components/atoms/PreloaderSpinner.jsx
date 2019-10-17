import React, { Component } from 'react'
import { Preloader } from "react-materialize";


export default class PreloaderSpinner extends Component {
  render() {
    return (
    
        <div>
        <Preloader className="preloader" color='red' size="big" />
        </div>
   
    )
  }
}
