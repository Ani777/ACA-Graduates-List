import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import initFirebase from "../firebase/fireConfig";

class Login extends Component {
  constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
          email: '',
          password: ''
      };
    }

  handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
      e.preventDefault();
      initFirebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      window.alert("Error: "+errorMessage);
        });
  }

  render() {
      return (
        <div>
          <form>
            <div>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="exampleInputEmail1" placeholder="Enter email" />
              </div>
              <div>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" onClick={this.login}>Login</button>
        </form>
      </div>
      );
  }
}
export default Login;