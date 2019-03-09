import React, { Component } from 'react';
import FireManager from '../../firebase/FireManager';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link, matchPath} from 'react-router-dom'




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
    header: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontSize: 36,
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    mainInfo: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 4,
        textAlign: 'left',
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    contact: {
        marginTop: theme.spacing.unit * 0.5,
        textAlign: 'left',
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },

    icon: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 1.7,
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
        textDecoration: 'none',
    },
});

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
        graduate: {}
    };

    componentDidMount() {
        debugger;
        const { graduatesid } = this.props.match.params;
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
        const { graduatesid } = this.props.match.params;

        return (

            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Grid item xs={12} className={classes.header}>
                        <Grid item xs={12}>{firstName } {lastName }</Grid>
                    </Grid>


                    <Grid container className={classes.contact}>




                        <Grid item xs={6}>
                            <EmailIcon className={classes.icon}/>
                        </Grid>
                        <Grid item xs={6} className={classes.info}>
                            {email}
                        </Grid>



                        <Grid item xs={6}>
                            <PhoneIcon className={classes.icon}/>
                        </Grid>
                        <Grid item xs={6} className={classes.info}>
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


                    <Grid item xs={12}>
                       <Link to={`/graduates/${graduatesid}/editgraduateprofile`} > <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                        >

                            Edit
                        </Button>
                       </Link>
                    </Grid>
                </Paper>

            </main>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(Profile);