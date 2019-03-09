import React, { Component } from 'react';
import './App.css';
import CompaniesContainer from './components/companies/CompaniesContainer';
import ButtonAppBar from "./components/Header";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import AddGraduate from "./components/graduates/AddGraduatePage";
import CoursesContainer from "./components/courses/CoursesContainer";
import firebase from 'firebase';
import Profile from "./components/graduates/GraduateProfile";
import EditGraduateProfile from "./components/graduates/EditGraduateProfile";

class Main extends Component {
    state={
        courses: []
    }

    componentDidMount() {
        firebase.firestore().collection('courses').get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data().name)).then(
            courses => {
                this.setState({courses})
            }
        )
    }


    render() {
        return (<Router>
            <div className="App">

                <ButtonAppBar
                    user={this.props.user}
                    logout={this.props.logout}/>
                <Switch>
                <Route path="/companies" exact strict render={() =>
                    <CompaniesContainer/>}/>
                {/*<Route path="/" exact strict render={() => (*/}
                   {/*<ScrollableTabsButtonForce/>)}/>*/}


                <Route path="/graduates" exact strict render={() => (
                    <NavBar courses={this.state.courses} />)}/>

                <Route path="/" exact strict render={() => (
                    <NavBar courses={this.state.courses} />)}/>



                <Route path="/courses" exact strict render={() => (
                   <CoursesContainer/>
                )}/>
                <Route path="/graduates/addgraduate" exact strict render={() => (
                    <AddGraduate courses={this.state.courses}/>
                )}/>

                <Route path="/graduates/:graduatesid" exact strict component={Profile} />
                </Switch>
                <EditGraduateProfile/>
            </div>
        </Router>)
    }
}


export default Main;
