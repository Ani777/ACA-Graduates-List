import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import SignIn from "./components/SignIn";
import FireManager from "./firebase/FireManager";
import Main from './Main';
import CircularProgress from '@material-ui/core/CircularProgress';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            email: '',
            password: '',
            company: {},
            isAuthenticating: false,
            isValid: true
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        this.setState({isAuthenticating: true});
        firebase.auth().onAuthStateChanged(user=> {
            if(user) {
                let userEmail = user.email;
                FireManager.getCurrentCompany(userEmail)
                    .then(company => {
                    this.setState({user, company, isAuthenticating: false});
                })
                    .catch(err=>{
                    console.error("Error getting company:", err)
                })
            } else {
                this.setState({user: '', company: {}, isAuthenticating: false})
            }
        })};


    login = e => {
        e.preventDefault();
        if (!this.state.user) {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.setState({
                    user: firebase.auth().currentUser,
                    email: '',
                    password: '',
                }))
                .catch(() =>

                    this.setState({
                        isValid: false
                    })
                );
        }
    };


    logout = () => {
        firebase
            .auth()
            .signOut()
            .then(()=>{
                this.setState({
                    isValid: true
                })
            })
            .catch(err => {
                console.log('Error signing out:', err)
        })
    };


    render() {
        const { isAuthenticating, user } = this.state;
        return (<>
                {isAuthenticating ? <div className="progress"><CircularProgress disableShrink className="progress"/></div> :
                    user ?
                    <Main user={user} logout={this.logout} company={this.state.company}/> :
                    <SignIn
                        login={this.login}
                        handleChange={this.handleChange}
                        email={this.state.email}
                        password={this.state.password}
                        isValid={this.state.isValid}
                    />
                }
            </>
        );
    }
}

export default App;



