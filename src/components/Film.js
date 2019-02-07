import React from 'react'
import { MDBIcon } from "mdbreact";

const Film = (props) => {
  return(
  <div className= 'film'>
    <div className="Film-i">
      <MDBIcon icon="film"/>
    </div>
    <h3> {props.title} </h3>
    <p> by {props.director} </p>
  </div>
    )
}


export default Film;
