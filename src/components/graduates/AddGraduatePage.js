import React, { useState } from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import {isValidEmail, isValidName, isValidPhoneNumber, isValidTestResults, isValidRequired, isValidUrl} from "./Validator";
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
import { Redirect} from "react-router-dom";
import { Link } from 'react-router-dom'
import shadows from '@material-ui/core/styles/shadows';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


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
    work: {
        display: 'flex',
    },
    addIcon: {
        padding: 0,
        width: theme.spacing.unit * 6,
        height: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 1.2
    }
});

function AddGraduate(props) {
    let [addedNewStudent, setAddedNewStudent] = useState(false);
    let [showSecondWork, setShowSecondWork] = useState(false);
    let [showThirdWork, setShowThirdWork] = useState(false);
    const { classes, courses } = props;
    const tabs = courses.map((course, index) => <MenuItem key={course+index} value={course}> {course} </MenuItem>);
    let date=new Date();
    let year = date.getFullYear();
    let years=[];
    for (let i=year-50; i<year-9; i++){
        years.push(i)
    };
    const yearsSelect = years.map(year => <MenuItem key={year} value={year}> {year} </MenuItem>);

    const course = useFormInput('');
    const dateOfBirth = useFormInput('');
    const email = useFormInput('');
    const feedback = useFormInput('');
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const phoneNumber = useFormInput('374');
    const testResults = useFormInput('');
    const work1 = useFormInput('');
    const work2 = useFormInput('');
    const work3 = useFormInput('');
    const isWorking = useFormInput('');
    const [id, setId] = useState('');


    const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([]);
    const [lastNameValidationErrors, setLastNameValidationErrors] = useState([]);
    const [phoneNumberValidationErrors, setPhoneNumberValidationErrors] = useState([]);
    const [emailValidationErrors, setEmailValidationErrors] = useState([]);
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

        // const dateOfBirthErrors = isValidDateOfBirth(dateOfBirth.value);
        // setDateOfBirthValidationErrors(dateOfBirthErrors);

        const testResultsErrors = isValidTestResults(testResults.value);
        setTestResultsValidationErrors(testResultsErrors);

        const phoneNumberErrors = isValidPhoneNumber(phoneNumber.value);
        setPhoneNumberValidationErrors(phoneNumberErrors);

        // const feedbackErrors = isValidRequired(feedback.value);
        // setFeedbackValidationErrors(feedbackErrors);

        const courseErrors = isValidRequired(course.value);
        setCourseValidationErrors(courseErrors);

        const work1Errors = isValidUrl(work1.value);
        const work2Errors = isValidUrl(work2.value);
        const work3Errors = isValidUrl(work3.value);
        setWorksValidationErrors(work1Errors);
        setWorksValidationErrors(work2Errors);
        setWorksValidationErrors(work3Errors);

        if(!firstNameErrors.length &&
            !lastNameErrors.length &&
            !phoneNumberErrors.length &&
            !emailErrors.length &&
            // !feedbackErrors.length &&
            // !dateOfBirthErrors.length &&
            !courseErrors.length &&
            !testResultsErrors.length &&
            !work1Errors.length &&
            !work2Errors.length &&
            !work3Errors.length){
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
            works: [work1.value, work2.value, work3.value],
            isWorking: isWorking.value==="true",
            visibleFor: []
        }

        if(!isValidSignUpForm()){
            return;
        }

        FireManager.createGraduateInFirebase(data)
            .then(doc=>{
                setId(doc.id);
                setAddedNewStudent(true);
                return doc.id

            }).then((graduateId)=>{
               FireManager.addGraduateToCourse(data.course, graduateId)
        })
            .catch(err=>{
                console.error(err.message)
            })
    }

    function openSecondWork () {
        setShowSecondWork(true);
    }
    
    function openThirdWork () {
        setShowThirdWork(true);
    }

    return !addedNewStudent?(
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <Typography variant='h4' align='center' color='inherit'>New Graduate</Typography>
                    <FormControl margin="normal" required fullWidth >
                        <InputLabel htmlFor="firstName" className={classes.inputLabel}>First Name</InputLabel>
                        <Input name="firstName"  className={classes.input} type="text" {...firstName} />
                        <Hidden xlDown>
                            <Input  error={!!firstNameValidationErrors.length} {...firstName} autoFocus />
                        </Hidden>
                        {!!firstNameValidationErrors.length && (
                            firstNameValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
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
                    <FormControl margin="normal" required fullWidth>
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
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input name="email" type="email"  className={classes.input}  {...email}/>
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
                        <InputLabel htmlFor="phone" >Phone Number</InputLabel>
                        <Input name="phone" type="number" id="phoneNumber"  className={classes.input} {...phoneNumber}/>
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
                        <InputLabel htmlFor="dateOfBirth" >Date Of Birth</InputLabel>
                        <Select {...dateOfBirth} >
                            {yearsSelect}
                        </Select>
                        {/*<Input name="lastName" type="date" className={classes.input}  {...dateOfBirth} />*/}
                        {/*<Hidden xlDown>*/}
                            {/*<Input  error={!!dateOfBirthValidationErrors.length} {...dateOfBirth}  autoFocus  />*/}
                        {/*</Hidden>*/}
                        {/*{!!dateOfBirthValidationErrors.length && (*/}
                            {/*dateOfBirthValidationErrors.map(error => (*/}
                                {/*<Typography color="error" key={error}>{error}</Typography>*/}
                            {/*))*/}
                        {/*)}*/}
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="feedback">Feedback</InputLabel>
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
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastName">Test's Results</InputLabel>
                        <Input name="testResults" type="number"  className={classes.input}  {...testResults} />
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
                    <div className={classes.work}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Link 1</InputLabel>
                        <Input name="lastName" type="text" id="lastName" className={classes.input}  {...work1}/>
                        {!!worksValidationErrors.length && (
                            worksValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>
                    {!showSecondWork &&
                    <Tooltip title="Add Link">
                            <IconButton aria-label="Add Link" className={classes.addIcon} onClick={openSecondWork}>
                                <AddIcon />
                            </IconButton>
                    </Tooltip>}
                    </div>
                    {showSecondWork &&
                    <div className={classes.work}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Link 2</InputLabel>
                        <Input name="lastName" type="text" id="lastName" className={classes.input}  {...work2}/>
                        {!!worksValidationErrors.length && (
                            worksValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>
                    {!showThirdWork &&
                    <Tooltip title="Add Link">
                            <IconButton aria-label="Add Link" className={classes.addIcon} onClick={openThirdWork}>
                                <AddIcon />
                            </IconButton>
                    </Tooltip>}
                    </div>
                    
                    }{showThirdWork &&
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Link 3</InputLabel>
                        <Input name="lastName" type="text" id="lastName" className={classes.input}  {...work3}/>
                        {!!worksValidationErrors.length && (
                            worksValidationErrors.map(error => (
                                <Typography color="error" key={error}>{error}</Typography>
                            ))
                        )}
                    </FormControl>
                    }
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

export default withStyles(styles)(AddGraduate);