import React, { Component } from 'react';
import FireManager from '../../firebase/FireManager';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';






const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        padding: '2%',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    paper: {
        display: 'flex',
        width: theme.spacing.unit *16,
        padding: theme.spacing.unit * 2,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#3f51b5',
        margin: '1%',

    },

    button: {
        marginRight: theme.spacing.unit * 2.5
    },
    text: {
        verticalAlign: 'center',
    }
});




class CoursesContainer extends Component {
    state = {
        name: '',
        open: false,
    };

    handleChange =(e)=>{
        this.setState({name: e.target.value})
    };

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
                graduates: []
            };

            FireManager.createCourseInFirebase(data).then(() => {
                this.props.handleChange(name);
                this.setState({name: '',
                                     open: false})
            }).catch(err => {
                console.error(err.message)
            });
        }
    };

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

                    {this.props.courses.map(course => (

                            <Paper className={classes.paper} key={course}>
                                {course}

                                    <Tooltip title="Edit">
                                        <IconButton aria-label="Edit"  >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>


                                <Tooltip title="Delete">
                                    <IconButton aria-label="Delete" onClick={()=>this.props.deleteCourse(course)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>


                            </Paper>

                    ))}

                        <Paper className={classes.paper} key='addCourse'>
                           <Tooltip title="Add Course">
                            <IconButton onClick={this.handleClickOpen} >
                                <AddIcon />
                            </IconButton>
                           </Tooltip>

                        </Paper>


            </div>
                </>
        );
    }
}

//export default CoursesContainer;

export default withStyles(styles)(CoursesContainer);