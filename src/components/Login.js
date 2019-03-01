import React, { Component } from 'react';
import firebase from 'firebase';

class Login extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         email: '',
  //         password: ''
  //     };
  //   }

  // handleChange=(e)=> {
  //     this.setState({ [e.target.name]: e.target.value });
  // }

  // login=(e)=> {
  //     e.preventDefault();
  //     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ...
  //     window.alert("Error: "+errorMessage);
  //       });
  // }

  render() {
      return (
        <div>
          <form>
            <div>
            <input value={this.props.email} onChange={this.props.handleChange} type="email" name="email" id="exampleInputEmail1" placeholder="Enter email" />
              </div>
              <div>
                <input value={this.props.password} onChange={this.props.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" onClick={this.props.login}>Login</button>
        </form>
      </div>
      );
  }
}
export default Login;