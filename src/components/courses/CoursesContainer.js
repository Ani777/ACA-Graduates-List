import React, { Component } from 'react';
import AddCoursePage from './AddCoursePage';
import FireManager from '../../firebase/FireManager';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '2%',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: '#3f51b5',
        margin: '5%',
    },
});


class CoursesContainer extends Component {

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <AddCoursePage addCourseToList={this.props.handleChange}/>
                <Grid container spacing={24}>
                    {this.props.courses.map(course => (
                        <Grid item xs={2} key={course}>
                            <Paper className={classes.paper}>
                                {course}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

//export default CoursesContainer;

export default withStyles(styles)(CoursesContainer);