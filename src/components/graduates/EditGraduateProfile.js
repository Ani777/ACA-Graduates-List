import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useState } from 'react';
import { useFormInput } from '../../hooks';
import {
    isValidEmail,
    isValidName,
    isValidPhoneNumber,
    isValidDateOfBirth,
    isValidTestResults,
    isValidRequired,
    isValidUrl
} from "./Validator";
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
import Select from '@material-ui/core/Select';

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
        marginTop: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
        height: 33,
    },

    buttons: {
        display: "flex",
        justifyContent:
            "space-between",
        marginTop: theme.spacing.unit * 6,

    },

});



function EditGraduateProfile(props) {

    const { graduate, graduatesid, classes, courses } = props;
    const { visibleFor } = graduate;

    const oldCourse = graduate.course;

    const tabs = courses.map((course, index) => <MenuItem key={course+index} value={course}> {course} </MenuItem>);
    const course = useFormInput(graduate.course);
    const dateOfBirth = useFormInput(graduate.dateOfBirth);
    const email = useFormInput(graduate.email);
    const feedback = useFormInput(graduate.feedback);
    const firstName = useFormInput(graduate.firstName);
    const lastName = useFormInput(graduate.lastName);
    const phoneNumber = useFormInput(graduate.phoneNumber);
    const testResults = useFormInput(graduate.testResults);
    const works = useFormInput(graduate.works);
    const isWorking = useFormInput(graduate.isWorking);



    const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([]);
    const [lastNameValidationErrors, setLastNameValidationErrors] = useState([]);
    const [emailValidationErrors, setEmailValidationErrors] = useState([]);
    const [phoneNumberValidationErrors, setPhoneNumberValidationErrors] = useState([]);
    const [dateOfBirthValidationErrors, setDateOfBirthValidationErrors] = useState([]);
    const [testResultsValidationErrors, setTestResultsValidationErrors] = useState([]);
    const [feedbackValidationErrors, setFeedbackValidationErrors] = useState([]);
    const [courseValidationErrors, setCourseValidationErrors] = useState([]);
    const [worksValidationErrors, setWorksValidationErrors] = useState([]);




    function isValidSignUpForm() {

        const firstNameErrors = isValidName(firstName.value);
        setFirstNameValidationErrors(firstNameErrors);

        const lastNameErrors = isValidName(lastName.value);
        setLastNameValidationErrors(lastNameErrors);

        const emailErrors = isValidEmail(email.value);
        setEmailValidationErrors(emailErrors);

        const phoneNumberErrors = isValidPhoneNumber(phoneNumber.value);
        setPhoneNumberValidationErrors(phoneNumberErrors);

        // const dateOfBirthErrors = isValidDateOfBirth(String(dateOfBirth.value));
        // setDateOfBirthValidationErrors(dateOfBirthErrors);

        const testResultsErrors = isValidTestResults(String(testResults.value));
        setTestResultsValidationErrors(testResultsErrors);

        // const feedbackErrors = isValidRequired(feedback.value);
        // setFeedbackValidationErrors(feedbackErrors);

        const courseErrors = isValidRequired(course.value);
        setCourseValidationErrors(courseErrors);

        const worksErrors = isValidUrl(works.value);
        setWorksValidationErrors(worksErrors);




        if(!firstNameErrors.length &&
            !lastNameErrors.length &&
            !emailErrors.length &&
            !phoneNumberErrors.length &&
            // !dateOfBirthErrors.length &&
            // !feedbackErrors.length &&
            !courseErrors.length &&
            !testResultsErrors.length &&
            !worksErrors.length){
            return true
        }
    };

    // function phoneNumberFormat() {
    //     document.getElementById("phoneNumber").value = "0-- -- -- --";
    // }



    function onGraduateFormEdit (e) {

        e.preventDefault();
        const data = {
            course: course.value,
            dateOfBirth: dateOfBirth.value,
            email: email.value,
            feedback: feedback.value,
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            testResults: Number(testResults.value),
            works: works.value,
            isWorking: document.getElementById("isWorking").value

        }

        const dataForCompanies ={
            course: course.value,
            dateOfBirth: dateOfBirth.value,
            feedback: feedback.value,
            firstName: firstName.value,
            lastName: lastName.value,
            testResults: Number(testResults.value),
            works: works.value,
        }

        if(!isValidSignUpForm()){
            return;
        }

        FireManager.updateGraduate(graduatesid, data).then(()=>{
            props.handleClose()
        }).then(() => {
            if(visibleFor.length){
                return FireManager.updateGraduateForCompanies(visibleFor, graduatesid, dataForCompanies)
            }
        }).then(()=> {
            if(oldCourse !== data.course){
                return Promise.all([FireManager.removeGraduateFromCourse(oldCourse, graduatesid ),
                    FireManager.addGraduateToCourse(data.course, graduatesid)])
            }
        })

            .catch(err=>{
                console.error(err.message)
            })
    }

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center' color='inherit'>Edit Graduate</Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input name="firstName"  className={classes.input}type="text" id="firstName"  {...firstName}/>
                        <Hidden xlDown>
                            <Input  error={!!firstNameValidationErrors.length} {...firstName}  autoFocus />
                        </Hidden>
                        {!!firstNameValidationErrors.length && (
                            firstNameValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}

                    </FormControl>




                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input  name="lastName" type="text" className={classes.input} id="lastName"  {...lastName} />

                        <Hidden xlDown>
                            <Input error={!!lastNameValidationErrors.length} {...lastName} />
                        </Hidden>
                        {!!lastNameValidationErrors.length && (
                            lastNameValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>




                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="course">Courses</InputLabel>
                        <Select  {...course}>
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


                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input name="email" type="email" id="email" className={classes.input} {...email}/>
                        <Hidden xlDown>
                            <Input  error={!!emailValidationErrors.length} {...email} />
                        </Hidden>
                        {!!emailValidationErrors.length && (
                            emailValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}

                    </FormControl>



                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                        <Input name="phone" type="number" id="phoneNumber" className={classes.input}  {...phoneNumber}/>
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
                        <Input name="lastName" type="date" id="lastName" className={classes.input}  {...dateOfBirth}/>
                        {/*<Hidden xlDown>*/}
                            {/*<Input  error={!!dateOfBirthValidationErrors.length} {...dateOfBirth}  autoFocus />*/}
                        {/*</Hidden>*/}
                        {/*{!!dateOfBirthValidationErrors.length && (*/}
                            {/*dateOfBirthValidationErrors.map(error => (*/}
                                {/*<Typography color="error" key={error}>{error}</Typography>*/}
                            {/*))*/}
                        {/*)}*/}
                    </FormControl>


                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="feedback">Feedback</InputLabel>
                        <Input name="feedback" type="text" id="feedback" className={classes.input}  {...feedback}/>
                        {/*<Hidden xlDown>*/}
                            {/*<Input  error={!!feedbackValidationErrors.length} {...feedback} />*/}
                        {/*</Hidden>*/}
                        {/*{!!feedbackValidationErrors.length && (*/}
                            {/*feedbackValidationErrors.map(error => (*/}
                                {/*<Typography color="error" key={error}>{error}</Typography>*/}
                            {/*))*/}
                        {/*)}*/}

                    </FormControl>


                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastName">Test's Results</InputLabel>
                        <Input name="testResults" type="text" id="testResults" className={classes.input} {...testResults} />
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
                        <Select {...isWorking} id = "isWorking" className={classes.input}>
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Works</InputLabel>
                        <Input name="lastName" type="text" id="lastName" className={classes.input} {...works}/>
                        {!!worksValidationErrors.length && (
                            worksValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>
                    <div className={classes.buttons} >
                        <Button variant="contained" color="secondary" className={classes.submit} onClick={props.handleClose}>
                            Cancel
                        </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick = {onGraduateFormEdit}
                            >
                                Edit
                            </Button>
                    </div>
                </form>
            </Paper>
        </main>
    );
}
EditGraduateProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditGraduateProfile);