import React, { Component } from 'react';

import './App.css';
import { AddCompanyPage } from './components/companies/AddCompanyPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddCompanyPage/>
      </div>
    );
  }
}

export default App;
