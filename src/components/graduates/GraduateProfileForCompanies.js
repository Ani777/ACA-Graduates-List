import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
    main: {
        maxWidth: 430,
        margin : 0,
        display: 'block',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.text.primary,
    },
    info: {
        marginTop: theme.spacing.unit * 0.5,
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,

    },
    header: {
        marginTop: theme.spacing.unit * 5,
        fontSize: 36,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    mainInfo: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 6,
        textAlign: 'left',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    },
    first: {
        fontSize: theme.spacing.unit * 2,
        fontWeight: 'bold',

    },
    second: {
        fontSize: theme.spacing.unit * 2,
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
                            <Grid container>
                                <Grid item xs={4} className={classes.info}>
                                    <Typography className={classes.first}>Links</Typography>
                                </Grid>
                                <Grid item xs={8} className={classes.info}>
                                    {works && works.map(work => {
                                        if (work) {
                                            return (
                                                <a href={work} target="_blank" rel="noopener noreferrer">
                                                    <Typography className={classes.second} key = {work}>
                                                        {`${work.slice(0,30)}...`}
                                                    </Typography>
                                                </a>
                                            )}
                                        })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </main>
            </>
        )
    }
}

export default withStyles(styles)(ProfileForCompanies);