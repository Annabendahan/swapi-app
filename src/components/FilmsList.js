import React, {Component} from 'react';
import axios from 'axios';
import { MDBIcon } from "mdbreact";
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Film from './Film'
import Spinner from '../components/UI/Spinner'
import pic from '../starwars.gif';


class FilmsList extends Component {
  constructor() {
    super();
    this.state = {
      filmsList: [],
      listLoaded: false,
      selectedFilmId: null,
      search: ''

     }}

     componentDidMount() {
          axios.get('https://swapi.co/api/films')
              .then(response => {
                  this.setState({filmsList: response.data.results, listLoaded: true})
              });
         }

      filmSelector(id) {
          this.setState({ selectedFilmId: id});
          console.log(this.state.selectedFilmId)
       }

       handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }


render () {

let FilmsList = <Spinner />

if (this.state.listLoaded === true) {
  if (this.state.search === '') {



 FilmsList = this.state.filmsList.map( film => {
  console.log(film.url.split('')[27])
          return <div className="Film"
          key={film.episode_id}>
          <Link to= {"/films/" + film.url.split('')[27]}>
            <Film
            title={film.title}
            director={film.director}
            release date={film.release_date}
            clicked={() => this.filmSelector(film.episode_id)} />
          </Link>
          </div>
         });
  } else {


    FilmsList = this.state.filmsList.map( (film) => {
          if (film.title.toLowerCase().includes(this.state.search.toLowerCase())
              || film.director.toLowerCase().includes(this.state.search.toLowerCase())) {

          return <div className="Film"
          key={film.episode_id}>
            <Link to= {"/films/" + film.url.split('')[27]}>
            <Film
            title={film.title}
            director={film.director}
            release date={film.release_date}
            clicked={() => this.filmSelector(film.episode_id)} />
            </Link>
          </div>
            }

         });
  }
}

  return(
    <div>
        <div className="movies">
          <h1> All Star-Wars movies </h1>
          <MDBIcon icon="search" className="search-i"/> <input className="search" name="search" type='text' placeholder= 'Title, Director name...'
            onChange={this.handleInput} value={this.state.search} />
          {FilmsList}
        </div>
        </div>

    )
  }}

   export default withRouter(FilmsList);
