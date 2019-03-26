import React, { Component } from 'react';
import FireManager from '../../firebase/FireManager';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import EditGraduateProfile from "./EditGraduateProfile";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({

    paper: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 5,
        minWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: `16px 24px 24px`,
        color: theme.palette.text.primary,
    },
    info: {
        marginTop: theme.spacing.unit * 0.5,
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    header: {
        paddingLeft: 'inherit'
    },
    name: {
        marginLeft: theme.spacing.unit * 8,
        fontSize: 36,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    },
    contact: {
        padding: 3,
        marginLeft: 3,
        marginTop: 15
    },
    mainInfo: {
        marginTop: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 4,
        textAlign: 'left',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    },
    icon: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 1.5,
    },
    buttons: {
       // display: "flex",
        //justifyContent: "space-between",
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 6,
    },
    progress: {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh'
    },
    first: {
        fontSize: theme.spacing.unit * 2,
        fontWeight: 'bold',

    },
    second: {
        fontSize: theme.spacing.unit * 2,
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class Profile extends Component {

    state = {
        graduate: {},
        open: false,
        loading: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.setState({loading: true})

        const { graduatesid } = this.props;
        if (graduatesid) {
            FireManager.getGraduate(graduatesid)
                .then(graduate => {
                this.setState({graduate,
                loading: false})
            });
        }
    }

    componentDidUpdate() {
        const { graduatesid } = this.props;
        if (graduatesid) {
            FireManager.getGraduate(graduatesid).then(graduate => {
                this.setState({
                    graduate,
                    loading: false
                })
            });
        }
    }


    render(){
        const { classes, graduatesid, courses } = this.props;
        const { graduate: {
            firstName,
            lastName,
            course,
            dateOfBirth,
            phoneNumber,
            email,
            feedback,
            testResults,
            isWorking,
            works
        },
        loading,
        open,
        graduate
     } = this.state;

        return (
            <>
                {loading? <div className="progress"><CircularProgress/></div>:
                <>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <EditGraduateProfile graduate={graduate} graduatesid={graduatesid} handleClose={this.handleClose} courses={courses}/>
                </Dialog>
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1'}}></div>
                    <div style={{flex: '10'}}>
                        <div className={classes.paper}>
                            <div className={classes.header}>
                                <Typography variant='h4' color='inherit' className={classes.name}>{firstName } {lastName }</Typography>
                                <Grid container className={classes.contact}>
                                    <Grid item xs={2}>
                                        <EmailIcon className={classes.icon}/>
                                    </Grid>
                                    <Grid item xs={10} className={classes.info}>
                                        {email}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <PhoneIcon className={classes.icon}/>
                                    </Grid>
                                    <Grid item xs={10} className={classes.info}>
                                        {phoneNumber}
                                    </Grid>
                                </Grid>
                            </div>
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
                                    <Typography className={classes.first}>Links</Typography>
                                </Grid>
                                <Grid item xs={8} className={classes.info}>
                                    {works && works.map(work => {
                                        if (work) {
                                            return (
                                                <a href={work} target="_blank" rel="noopener noreferrer"><Typography className={classes.second}  key = {work}>{`${work.slice(0,30)}...`}</Typography></a>
                                            )
                                        }
                                    })}
                                        
                                </Grid>
                            </Grid>
                            <div className={classes.buttons} >
                                {/* <Button  variant="contained" color="secondary" component={Link} to='/graduates'>
                                Back
                                </Button> */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleClickOpen}
                                    >
                                        Edit
                                    </Button>
                            </div>
                        </div>
                    </div>
                    <div style={{flex: '3'}}></div>
                </div>
                
                </>
                }
            </>
        )
    }
}

export default withStyles(styles)(Profile);