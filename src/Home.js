import React, { Component } from 'react';
import initFirebase from "./firebase/fireConfig";

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        initFirebase.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>Welcome</h1>
               <button onClick={this.logout}>Logout</button>
            </div>
        );

    }

}

export default Home;