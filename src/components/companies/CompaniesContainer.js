import React, { Component } from 'react';
import AddCompanyPage from './AddCompanyPage';
import FireManager from '../../firebase/FireManager';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';



const styles = theme => ({
    root: {
        width: '89%',
        margin: '5%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    addCompanyDialog: {
        // width: 500
    }
});

class CompaniesContainer extends Component {
    state = {
        companies: [],
        style: {display: 'none'},
        openAddCompanyDialog: false
    };

    componentDidMount() {
        FireManager.getCompanies().then(querySnapshot => {
            this.setState({ companies: querySnapshot.docs.map(doc => doc.data()) })
        }).catch(function(error) {
            console.error("Error getting companies:", error);
        })
    }

    showandHideAddCompanyPage = () => {
    //     const style = {
    //         display: this.state.style.display === 'none' ? 'block' : 'none'
    //         };
    //     this.setState({ style });
    this.setState({openAddCompanyDialog: true})
    }

    handleClose = () => {
        this.setState({ openAddCompanyDialog: false });
    };

    // hideAddCompanyPage = () => {
    //     const main = document.getElementById('main');
    //     main.style.display = 'none';
    // }

    addCompanyToList = company => {
        const { companies } = this.state;
        companies.push(company);
        this.setState({ companies });
    }
    render () {
        const { classes } = this.props;
        const { openAddCompanyDialog } = this.state;

        return (
            <>
                <Dialog 
                        fullWidth
                        className={classes.addCompanyDialog} 
                        open={openAddCompanyDialog} 
                        onClose = {this.handleClose} 
                        aria-labelledby="simple-dialog-title"
                        onBackdropClick={this.handleClose}
                        onEscapeKeyDown={this.handleClose}
                    >
                    <DialogTitle>Add Company</DialogTitle>
                    <AddCompanyPage 
                        addCompanyToList={this.addCompanyToList} 
                        showandHideAddCompanyPage={this.showandHideAddCompanyPage}
                    />
                </Dialog>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">
                                        Companies
                                    </Typography>
                                </TableCell>
                                <TableCell colSpan={3} align='right'>
                                    <Tooltip title="Add company">
                                        <IconButton aria-label="Add company" onClick={this.showandHideAddCompanyPage}>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Password</TableCell>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );}
}

export default withStyles(styles)(CompaniesContainer);