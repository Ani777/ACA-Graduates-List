import React, { Component } from 'react';
import FireManager from '../../firebase/FireManager';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '2%',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height:  theme.spacing.unit * 5,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: '#3f51b5',
        margin: '5%',

    },

    button: {
        marginRight: theme.spacing.unit * 2.5
    },
});




class CoursesContainer extends Component {
    state = {
        name: '',
        open: false,
    }

    handleChange =(e)=>{
        this.setState({name: e.target.value})
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, name: '' });
    };

    onCourseFormSubmit =(e)=> {
        e.preventDefault();
        const { name } = this.state;

        if (name) {


            const data = {
                name,
            }
            FireManager.createCourseInFirebase(data).then(() => {
                this.props.handleChange(name);
                this.setState({name: '',
                                     open: false})
            }).catch(err => {
                console.error(err.message)
            });
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">New Course</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Course Name"
                        type="email"
                        fullWidth
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} type='submit' variant="contained" color="primary" onClick={this.onCourseFormSubmit} >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.props.courses.map(course => (
                        <Grid item xs={2} key={course}>
                            <Paper className={classes.paper}>
                                {course}
                            </Paper>
                        </Grid>
                    ))}
                    <Grid item xs={2} key='addCourse'>
                        <Paper className={classes.paper}>

                            <IconButton onClick={this.handleClickOpen} >
                                <AddIcon />
                            </IconButton>

                        </Paper>

                </Grid>
                </Grid>
            </div>
                </>
        );
    }
}

//export default CoursesContainer;

export default withStyles(styles)(CoursesContainer);