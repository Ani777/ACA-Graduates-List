import React, { Component } from 'react';
import AddCompanyPage from './AddCompanyPage';
import CompaniesList from './CompaniesList';
import FireManager from '../../firebase/FireManager';


class CompaniesContainer extends Component {
    state = {
        companies: []
    };

    componentDidMount() {
        FireManager.getCompanies().then(querySnapshot => {
            this.setState({companies: querySnapshot.docs.map(doc => doc.data())})
        }).catch(err => {
            debugger})
    }

    addCompanyToList = company => {
        const { companies } = this.state;
        companies.push(company);
        this.setState({ companies });
    }

    render() {
        return(
            <>
                <AddCompanyPage addCompanyToList={this.addCompanyToList}/>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Password</td>
                    </tr>
                    </thead>
                    <CompaniesList companies={this.state.companies}/>
                </table>
            </>
        )
    }
}

export default CompaniesContainer;