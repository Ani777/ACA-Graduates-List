import React, { Component } from 'react';

import './App.css';
import { AddCompanyPage } from './components/companies/AddCompanyPage';
import Courses from "./components/courses";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddCompanyPage/>
        <Courses/>
      </div>
    );
  }
}

export default App;
