import React, { Component } from 'react';
import AddCompanyPage from './AddCompanyPage';
import FireManager from '../../firebase/FireManager';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    root: {
        width: '89%',
        margin: '5%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class CompaniesContainer extends Component {
    state = {
        companies: []
    };

    componentDidMount() {
        FireManager.getCompanies().then(querySnapshot => {
            this.setState({ companies: querySnapshot.docs.map(doc => doc.data()) })
        }).catch(function(error) {
            console.error("Error getting companies:", error);
        })
    }

    addCompanyToList = company => {
        const { companies } = this.state;
        companies.push(company);
        this.setState({ companies });
    };

    render () {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <AddCompanyPage addCompanyToList={this.addCompanyToList}/>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company name</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right" style={{width: '48px'}}>
                                <Tooltip title="Add company">
                                    <IconButton aria-label="Add company">
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.companies.map(company => (
                            <TableRow hover key={company.email + 'row'}>
                                <TableCell component="th" scope="row" key={company.name}>
                                    {company.name}
                                </TableCell>
                                <TableCell align="center" key={company.phone}>{company.phone}</TableCell>
                                <TableCell align="right" key={company.email}>{company.email}</TableCell>
                                <TableCell align="right" key={company.password}>{company.password}</TableCell>
                                <TableCell align="right" style={{width: '48px'}} key={company.password + 'edit'}>
                                    <Tooltip title="Edit">
                                        <IconButton aria-label="Edit">
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );}
}

export default withStyles(styles)(CompaniesContainer);