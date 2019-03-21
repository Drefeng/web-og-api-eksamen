import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FrontPage from './components/FrontPage/FrontPage';
import Signup from './components/Signup/Signup';
import CityForm from './components/CityForm/CityForm';



class App extends Component {
  render() {
    return (<div className="App">
      <Navigation />
      <Switch>
        <Route path="/" component={FrontPage} exact />
        <Route path="/signup" component={Signup} />
        <Route path="/newcity" component={CityForm} />
      </Switch>
    </div>
    );
  }
}

export default App;
