import React, { Component } from 'react';
import AddCompanyPage from './AddCompanyPage';

class CompaniesList extends Component {
    state = {
        companies: []
    };

    addCompanyToList = company => {
        const { companies } = this.state;
        companies.push(company);
        this.setState({ companies });
    }

    render() {
        const { companies } = this.state;
        const list = companies.map(obj => <tr>
            <td>{obj.name}</td>
            <td>{obj.email}</td>
            <td>{obj.password}</td>
        </tr>);

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
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </>
        )
    }
}

export default CompaniesList;