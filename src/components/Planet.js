import React from 'react'
import { MDBIcon } from "mdbreact";

const Planet = (props) => {
  return(
  <div className= 'charac'>
    <h3> {props.name} </h3>
    <p> {props.terrain} </p>

  </div>
    )
}


export default Planet;
