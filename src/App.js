import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginMenu from './componentes/LoginMenu.js'
import MainRouter from './routers/MainRouter.js'


class App extends Component {
  render() {
    return (
      <div className="App">
       <MainRouter />
      </div>
    );
  }
}

export default App;
