import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    main: {
        maxWidth: 430,
        margin : 0,
        display: 'block', // Fix IE 11 issue.
        // marginLeft: theme.spacing.unit * 3,
        // marginRight: theme.spacing.unit * 3,
        // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //     width: 400,
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
    },
    paper: {
        // marginTop: theme.spacing.unit * 5,
        // marginBottom: theme.spacing.unit * 5,
        display: 'flex',
        flexDirection: 'column',
        // padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
        // padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
        fontWeight: 'bold',
    },

    header: {
        marginTop: theme.spacing.unit * 5,
        fontSize: 36,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    mainInfo: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 6,
        // marginLeft: theme.spacing.unit * 5,
        // marginRight: theme.spacing.unit * 4,
        textAlign: 'left',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
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
        marginLeft:  theme.spacing.unit * 10,


    },
    submit: {
        display: 'inline-block',
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 30,

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



class ProfileForCompanies extends Component {
    render(){
        const {classes} = this.props;
        const {firstName, lastName, course, dateOfBirth, feedback, testResults, works} = this.props.graduate;

        return (
            <>

                <main className={classes.main}>

                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography variant='h4' align='center' color='inherit' className={classes.header}>{firstName } {lastName }</Typography>




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
                                <Typography className={classes.first}>Works</Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.info}>
                                <Typography className={classes.second}>{works}</Typography>
                            </Grid>

                        </Grid>


                    </Paper>
                </main>
            </>
        )
    }
}

ProfileForCompanies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileForCompanies);