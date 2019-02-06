import React from 'react'
import { MDBIcon } from "mdbreact";

const Starship = (props) => {
  return(
  <div className= 'charac'>
  <h3> {props.name} </h3>
  <p> {props.model} </p>
  <p> {props.starship_class} </p>

  </div>
    )
}


export default Starship;
