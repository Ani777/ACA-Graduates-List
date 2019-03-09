import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useState } from 'react';
import { useFormInput } from '../../hooks';
import {isValidEmail, isValidName, isValidPhoneNumber, isValidDateOfBirth, isValidTestResults} from "./Validator";
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
});



function EditGraduateProfile(props) {

    const profile = {
        firstName: 'Ani',
        lastName: 'Grigoryan',
        course: 'JS',
        dateOfBirth: '1985',
        phoneNumber: '093 27 22 89',
        email: 'ani@gmail.com',
        feedback: 'ggggg',
        testResults: '5',
        isWorking: 'false',
        works:'hgfds',
        id: 'eHswEIZjyu4lxd9YWJGd',
    }

    const { classes } = props;
    const course = useFormInput(profile.course);
    const dateOfBirth = useFormInput(profile.dateOfBirth);
    const email = useFormInput(profile.email);
    const feedback = useFormInput(profile.feedback);
    const firstName = useFormInput(profile.firstName);
    const lastName = useFormInput(profile.lastName);
    const phoneNumber = useFormInput(profile.phoneNumber);
    const testResults = useFormInput(profile.testResults);
    const works = useFormInput(profile.works);
    const isWorking = useFormInput(profile.isWorking);



    const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([]);
    const [lastNameValidationErrors, setLastNameValidationErrors] = useState([]);
    const [emailValidationErrors, setEmailValidationErrors] = useState([]);
    const [phoneNumberValidationErrors, setPhoneNumberValidationErrors] = useState([]);
    const [dateOfBirthValidationErrors, setDateOfBirthValidationErrors] = useState([]);
    const [testResultsValidationErrors, setTestResultsValidationErrors] = useState([]);




    function isValidSignUpForm() {

        const firstNameErrors = isValidName(firstName.value);
        setFirstNameValidationErrors(firstNameErrors);

        const lastNameErrors = isValidName(lastName.value);
        setLastNameValidationErrors(lastNameErrors);

        const emailErrors = isValidEmail(email.value);
        setEmailValidationErrors(emailErrors);

        const phoneNumberErrors = isValidPhoneNumber(phoneNumber.value);
        setPhoneNumberValidationErrors(phoneNumberErrors);

        const dateOfBirthErrors = isValidDateOfBirth(dateOfBirth.value);
        setDateOfBirthValidationErrors(dateOfBirthErrors);

        const testResultsErrors = isValidTestResults(testResults.value);
        setTestResultsValidationErrors(testResultsErrors);




        if(!firstNameErrors.length &&
            !lastNameErrors.length &&
            !emailErrors.length &&
            !phoneNumberErrors.length &&
            !dateOfBirthErrors.length &&
            !testResultsErrors.length ){
            return true
        }
    };

    function phoneNumberFormat() {
        document.getElementById("phoneNumber").value = "0-- -- -- --";
    }



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
            testResults: testResults.value,
            works: works.value,
            isWorking: document.getElementById("isWorking").value

        }

        if(!isValidSignUpForm()){
            return;
        }




        FireManager.updateGraduate('eHswEIZjyu4lxd9YWJGd', data).
        catch(err=>{
            console.error(err.message)
        })



    }

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input name="firstName"  className={classes.input}type="text" id="firstName" autoComplete="current-password" {...firstName}/>
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
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input  name="lastName" type="text" className={classes.input} id="lastName" autoComplete="current-password" {...lastName} />

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
                        <InputLabel htmlFor="course">Course</InputLabel>
                        <Input name="course" type="text" className={classes.input} id="course" autoComplete="current-password"  {...course} />
                    </FormControl>


                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input name="email" type="text" id="email" className={classes.input} autoComplete="current-password"  {...email}/>
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
                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                        <Input name="phone" type="text" id="phoneNumber" className={classes.input} autoComplete="current-password" onFocus = {phoneNumberFormat} {...phoneNumber}/>
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
                        <Input name="lastName" type="text" id="lastName" className={classes.input} autoComplete="current-password"  {...dateOfBirth}/>
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
                        <Input name="feedback" type="text" id="feedback" className={classes.input} autoComplete="current-password"  {...feedback}/>
                    </FormControl>


                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Test's Results</InputLabel>
                        <Input name="testResults" type="text" id="testResults" className={classes.input} autoComplete="current-password" {...testResults} />
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
                        <Input name="lastName" type="text" id="lastName" className={classes.input} autoComplete="current-password"  {...works}/>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick = {onGraduateFormEdit}
                    >
                        Add
                    </Button>
                </form>
            </Paper>
        </main>
    );
}
EditGraduateProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditGraduateProfile);