import React, { Component } from 'react';
import './App.css';

import { AddCompanyPage } from './components/companies/AddCompanyPage';
import Courses from "./components/courses";
import CompaniesList from './components/companies/CompaniesList';
import ButtonAppBar from "./components/Header";
import ScrollableTabsButtonForce from "./components/navbar";
import Icon from "./components/navbar/icon";
import firebase from 'firebase';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from "./components/Login"
import GraduatesList from "./components/graduates/GraduatesList";




class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            userEmail: '',
            email: '',
            password: ''
        }
    }

    handleChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){
        firebase.firestore().collection('courses').get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data().name)).then(
            courses => {
                this.setState({courses})
            }
        )
    }

    login=(e)=> {
        e.preventDefault();
        if (!this.state.userEmail) {

            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => this.setState({
                userEmail: firebase.auth().currentUser.email,
                email: '',
                password: ''
            })).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                window.alert("Error: " + errorMessage);
            });
        }
    }

    logout=(e)=>{
        firebase.auth().signOut().then(()=>{
            this.setState({userEmail: ''})
        })
    }

    render() {
        return (
            <Router>
                <div className="App">

                    <ButtonAppBar userEmail={this.state.userEmail} logout={this.logout}/>
                    {/*<Route path="/" exact strict component={Graduates} />*/}
                    <Route path="/login" exact strict render={()=> (<Login login={this.login}
                                                                    handleChange={this.handleChange}
                                                                    email={this.state.email}
                                                                    password={this.state.password}/>)} />
                    <Route path="/companies" exact strict component={CompaniesList} />
                    <Route path="/graduates" exact strict component={GraduatesList} />

                    <Route path="/courses" exact strict render={()=> (<ScrollableTabsButtonForce courses={this.state.courses}/>)} />


                    <h1>{this.state.userEmail}</h1>
                    {/*<Login/>*/}



                    {/*<AddCompanyPage/>*/}
                    {/*<Courses/>*/}

                    {/*<CompaniesList/>*/}

                </div>
            </Router>
        );
    }
}

export default App;




