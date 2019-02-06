import React, { Component } from 'react';
import './App.css';
import FullFilm from './components/FullFilm'
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import FilmsList from './components/FilmsList'


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route
            exact path="/films"
            render={() => <FilmsList />} />

         <Route
            exact path="/films/:episode_id"
            render={() => <FullFilm/> } />


      </div>
      </Router>
    );
  }
}

export default App;
