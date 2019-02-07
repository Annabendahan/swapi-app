import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';
import Spinner from '../components/UI/Spinner'
import { MDBIcon } from "mdbreact";
import Modal from '../components/UI/Modal'
import Character from './Charac';
import Planet from './Planet'
import Starship from './Starship'
import pic from '../james-pond-80872-unsplash.jpg'
import Chart from './Chart.js';



class FullFilm extends Component {
    constructor() {
    super();
    this.state = {
      film: [],
      filmLoaded: false,
      liked: false,
      seen: false,
      notif_liked: false,
      notif_seen:false,
      characters:[],
      planets: [],
      starships: [],
      display: 'characs'
     }
   }

   componentDidMount () {
      axios.get('https://swapi.co/api/films/' + this.props.match.params.episode_id, {
        headers: { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' ,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        }
      })
          .then(response => {
              this.setState({film: response.data, filmLoaded: true})
               this.getCharacters();
               this.getPlanets();
               this.getStarships();
              console.log(response)
          });
     }

     handleLike = () => {
      console.log("clicked")
      this.setState({ liked: !this.state.liked })
      if (!this.state.liked) {
        this.setState({ notif_liked: true})
      }
     }

      handleSeen = () => {
      this.setState({ seen: !this.state.seen})
       if (!this.state.seen) {
        this.setState({ notif_seen: true})
      }
     }


     getCharacters = () => {
      console.log(this.state.film.characters)
      var characsArray = [];
      this.state.film.characters.map((c, i) => {
        axios.get(c)
        .then(response => {
          console.log(response.data)
          characsArray.push(response.data)
         this.setState({ characters: characsArray})
      })
     })
    }

    getPlanets = () => {
      var planetsArray = [];
      this.state.film.planets.map((p, i) => {
        axios.get(p)
        .then(response => {
          planetsArray.push(response.data)
         this.setState({ planets: planetsArray})
      })
     })
    }

    getStarships = () => {
      var starshipsArray = [];
      this.state.film.starships.map((s, i) => {
        axios.get(s)
        .then(response => {
          starshipsArray.push(response.data)
         this.setState({ starships: starshipsArray})
      })
     })
    }

      displayCharacs = () => {
        this.setState({ display: 'characs'})
      }

      displayPlanets = () => {
        this.setState({ display: 'planets'})
      }


      displayStarships = () => {
        this.setState({ display: 'starships'})
      }


     stopNotif =()=> {
     this.setState({notif_liked: false, notif_seen: false})
     }


    render () {

      let characs = this.state.characters.map((c) =>{
        return <Character
        name = {c.name}
        gender= {c.gender}
        eye_color= {c.eye_color}
        height= {c.height}
        mass= {c.mass}
        />
      })


      let females = [];
      let males = [];
      let others = [];
      characs.map((c) =>{
          if (c.props.gender === 'female') {
            females.push(c)
          } else if (c.props.gender === 'male') {
            males.push(c)
          } else {
            others.push(c)
          }
      })


      let femalePerc = (".").repeat(females.length / characs.length * 100)
      let malePerc =(".").repeat(males.length / characs.length * 100)
      let otherPerc = (".").repeat(others.length / characs.length * 100)


      let planets = this.state.planets.map((p) =>{
        return <Planet
        terrain = {p.terrain}
        name= {p.name}
        />
      })

      let starships = this.state.starships.map((s) =>{
        return <Starship
        model = {s.model}
        name= {s.name}
        class= {s.starship_class}
        />
      })


      let liked = <p className="empty"> <MDBIcon icon="heart"/> </p>
      if (this.state.liked === true) {
        liked = <p className="full"> <MDBIcon icon="heart"/> </p>
      }

      let seen = <p className="empty"> <MDBIcon icon="eye"/> </p>
      if (this.state.seen === true) {
        seen = <p className="full"> <MDBIcon icon="eye"/> </p>
      }

      let film = <Spinner/>
      if ( this.state.filmLoaded === true) {
        film =
      <div>
        <h2>   {this.state.film.title} </h2>
        <div className="icones">
          <div onClick={this.handleLike}> {liked} </div>
          <div onClick={this.handleSeen}> {seen} </div>
          </div>
            <p> Directed by :  <strong>{this.state.film.director}</strong> </p>
            <p> Produced by :  <strong> {this.state.film.producer}</strong> </p>
            <p> Episode number: <strong>{this.state.film.episode_id} </strong> </p>
            <p> Realease on the :<strong> {this.state.film.release_date} </strong></p>
          </div>
      }

        let toDisplay = characs
        let tabs = ''
    if (this.state.display === "characs") {
      toDisplay = characs
      tabs= <div className= "tabs">
        <span className="tab active" onClick={this.displayCharacs}> Characters </span>
        <span className="tab" onClick={this.displayPlanets}> Planets </span>
        <span className="tab " onClick={this.displayStarships}> Starships </span>
      </div>
     } else if (this.state.display === "planets") {
      toDisplay = planets
      tabs = <div className= "tabs">
        <span className="tab " onClick={this.displayCharacs}> Characters </span>
        <span className="tab active" onClick={this.displayPlanets}> Planets </span>
        <span className="tab " onClick={this.displayStarships}> Starships </span>
      </div>
     } else if (this.state.display === "starships") {
      toDisplay = starships
      tabs = <div className= "tabs">
        <span className="tab " onClick={this.displayCharacs}> Characters </span>
        <span className="tab " onClick={this.displayPlanets}> Planets </span>
        <span className="tab active" onClick={this.displayStarships}> Starships </span>
        </div>
     }

 return(
 <div>
   <Link to= {"/films/"} className= "Nav"> <MDBIcon icon="arrow-left"/> ALL FILMS</Link>
   <div className="FullFilm">
      <img  src={pic} className="banner" alt="fireSpot"/>
      {film}
     </div>

      <div className="gender-ratio">
      <h3> Gender Ratio </h3>
        <div className="labels">
          <p> <MDBIcon className= "y1" icon="circle"/> Females ({(females.length / characs.length * 100).toFixed(2)} %) </p>
          <p> <MDBIcon className= "y2" icon="circle"/>  Males ({(males.length / characs.length * 100).toFixed(2)} %) </p>
          <p> <MDBIcon className= "y3" icon="circle"/> Others ({(others.length / characs.length * 100).toFixed(2)} %) </p>
        </div>
        <div className="jauge">
          <span className="Y1"> {femalePerc} </span>
          <span className="Y2">{malePerc }</span>
          <span className="Y3">{otherPerc }</span>
        </div>
      </div>


    {tabs}

    <Modal
          show={this.state.notif_liked}
          modalClosed={this.stopNotif}>
          <h2> You liked this movie! Thanks for sharing </h2>
          <div className="modal-i"> <MDBIcon icon="thumbs-up"/> </div>
    </Modal>

    <Modal
          show={this.state.notif_seen}
          modalClosed={this.stopNotif}>
          <h2> You've seen this movie! Thanks for sharing</h2>
          <div className="modal-i"> <MDBIcon icon="thumbs-up"/> </div>
    </Modal>

    <div className="Characters">
       {toDisplay}
     </div>

    </div>
  )
}
}


export default withRouter(FullFilm);
