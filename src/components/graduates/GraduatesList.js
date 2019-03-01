import React, { Component } from 'react';
import FireManager from '../../firebase/FireManager';
import Graduate from './Graduate';

class GraduatesList extends Component {
    state = {
        graduates: []
    };

    componentDidMount() {
        FireManager.getGraduates().then(querySnapshot => {
            this.setState({graduates: querySnapshot.docs.map(doc => doc.data())})
        }).catch(error => {
            console.error("Error getting graduates:", error);
        });
    }

    render() {
        const { graduates } = this.state;
        // const graduatesList = graduates.map(graduate => <tr key={graduate.email}>
        //     <td key={graduate.firstName + graduate.email}>{graduate.firstName}</td>
        //     <td key={graduate.lastName + graduate.email}>{graduate.lastName}</td>
        //     <td key={graduate.course}>{graduate.course}</td>
        // </tr>);

        return(
            <table>
                <thead>
                <tr>
                    <td>FirstName</td>
                    <td>LastName</td>
                    <td>Courses</td>
                </tr>
                </thead>
                <tbody>
                {graduates.map(graduate => <Graduate data={graduate}/>)}
                </tbody>
            </table>
        );
    }
}

export default GraduatesList