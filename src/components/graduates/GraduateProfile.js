import React, { Component } from 'react';
import FireManager from '../../firebase/FireManager';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import EditGraduateProfile from "./EditGraduateProfile";
import Link from '@material-ui/core/Link';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 15,
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        color: theme.palette.text.primary,
    },

    info: {
        marginTop: theme.spacing.unit * 0.5,
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,

    },

    label: {
        marginTop: theme.spacing.unit * 0.5,
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
        fontWeight: 'bold',
    },

    header: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontSize: 36,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    mainInfo: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 4,
        textAlign: 'left',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    },

    icon: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 1.7,
        marginLeft: theme.spacing.unit * 5,
    },
    submit: {
        marginTop: theme.spacing.unit,
    },
    input: {
        height: 33,
    },

    button: {
        margin: 'auto',
        width: 30,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class Profile extends Component {

    state = {
        // firstName: '',
        // lastName: '',
        // course: '',
        // dateOfBirth: '',
        // phoneNumber: '',
        // email: '',
        // feedback: '',
        // testResult: '',
        // isWorking: '',
        // works:''
        graduate: {},
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {

        const { graduatesid } = this.props;
        if (graduatesid) {
            FireManager.getGraduate(graduatesid).then(graduate => {
                this.setState({graduate}
                    // firstName: graduate.firstName,
                    // lastName: graduate.lastName,
                    // course: graduate.course,
                    // dateOfBirth: graduate.dateOfBirth,
                    // phoneNumber: graduate.phoneNumber,
                    // email: graduate.email,
                    // feedback: graduate.feedback,
                    // testResult: graduate.testResult,
                    // isWorking: graduate.isWorking,
                    // works: graduate.works,

                )
            });
        }
    }
    componentDidUpdate() {
        const { graduatesid } = this.props;
        if (graduatesid) {
            FireManager.getGraduate(graduatesid).then(graduate => {
                this.setState({graduate})
            });
        }

    }


    render(){
        const {classes} = this.props;
        const {firstName} = this.state.graduate;
        const {lastName} = this.state.graduate;
        const {course} = this.state.graduate;
        const {dateOfBirth} = this.state.graduate;
        const {phoneNumber} = this.state.graduate;
        const {email} = this.state.graduate;
        const {feedback} = this.state.graduate;
        const {testResults} = this.state.graduate;
        const {isWorking} = this.state.graduate;
        const {works} = this.state.graduate;
        const { graduatesid, courses } = this.props;

        return (
            <>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <EditGraduateProfile graduate={this.state.graduate} graduatesid={graduatesid} handleClose={this.handleClose} courses={courses}/>
                </Dialog>
            <main className={classes.main}>

                <CssBaseline />
                <Paper className={classes.paper}>
                    <Grid item xs={12} className={classes.header}>
                        <Grid item xs={12}>{firstName } {lastName }</Grid>
                    </Grid>


                    <Grid container className={classes.contact}>




                        <Grid item xs={5}>
                            <EmailIcon className={classes.icon}/>
                        </Grid>
                        <Grid item xs={7} className={classes.info}>
                            {email}
                        </Grid>



                        <Grid item xs={5}>
                            <PhoneIcon className={classes.icon}/>
                        </Grid>
                        <Grid item xs={7} className={classes.info}>
                            {phoneNumber}
                        </Grid>

                    </Grid>


                    <Grid container className={classes.mainInfo}>


                        <Grid item xs={3} className={classes.info}>
                            Course
                        </Grid>
                        <Grid item xs={9} className={classes.info}>
                            {course}
                        </Grid>




                        <Grid item xs={3} className={classes.info}>
                            Date Of Birth
                        </Grid>
                        <Grid item xs={9} className={classes.info}>
                            {dateOfBirth}
                        </Grid>


                        <Grid item xs={3} className={classes.info}>
                            Test Results
                        </Grid>
                        <Grid item xs={9} className={classes.info}>
                            {testResults}
                        </Grid>


                        <Grid item xs={3} className={classes.info}>
                            Feedback
                        </Grid>
                        <Grid item xs={9} className={classes.info}>
                            {feedback}
                        </Grid>


                        <Grid item xs={3} className={classes.info}>
                            Is Graduate Working
                        </Grid>
                        <Grid item xs={9} className={classes.info}>
                            {isWorking ? 'Yes' : 'No'}
                        </Grid>

                        <Grid item xs={3} className={classes.info}>
                            Works
                        </Grid>
                        <Grid item xs={9} className={classes.info}>
                           {works}
                        </Grid>

                    </Grid>


                    <Grid container xs={12}>
                        <Grid  xs={10}>
                        </Grid>
                        <Grid  xs={2}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={this.handleClickOpen}
                            >

                                Edit
                            </Button>
                        </Grid>

                    </Grid>
                </Paper>
            </main>
                </>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);