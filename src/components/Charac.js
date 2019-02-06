import React from 'react'
import { MDBIcon } from "mdbreact";

const Character = (props) => {
  return(
  <div className= 'charac'>
  <h3> {props.name} </h3>
  <p> {props.gender} </p>
  <p> H-{props.height} </p>
  <p> M-{props.mass} </p>
  <p> Eye color: {props.eye_color} </p>

  </div>
    )
}


export default Character;
