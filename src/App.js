import React, { Component } from 'react';
import './App.css';
import initFirebase from "./firebase/fireConfig";
import LoginLogout from "./LoginLogout";


class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginLogout/>
      </div>
    );
  }
}

 export default App;

