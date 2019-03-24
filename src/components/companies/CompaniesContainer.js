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
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../alertDialogs/AlertDialog';




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
    },
});

class CompaniesContainer extends Component {
    state = {
        companies: [],
        availableGraduates: {},    // {id1: length1, id2: lenght2,...} // (id = email)
        openAddCompanyDialog: false,
        openAlertDialog: false,
        showCreateUserDialog: true,
        alertMessage: [],          // ['str1', 'str2']
        companyEmail: '',
        companyPassword: '',
        openDeleteDialog: false
    };

    componentDidMount() {
        FireManager.getCompanies()
            .then(querySnapshot => {
                const datas = querySnapshot.docs.map(doc => doc.data());
                //const admins = datas.filter(item => item.role === 'admin');
                const companies = datas.filter(item => item.role === 'customer');
                this.setState({ companies });
                return companies;
            })
            .then(datas => {
                datas.forEach(data => FireManager.getAvailableGraduates(data.email).then(querySnapshot => {
                    const { availableGraduates } = this.state;
                    availableGraduates[data.email] = querySnapshot.docs.length;
                    this.setState({ availableGraduates });
                }));
            })
    }


    showAddCompanyPage = () => {
        this.setState({openAddCompanyDialog: true})
    }

    hideAddCompanyPage = () => {
        this.setState({openAddCompanyDialog: false})
    }

    showAlertDialog = () =>{
        this.setState({openAlertDialog: true})
    }

    hideAlertDialog =()=> {
        this.setState({
            openAlertDialog: false,

        })
    }

    handleClickOpenDeleteDialog = currentCompanyId => {
        this.setState({
            openDeleteDialog: true,
            companyEmail: currentCompanyId,
        });
    };

    handleCloseDeleteDialog = () => {
        this.setState({ openDeleteDialog: false });
    };

    handleCloseDeleteDialog = () => {
        this.setState({ openDeleteDialog: false });
    };

    handleClear = companyId => {
        FireManager.removeAllAvailableGraduates(companyId);
        const { availableGraduates } = this.state;
        availableGraduates[companyId] = 0;
        this.setState({ availableGraduates });
    }

    handleDelete = () => {
        //const availableGraduatesIds;
        const { companyEmail } = this.state;
        FireManager.getAvailableGraduates(companyEmail).then(querySnapshot => querySnapshot.docs.map(doc => doc.id))
            .then(availableGraduatesIds => availableGraduatesIds.forEach(id => {
                FireManager.getGraduate(id)
                    .then(data => data.visibleFor.filter(compId => compId !== companyEmail))
                    .then(newVisibleFor => FireManager.updateGraduate(id, { visibleFor: newVisibleFor }))
            }));

        this.handleClear(companyEmail);
        FireManager.removeCompany(companyEmail);
        this.setState({
            companies: this.state.companies.filter(company => company.email !== companyEmail),
            openAlertDialog: true,
            showCreateUserDialog: false,
            alertMessage: ['Please delete user in ', ' with following email address:'],
            openDeleteDialog: false
            // companyEmail: currentCompanyId,
            // companyPassword: company.password
        });
    }


    addCompanyToList = company => {
        const { companies } = this.state;
        companies.push(company);
        this.hideAddCompanyPage();
        this.setState({ companies,
            showCreateUserDialog: true,
            openAlertDialog: true,
            alertMessage: ['Please create a user in ', ' with following credentials:'],
            companyEmail: company.email,
            companyPassword: company.password
        });
    }

    render () {
        const { classes } = this.props;
        const {
            openAddCompanyDialog,
            showCreateUserDialog,
            alertMessage,
            companyEmail,
            companyPassword,
            companies
        } = this.state;

        return (
            <>
                <Dialog
                    fullWidth
                    open={openAddCompanyDialog}
                    onClose = {this.hideAddCompanyPage}
                    aria-labelledby="simple-dialog-title"
                    onBackdropClick={this.hideAddCompanyPage}
                    onEscapeKeyDown={this.hideAddCompanyPage}
                >
                    <DialogTitle className={classes.title}>Add Company</DialogTitle>
                    <AddCompanyPage
                        addCompanyToList={this.addCompanyToList}
                        handleClose={this.hideAddCompanyPage}
                        // showAlertDialog={this.showAlertDialog}
                    />
                </Dialog>
                <AlertDialog
                    open={this.state.openDeleteDialog}
                    close={this.handleCloseDeleteDialog}
                    onYesBtnClick={this.handleDelete}
                    subject={'this company'}
                />
                <Dialog
                    open={this.state.openAlertDialog}
                    onClose={this.hideAlertDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {alertMessage[0]}
                        <a href='https://console.firebase.google.com/u/1/project/aca-graduate-s-list/authentication/users' target="_blank" rel="noopener noreferrer" style={{color:"#3f51b5"}}>
                            database
                        </a>
                        {alertMessage[1]}
                    </DialogTitle>
                    <DialogContent>
                        <Credentials email={companyEmail} password={companyPassword} showCreateUserDialog={showCreateUserDialog}/>
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
                                <TableCell colSpan={5} align='right'>
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
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.map(company => (
                                <TableRow hover key={company.email + 'row'}>
                                    <TableCell component="th" scope="row" key={company.name}>
                                        {company.name}
                                    </TableCell>
                                    <TableCell align="center" key={company.phone}>{company.phone}</TableCell>
                                    <TableCell align="right" key={company.email}>{company.email}</TableCell>
                                    <TableCell align="right" key={company.password}>{company.password}</TableCell>
                                    <TableCell align="right" key={'id-' + company.email}>
                                        {this.state.availableGraduates[company.email] ? this.state.availableGraduates[company.email] : 0}
                                        <Tooltip title="Clear List">
                                            <IconButton aria-label="Clear List" onClick={() => this.handleClear(company.email)}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Delete Company">
                                            <IconButton aria-label="Delete Company" onClick={() => this.handleClickOpenDeleteDialog(company.email)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );}
}

export default withStyles(styles)(CompaniesContainer);