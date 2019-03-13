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
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({

    paper: {
        maxWidth: 500,
        marginTop: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 5,
        marginLeft: 'auto',
        marginRight: 'auto',
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
        marginTop: theme.spacing.unit * 5,
        fontSize: 36,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    mainInfo: {
        marginTop: theme.spacing.unit * 4,
        // marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 4,
        textAlign: 'left',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    },

    icon: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 1.5,
        marginLeft: theme.spacing.unit * 10,
    },

    input: {
        height: 33,
    },

    buttons: {
        // display: "flex",
        // justifyContent:
        //     "space-between",
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 4,

    },

    back: {
        display: 'inline-block',
        marginTop: theme.spacing.unit,
        marginLeft:  theme.spacing.unit * 5,


    },
    submit: {
        display: 'inline-block',
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 35,

    },
    first: {
        fontSize: theme.spacing.unit * 2,
        fontWeight: 'bold',

    },

    second: {
        fontSize: theme.spacing.unit * 2,
        // paddingTop:  theme.spacing.unit * 0.5,
    }

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
            {/*<main className={classes.main}>*/}

                {/*<CssBaseline />*/}
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center' color='inherit' className={classes.header}>{firstName } {lastName }</Typography>


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


                        <Grid item xs={4} className={classes.info}>
                            <Typography className={classes.first}>Course</Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.info}>
                            <Typography className={classes.second}>{course}</Typography>
                        </Grid>




                        <Grid item xs={4} className={classes.info}>
                            <Typography className={classes.first}>Date Of Birth</Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.info}>
                            <Typography className={classes.second}>{dateOfBirth}</Typography>
                        </Grid>


                        <Grid item xs={4} className={classes.info}>
                            <Typography className={classes.first}> Results</Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.info}>
                            <Typography className={classes.second}>{testResults}</Typography>
                        </Grid>


                        <Grid item xs={4} className={classes.info}>
                            <Typography className={classes.first}>Feedback</Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.info}>
                            <Typography className={classes.second}>{feedback}</Typography>
                        </Grid>


                        <Grid item xs={4} className={classes.info}>
                            <Typography className={classes.first}>Is Graduate Working</Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.info}>
                            <Typography className={classes.second}>{isWorking ? 'Yes' : 'No'}</Typography>
                        </Grid>

                        <Grid item xs={4} className={classes.info}>
                            <Typography className={classes.first}>Works</Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.info}>
                            <a href={works} target="_blank"><Typography className={classes.second} >{works}</Typography></a>
                        </Grid>

                    </Grid>

                    <div className={classes.buttons} >
                        <Button  variant="contained" color="secondary" className={classes.back} component={Link} to='/graduates'>
                           Back
                        </Button>

                            <Button
                                className={classes.submit}
                                variant="contained"
                                color="primary"
                                onClick={this.handleClickOpen}
                            >

                                Edit
                            </Button>
                    </div>
                </Paper>
            {/*</main>*/}
                </>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);