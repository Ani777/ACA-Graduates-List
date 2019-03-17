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
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Credentials from "./Credentials";
import ClearIcon from '@material-ui/icons/Clear';



const styles = theme => ({
    root: {
        width: '89%',
        margin: '5%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },

    title :{
        margin: '0 auto',
    },
    button: {
        marginBottom: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 2,
    }
});

class CompaniesContainer extends Component {
    state = {
        companies: [],
        availableGraduates: {},    // id = email
        openAddCompanyDialog: false,
        openAlertDialog: false,
        companyEmail: '',
        companyPassword: ''
    };

    componentDidMount() {
        FireManager.getCompanies()
            .then(querySnapshot => {
                this.setState({ companies: querySnapshot.docs.map(doc => doc.data()) });
                return querySnapshot.docs.map(doc => doc.data()) ;
            })
            .then(datas => {
                datas.forEach(data => FireManager.getAvailableGraduates(data.email).then(querySnapshot1 => {
                    const { availableGraduates } = this.state;
                    availableGraduates[data.email] = querySnapshot1.docs.length;
                    this.setState({ availableGraduates });
                }));
            })
    }

    showAddCompanyPage = () => {
        this.setState({openAddCompanyDialog: true})
    }

    showAlertDialog =()=>{
        this.setState({openAlertDialog: true})
    }

    hideAlertDialog =()=> {
        this.setState({openAlertDialog: false})
    }
    handleClose = (e) => {
        this.setState({ openAddCompanyDialog: false });
    };


    handleClear = companyId => {
        FireManager.removeAllAvailableGraduates(companyId);
        const { availableGraduates } = this.state;
        availableGraduates[companyId] = 0;
        this.setState({ availableGraduates });
    }


    addCompanyToList = company => {
        const { companies } = this.state;
        companies.push(company);
        this.handleClose();
        this.setState({ companies,
                              openAlertDialog: true,
                              companyEmail: company.email,
                              companyPassword: company.password});
    }
    render () {
        const { classes } = this.props;
        const { openAddCompanyDialog, companyEmail, companyPassword } = this.state;

        return (
            <>
                <Dialog 
                        fullWidth
                        open={openAddCompanyDialog} 
                        onClose = {this.handleClose}
                        aria-labelledby="simple-dialog-title"
                        onBackdropClick={this.handleClose}
                        onEscapeKeyDown={this.handleClose}
                    >
                    <DialogTitle className={classes.title}>Add Company</DialogTitle>
                    <AddCompanyPage 
                        addCompanyToList={this.addCompanyToList}
                        handleClose={this.handleClose}
                        showAlertDialog={this.showAlertDialog}
                    />
                </Dialog>

                <Dialog
                    open={this.state.openAlertDialog}
                    onClose={this.hideAlertDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Please create a user in "}<a href='https://console.firebase.google.com/u/1/project/aca-graduate-s-list/authentication/users' target="_blank" rel="noopener noreferrer"  >database</a> {"with following credentials:"}</DialogTitle>
                    <DialogContent>
                        <Credentials email={companyEmail} password={companyPassword}/>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.button} onClick={this.hideAlertDialog} variant="contained" color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
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
                                <TableCell colSpan={4} align='right'>
                                    <Tooltip title="Add company">
                                        <IconButton aria-label="Add company" onClick={this.showAddCompanyPage}>
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
                                <TableCell align="right">Available Graduates</TableCell>
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
                                    <TableCell align="right" key={'id-' + company.email}>
                                        <Tooltip title="Clear List">
                                            <IconButton aria-label="Clear List" onClick={() => this.handleClear(company.email)}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Tooltip>

                                        {
                                            this.state.availableGraduates[company.email] ? this.state.availableGraduates[company.email] : 0
                                        }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );}
}

export default withStyles(styles)(CompaniesContainer);