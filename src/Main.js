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
import HeaderForCustomers from "./components/Header/headerForCustomers";
import ViewForCompanies from "./components/graduates/ViewForCompanies";


class Main extends Component {
    state={
        courses: [],
    }

    handleCoursesChange = course => {
            const { courses } = this.state;
            courses.push(course);
            this.setState({ courses });
        }


    componentDidMount() {
        firebase.firestore().collection('courses').get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data().name)).then(
            courses => {
                this.setState({courses})
            }
        )
    }


    render() {
        return (
            <>
                {this.props.company.role==='customer'?(
                    <Router>
                        <>
                       <HeaderForCustomers user={this.props.user}
                                           logout={this.props.logout} />
                                           <ViewForCompanies company={this.props.company}/>

                                           </>
                    </Router>
                ):(
            <Router>
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
                   <CoursesContainer courses={this.state.courses} handleChange={this.handleCoursesChange}/>
                )}/>
                <Route path="/graduates/addgraduate" exact strict render={() => (
                    <AddGraduate courses={this.state.courses}/>
                )}/>

                <Route path="/graduates/:graduatesid" exact strict render={({match})=>(<Profile graduatesid={match.params.graduatesid} courses={this.state.courses}/>)} />
                {/*<Route path="/graduates/:graduatesid/editgraduateprofile" exact strict component={EditGraduateProfile} />*/}
                </Switch>
                {/*<EditGraduateProfile/>*/}

            </div>
            </Router>)  }
                </>)
    }
}


export default Main;
