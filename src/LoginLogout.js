import React, { Component } from 'react';
import './App.css';
import initFirebase from "./firebase/fireConfig";
import Login from "./components/Login";
import Home from "./components/Home"

class LoginLogout extends Component {
  constructor() {
    super();
    this.state = ({
      admin: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    initFirebase.auth().onAuthStateChanged((admin) => {
      if (admin) {
        this.setState({ admin });
      } else {
        this.setState({ admin: null });
      }
    });
  }
  render() {
    return (
     <div>{this.state.admin ? ( <Home/>) : (<Login />)}</div>
    );
  }
}

 export default LoginLogout;

