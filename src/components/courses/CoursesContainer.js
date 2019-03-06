import React, { Component } from 'react';
import AddCoursePage from './AddCoursePage';
import CoursesList from './CoursesList';
import FireManager from '../../firebase/FireManager';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import FormLabel from '@material-ui/core/FormLabel';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import RadioGroup from '@material-ui/core/RadioGroup';
//import Radio from '@material-ui/core/Radio';
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
    state = {
        courses: []
    };

    componentDidMount() {
        FireManager.getCourses().then(querySnapshot => {
            this.setState({courses: querySnapshot.docs.map(doc => doc.data())})
        }).catch(err => {
            console.error(err.message)})
    }

    addCourseToList = course => {
        const { courses } = this.state;
        courses.push(course);
        this.setState({ courses });
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <AddCoursePage addCourseToList={this.addCourseToList}/>
                <Grid container spacing={24}>
                    {this.state.courses.map(course => (
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                {course.name}
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