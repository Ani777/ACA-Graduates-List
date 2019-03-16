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
            isAuthenticating: false
        }
    }

    handleChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        this.setState({isAuthenticating: true});
        firebase.auth().onAuthStateChanged(user=> {
            if(user){
              let userEmail = user.email;
              FireManager.getCurrentCompany(userEmail).then(company => {
                this.setState({user, company, isAuthenticating: false});
            })
            }else {
                this.setState({user: '', company: {}, isAuthenticating: false})
            }
        })};

    // componentDidUpdate() {
    //     this.setState({isAuthenticating: true})
    //     firebase.auth().onAuthStateChanged(user=> {
    //         if(user){
    //             let userId = user.uid;
    //             FireManager.getCurrentCompany(userId).then(company => {
    //                 this.setState({user, company, isAuthenticating: false});
    //             })
    //         }else {
    //             this.setState({user: null, company: null, isAuthenticating: false})
    //         }
    //     })};



    login=(e)=> {
        e.preventDefault();
        if (!this.state.user) {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => this.setState({
                user: firebase.auth().currentUser,
                email: '',
                password: '',
            })).catch(function (error) {
                // Handle Errors here.
                let errorMessage = error.message;
                // ...

                window.alert("Error: " + errorMessage);
            });
        }

    };


    logout=(e)=>{
        firebase.auth().signOut()
        //     .then(()=>{
        //     this.setState({user: '',
        //         company: null,
        //         isAuthenticating: false})
        // })
    };


    render() {
        const { isAuthenticating, user } = this.state;
        return (<>
                {isAuthenticating ? <CircularProgress disableShrink className="ban" /> : user ?
                    <Main user={user} logout={this.logout} company={this.state.company}/> : <SignIn login={this.login}
                                                                       handleChange={this.handleChange}
                                                                       email={this.state.email}
                                                                       password={this.state.password}/>
                }
            </>
        );
    }
}

export default App;




