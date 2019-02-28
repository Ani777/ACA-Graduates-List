import React, { Component } from 'react';
import './App.css';
import { AddCompanyPage } from './components/companies/AddCompanyPage';
import Courses from "./components/courses";
import CompaniesList from './components/companies/CompaniesList';

class App extends Component {
  render() {
    return (
      <div className="App">

        <AddCompanyPage/>
        <Courses/>

        <CompaniesList/>

      </div>
    );
  }
}

export default App;