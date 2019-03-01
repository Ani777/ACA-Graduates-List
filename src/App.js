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




class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount(){
        firebase.firestore().collection('courses').get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data().name)).then(
            courses => {
                this.setState({courses})
            }
        )
    }
    render() {
        return (
            <Router>
                <div className="App">

                    <ButtonAppBar />
                    {/*<Route path="/" exact strict component={Graduates} />*/}
                    <Route path="/login" exact strict component={Login} />
                    <Route path="/companies" exact strict component={CompaniesList} />

                    <Route path="/courses" exact strict render={()=> (<ScrollableTabsButtonForce courses={this.state.courses}/>)} />


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




