import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';
import Spinner from '../components/UI/Spinner'
import { MDBIcon } from "mdbreact";
import Modal from '../components/UI/Modal'
import Character from './Charac'


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
      characters:[]
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

 return(
 <div>
   <div className="FullFilm">
      <h1>  FILM DETAILS </h1>
    {film}
    </div>

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
       <h3> Characters </h3>
       {characs}
     </div>
    </div>
  )

}

}




export default withRouter(FullFilm);
