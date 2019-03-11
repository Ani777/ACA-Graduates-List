import React, { useState } from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import {isValidEmail, isValidName, isValidPhoneNumber, isValidDateOfBirth, isValidTestResults, isValidRequired} from "./Validator";
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { Redirect} from "react-router-dom";
import { Link } from 'react-router-dom'


const styles = theme => ({
    main: {
        width: 'auto',
        fontsize: 10,
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
        marginTop: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 23,
        fontWeight: 'bold',
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit,

    },
    input: {
        height: 27,
    },
    inputLabel: {
        height: 5,
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing.unit * 6,

    },



});

function AddGraduate(props) {
    let [addedNewStudent, setAddedNewStudent] = useState(false);
    const { classes, courses } = props;
    const tabs = courses.map((course, index) => <MenuItem key={course+index} value={course}> {course} </MenuItem>);

    const course = useFormInput('');
    const dateOfBirth = useFormInput('');
    const email = useFormInput('');
    const feedback = useFormInput('');
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const phoneNumber = useFormInput('');
    const testResults = useFormInput('');
    const works = useFormInput('');
    const isWorking = useFormInput('');
    const [id, setId] = useState('');


    const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([]);
    const [lastNameValidationErrors, setLastNameValidationErrors] = useState([]);
    const [phoneNumberValidationErrors, setPhoneNumberValidationErrors] = useState([]);
    const [emailValidationErrors, setEmailValidationErrors] = useState([]);
    const [dateOfBirthValidationErrors, setDateOfBirthValidationErrors] = useState([]);
    const [testResultsValidationErrors, setTestResultsValidationErrors] = useState([]);
    const [feedbackValidationErrors, setFeedbackValidationErrors] = useState([]);
    const [courseValidationErrors, setCourseValidationErrors] = useState([]);
    /*const [isWorkingValidationErrors, setIsWorkingValidationErrors] = useState([]);*/





    function isValidSignUpForm() {

        const firstNameErrors = isValidName(firstName.value);
        setFirstNameValidationErrors(firstNameErrors);

        const lastNameErrors = isValidName(lastName.value);
        setLastNameValidationErrors(lastNameErrors);

        const emailErrors = isValidEmail(email.value);
        setEmailValidationErrors(emailErrors);

        const dateOfBirthErrors = isValidDateOfBirth(dateOfBirth.value);
        setDateOfBirthValidationErrors(dateOfBirthErrors);

        const testResultsErrors = isValidTestResults(testResults.value);
        setTestResultsValidationErrors(testResultsErrors);

        const phoneNumberErrors = isValidPhoneNumber(phoneNumber.value);
        setPhoneNumberValidationErrors(phoneNumberErrors);

        const feedbackErrors = isValidRequired(feedback.value);
        setFeedbackValidationErrors(feedbackErrors);

        const courseErrors = isValidRequired(course.value);
        setCourseValidationErrors(courseErrors);

        /*const isWorkingErrors = isValidRequired(isWorking.value);
         setIsWorkingValidationErrors(isWorkingErrors);*/





        if(!firstNameErrors.length &&
            !lastNameErrors.length &&
            !phoneNumberErrors.length &&
            !emailErrors.length &&
            !feedbackErrors.length &&
            !dateOfBirthErrors.length &&
            !courseErrors.length &&
            /*!isWorkingErrors.length &&*/
            !testResultsErrors.length ){
            return true
        }
    };




    function onGraduateFormSubmit (e) {

        e.preventDefault();

        const data = {
            course: course.value,
            dateOfBirth: Number(dateOfBirth.value),
            email: email.value,
            feedback: feedback.value,
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            testResults: Number(testResults.value),
            works: works.value,
            isWorking: isWorking.value==="true",
            visibleFor: []

        }


        if(!isValidSignUpForm()){
            return;
        }


        FireManager.createGraduateInFirebase(data)
            .then(doc=>{
                setId(doc.id)
                setAddedNewStudent(true)

            })
            .catch(err=>{
                console.error(err.message)
            })




    }

    return !addedNewStudent?(
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <Typography variant='h4' align='center' color='inherit'>New Graduate</Typography>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="firstName" className={classes.inputLabel}>First Name</InputLabel>
                        <Input name="firstName"  className={classes.input} type="text"   {...firstName}/>
                        <Hidden xlDown>
                            <Input  error={!!firstNameValidationErrors.length} {...firstName}  autoFocus />
                        </Hidden>
                        {!!firstNameValidationErrors.length && (
                            firstNameValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}

                    </FormControl>




                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName" className={classes.inputLabel}>Last Name</InputLabel>
                        <Input  name="lastName" type="text" className={classes.input}  {...lastName} />

                        <Hidden xlDown>
                            <Input error={!!lastNameValidationErrors.length} {...lastName} />
                        </Hidden>
                        {!!lastNameValidationErrors.length && (
                            lastNameValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>





                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="course">Courses</InputLabel>

                        <Select {...course}>
                            {tabs}
                        </Select>
                        <Hidden xlDown>
                            <Input  error={!!courseValidationErrors.length} {...course}  autoFocus />
                        </Hidden>
                        {!!courseValidationErrors.length && (
                            courseValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}



                    </FormControl>




                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input name="email" type="text"  className={classes.input}  {...email}/>
                        <Hidden xlDown>
                            <Input  error={!!emailValidationErrors.length} {...email} />
                        </Hidden>
                        {!!emailValidationErrors.length && (
                            emailValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}

                    </FormControl>



                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="phone" >Phone Number</InputLabel>
                        <Input name="phone" type="text" id="phoneNumber"  className={classes.input} {...phoneNumber}/>
                        <Hidden xlDown>
                            <Input  error={!!phoneNumberValidationErrors.length} {...phoneNumber}  autoFocus />
                        </Hidden>
                        {!!phoneNumberValidationErrors.length && (
                            phoneNumberValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>



                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="dateOfBirth">Date Of Birth</InputLabel>
                        <Input name="lastName" type="text" className={classes.input}  {...dateOfBirth}/>
                        <Hidden xlDown>
                            <Input  error={!!dateOfBirthValidationErrors.length} {...dateOfBirth}  autoFocus />
                        </Hidden>
                        {!!dateOfBirthValidationErrors.length && (
                            dateOfBirthValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>


                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Feedback</InputLabel>
                        <Input name="feedback" type="text"  className={classes.input}  {...feedback}/>
                        <Hidden xlDown>
                            <Input  error={!!feedbackValidationErrors.length} {...feedback} />
                        </Hidden>
                        {!!feedbackValidationErrors.length && (
                            feedbackValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}

                    </FormControl>


                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Test's Results</InputLabel>
                        <Input name="testResults" type="text"  className={classes.input}  {...testResults} />
                        <Hidden xlDown>
                            <Input  error={!!testResultsValidationErrors.length}  autoFocus />
                        </Hidden>
                        {!!testResultsValidationErrors.length && (
                            testResultsValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Is Graduate Working?</InputLabel>
                        <Select {...isWorking}  className={classes.input}>
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Works</InputLabel>
                        <Input name="lastName" type="text" id="lastName" className={classes.input}  {...works}/>
                    </FormControl>
                    <div className={classes.buttons} >
                        <Button  variant="contained" color="secondary" className={classes.submit} component={Link} to='/graduates'>
                            Cancel
                        </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick = {onGraduateFormSubmit}
                            >
                                Add
                            </Button>
                    </div>

                </form>
            </Paper>
        </main>
    ):<Redirect to= {`/graduates/${id}`}/>
}
AddGraduate.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddGraduate);