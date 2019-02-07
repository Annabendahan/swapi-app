import React from 'react'
import { MDBIcon } from "mdbreact";
import pic from '../starwars.gif';
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';


const Home = (props) => {
  return(
  <div className= 'Home'>
    <img  src={pic} className="home-banner" alt="fireSpot"/>
    <div className="Link">
      <Link to='/films' className="Home-btn"> ALL MOVIES </Link>
    </div>
  </div>
    )
}


export default Home;
