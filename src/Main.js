import React, { Component } from 'react';
import './App.css';
import CompaniesContainer from './components/companies/CompaniesContainer';
import ButtonAppBar from "./components/Header";
import ScrollableTabsButtonForce from "./components/navbar";
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import AddGraduate from "./components/graduates/AddGraduatePage";
import CoursesContainer from "./components/courses/CoursesContainer";

class Main extends Component {

    render() {
        return (<Router>
            <div className="App">
                <ButtonAppBar
                    user={this.props.user}
                    logout={this.props.logout}/>
                <Route path="/companies" exact strict render={() =>
                    <CompaniesContainer/>}/>
                {/*<Route path="/" exact strict render={() => (*/}
                   {/*<ScrollableTabsButtonForce/>)}/>*/}


                <Route path="/graduates" exact strict render={() => (
                    <ScrollableTabsButtonForce/>)}/>

                <Route path="/" exact strict render={() => (
                    <ScrollableTabsButtonForce/>)}/>



                <Route path="/courses" exact strict render={() => (
                   <CoursesContainer/>
                )}/>
                <Route path="/graduates/addgraduate" exact strict render={() => (
                    <AddGraduate/>
                )}/>
            </div>
        </Router>)
    }
}


export default Main;
