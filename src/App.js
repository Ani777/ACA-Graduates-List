import React, { Component } from 'react';
import './App.css';

import { AddCompanyPage } from './components/companies/AddCompanyPage';
import Courses from "./components/courses/AddCoursePage";
import CompaniesContainer from './components/companies/CompaniesContainer';
import ButtonAppBar from "./components/Header";
import ScrollableTabsButtonForce from "./components/navbar";
import Icon from "./components/navbar/icon";
import firebase from 'firebase';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from "./components/Login"
import GraduatesList from "./components/graduates/GraduatesList";
import FireManager from "./firebase/FireManager";
import AddCoursePage from "./components/courses/AddCoursePage"

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            graduates: [],
            user: '',
            email: '',
            password: '',

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
        ).then( FireManager.getGraduates().then(querySnapshot => {
            this.setState({graduates: querySnapshot.docs.map(doc => doc.data())})
        }).catch(error => {
            console.error("Error getting graduates:", error);
        }))
    }

    login=(e)=> {
        e.preventDefault();
        if (!this.state.userEmail) {

            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => this.setState({
                user: firebase.auth().currentUser,
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
            this.setState({user: ''})
        })
    }

    render() {
        return (
            <Router>
                <div className="App">


                    {/*<Route path="/" exact strict component={Graduates} />*/}
                    <Route path="/login" exact strict render={()=> (!this.state.user? (<Login login={this.login}
                                                                                             handleChange={this.handleChange}
                                                                                             email={this.state.email}
                                                                                             password={this.state.password}/>):(<Redirect to='/'/>))}/>
                    {/*<Route path="/companies" exact strict component={CompaniesList} />*/}
                    {/*<Route path="/graduates" exact strict component={GraduatesList} />*/}
                    {/*<Route path="/" exact strict component={GraduatesList} />*/}

                    {/*<Route path="/courses" exact strict render={()=> (<ScrollableTabsButtonForce courses={this.state.courses}/>)} />*/}
                    {/*<ButtonAppBar user={this.state.user} logout={this.logout}/>*/}
                    <Route path="/companies" exact strict render={()=>(
                    this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><CompaniesContainer /></>) :(<Redirect to='/login'/>)
                )}/>

                    <Route path="/" exact strict render={()=>(
                        this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><ScrollableTabsButtonForce courses={this.state.courses} graduates={this.state.graduates} /></>) :(<Redirect to='/login'/>)
                    )}/>


                    <Route path="/graduates" exact strict render={()=>(
                        this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><ScrollableTabsButtonForce courses={this.state.courses} graduates={this.state.graduates} /></>) :(<Redirect to='/login'/>)
                    )}/>


                    <Route path="/courses" exact strict render={()=>(
                        this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><AddCoursePage /></>) :(<Redirect to='/login'/>)
                    )}/>


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




