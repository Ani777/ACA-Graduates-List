import React, { Component } from 'react';
import './App.css';
import CompaniesContainer from './components/companies/CompaniesContainer';
import ButtonAppBar from "./components/Header";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from "react-router-dom/Route";
import AddGraduate from "./components/graduates/AddGraduatePage";
import CoursesContainer from "./components/courses/CoursesContainer";
import Profile from "./components/graduates/GraduateProfile";
import HeaderForCustomers from "./components/Header/headerForCustomers";
import ViewForCompanies from "./components/graduates/ViewForCompanies";
import FireManager from "./firebase/FireManager";
import CircularProgress from '@material-ui/core/CircularProgress';


class Main extends Component {
    state={
        courses: [],
    };

    handleCoursesChange = course => {
            const { courses } = this.state;
            courses.push(course);
            this.setState({ courses });
        };

    deleteCourse=(course)=>{
        return FireManager.deleteCourse(course)
            .then(()=>{
                return FireManager.getCourses()
            })
            .then(querySnapshot => querySnapshot.docs.map(doc => doc.data().name))
            .then(courses => {
                this.setState({courses})
            })
            .catch(err => {
                console.error(err.message)
            })
    }


    componentDidMount() {
        FireManager.getCourses()
            .then(querySnapshot => querySnapshot.docs.map(doc => doc.data().name))
            .then(
                courses => {
                    this.setState({courses})
                })
            .catch(err => {
                console.error(err.message)
            })
    }


    render() {
        const { role } = this.props.company;
        const { user, logout, company } = this.props;
        const { courses } = this.state;

        return (
            <>
                { role==='customer'?(
                    <Router>
                        <>
                           <HeaderForCustomers user={user} logout={logout} />
                           <ViewForCompanies company={company}/>
                        </>
                    </Router>
                ): role === 'admin' ? (
            <Router>
            <div className="App">

                <ButtonAppBar user={user} logout={logout}/>
                <Switch>
                    <Route path="/companies" exact strict render={() =>
                        <CompaniesContainer/>}/>
                    <Route path="/graduates" exact strict render={() => (
                        <NavBar courses={courses} />)}/>
                    <Route path="/" exact strict render={() => (
                        <NavBar courses={courses} />)}/>
                    <Route path="/courses" exact strict render={() => (
                       <CoursesContainer courses={courses}
                                         handleChange={this.handleCoursesChange}
                                         deleteCourse={this.deleteCourse}/>
                    )}/>
                    <Route path="/graduates/addgraduate" exact strict render={() => (
                        <AddGraduate courses={courses}/>
                    )}/>
                    <Route path="/graduates/:graduatesid" exact strict render={({match})=>(<Profile graduatesid={match.params.graduatesid}
                                                                                                    courses={courses}/>)} />
                </Switch>

            </div>
            </Router>) : <div className="progress"> <CircularProgress disableShrink className="progress"/></div> }
                </>)
    }
}


export default Main;
