import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useState } from 'react';
import { useFormInput } from '../../hooks';
import {
    isValidEmail,
    isValidName,
    isValidPhoneNumber,
    isValidYearOfBirth,
    isValidTestsResult,
    isValidRequired, isValidUrl
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
        justifyContent: "space-between",
        marginTop: theme.spacing.unit * 6,
    },

});


function EditGraduateProfile(props) {

    const { graduate, graduatesid, classes, courses } = props;
    const { visibleFor } = graduate;
    const oldCourse = graduate.course;
    const tabs = courses.map((course, index) => <MenuItem key={course+index} value={course}> {course} </MenuItem>);
    const firstName = useFormInput(graduate.firstName);
    const lastName = useFormInput(graduate.lastName);
    const course = useFormInput(graduate.course);
    const email = useFormInput(graduate.email);
    const phoneNumber = useFormInput(graduate.phoneNumber);
    const yearOfBirth = useFormInput(graduate.yearOfBirth);
    const feedback = useFormInput(graduate.feedback);
    const testsResult = useFormInput(graduate.testResults);
    const isWorking = useFormInput(graduate.isWorking);
    const works = useFormInput(graduate.works);

    const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([]);
    const [lastNameValidationErrors, setLastNameValidationErrors] = useState([]);
    const [courseValidationErrors, setCourseValidationErrors] = useState([]);
    const [emailValidationErrors, setEmailValidationErrors] = useState([]);
    const [phoneNumberValidationErrors, setPhoneNumberValidationErrors] = useState([]);
    const [yearOfBirthValidationErrors, setYearOfBirthValidationErrors] = useState([]);
    const [testsResultValidationErrors, setTestsResultValidationErrors] = useState([]);
    const [worksValidationErrors, setWorksValidationErrors] = useState([]);


    function isValidSignUpForm() {

        const firstNameErrors = isValidName(firstName.value);
        setFirstNameValidationErrors(firstNameErrors);

        const lastNameErrors = isValidName(lastName.value);
        setLastNameValidationErrors(lastNameErrors);

        const courseErrors = isValidRequired(course.value);
        setCourseValidationErrors(courseErrors);

        const emailErrors = isValidEmail(email.value);
        setEmailValidationErrors(emailErrors);

        const phoneNumberErrors = isValidPhoneNumber(phoneNumber.value);
        setPhoneNumberValidationErrors(phoneNumberErrors);

        const yearOfBirthErrors = isValidYearOfBirth(String(yearOfBirth.value));
        setYearOfBirthValidationErrors(yearOfBirthErrors);

        const testsResultErrors = isValidTestsResult(String(testsResult.value));
        setTestsResultValidationErrors(testsResultErrors);

        const worksErrors = isValidUrl(works.value);
        setWorksValidationErrors(worksErrors);

        if(!firstNameErrors.length &&
            !lastNameErrors.length &&
            !courseErrors.length &&
            !emailErrors.length &&
            !phoneNumberErrors.length &&
            !yearOfBirthErrors.length &&
            !testsResultErrors.length &&
            !worksErrors.length ){
            return true
        }
    };


    function onGraduateFormEdit (e) {

        e.preventDefault();
        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            course: course.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            yearOfBirth: Number(yearOfBirth.value),
            feedback: feedback.value,
            testResults: Number(testsResult.value),
            isWorking: isWorking.value==="true",
            works: works.value
        }

        const dataForCompanies ={
            firstName: firstName.value,
            lastName: lastName.value,
            course: course.value,
            yearOfBirth: Number(yearOfBirth.value),
            feedback: feedback.value,
            testResults: Number(testsResult.value),
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
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input name="firstName"  className={classes.input}type="text" {...firstName}/>
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
                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                        <Input name="phone" type="text"  className={classes.input}  {...phoneNumber}/>
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
                        <InputLabel htmlFor="yearOfBirth">Date Of Birth</InputLabel>
                        <Input name="lastName" type="text"  className={classes.input} {...yearOfBirth}/>
                        <Hidden xlDown>
                            <Input  error={!!yearOfBirthValidationErrors.length} {...yearOfBirth}  autoFocus />
                        </Hidden>
                        {!!yearOfBirthValidationErrors.length && (
                            yearOfBirthValidationErrors.map(error => (
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
                        <Input name="testResults" type="text" className={classes.input} {...testsResult} />
                        <Hidden xlDown>
                            <Input  error={!!testsResultValidationErrors.length}  autoFocus />
                        </Hidden>
                        {!!testsResultValidationErrors.length && (
                            testsResultValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Is Graduate Working?</InputLabel>
                        <Select {...isWorking} className={classes.input}>
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Works</InputLabel>
                        <Input name="lastName" type="text" className={classes.input} {...works}/>
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