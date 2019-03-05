import React, { Component } from 'react';
import './App.css';

import CompaniesContainer from './components/companies/CompaniesContainer';
import ButtonAppBar from "./components/Header";
import ScrollableTabsButtonForce from "./components/navbar";
import firebase from 'firebase';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import AddCoursePage from "./components/courses/AddCoursePage"
import SignIn from "./components/SignIn";
import ReactVirtualizedTable from "./components/visibility/ReactVirtualizedTable";
import AddGraduate from "./components/graduates/AddGraduatePage";
import FireManager from "./firebase/FireManager";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            email: '',
            password: '',
            company: null
        }
    }

    handleChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user=> {
            if(user){
              let userId = user.uid;
              FireManager.getCurrentCompany(userId).then(company => {
                this.setState({user, company});
            })
            }else {
                this.setState({user: null, company: null})
            }
        })};



    login=(e)=> {
        e.preventDefault();
        if (!this.state.user) {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => this.setState({
                user: firebase.auth().currentUser,
                email: '',
                password: '',
            })).catch(function (error) {
                // Handle Errors here.
                var errorMessage = error.message;
                // ...

                window.alert("Error: " + errorMessage);
            });
        }
    };


    logout=(e)=>{
        firebase.auth().signOut().then(()=>{
            this.setState({user: ''})
        })
    };


    render() {
        return (
            <Router>
                <div className="App">


                    {/*<Route path="/" exact strict component={Graduates} />*/}
                    <Route path="/login" exact strict render={()=> (!this.state.user? (<SignIn login={this.login}
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
                        this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><ScrollableTabsButtonForce company={this.state.company}/></>) :(<Redirect to='/login'/>)
                    )}/>


                    <Route path="/graduates" exact strict render={()=>(
                        this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><ScrollableTabsButtonForce  company={this.state.company}/></>) :(<Redirect to='/login'/>)
                    )}/>


                    <Route path="/courses" exact strict render={()=>(
                        this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><AddCoursePage /></>) :(<Redirect to='/login'/>)
                    )}/>
                    <Route path="/graduates/addgraduate" exact strict render={()=>(
                        this.state.user? (<><ButtonAppBar user={this.state.user} logout={this.logout}/><AddGraduate /></>) :(<Redirect to='/login'/>)
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




