import React, { useState } from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import generatePassword from 'password-generator';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {APP_DEFAULT_COMPANY_ROLE} from "../../constants/appConstants";
import {isValidEmail, isValidPassword} from "../graduates/Validator";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    main: {
        position:'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        width: 'auto',
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    passwordRow: {
        display: "flex",
        justifyContent: "space-between"
    },
    auto: {
        margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit}px ${theme.spacing.unit}px`,
    },
    buttons: {
        display: "flex",
        justifyContent:
            "space-between",
        marginTop: theme.spacing.unit * 6,
    },
    formWrapper: {
        padding: 30
    }
});


function AddCompanyPage(props) {
    let name = useFormInput('');
    let phone = useFormInput('');
    let email = useFormInput('');
    let [password, setPassword] = useState('');
    const [emailValidationError, setEmailValidationError] = useState('');
    const [passwordValidationError, setPasswordValidationError] = useState('');


    function handlePasswordChange (e){
        setPassword(e.target.value)
    }

    function getPassword () {
        setPassword(generatePassword(6, false))
    }


    function isValidAddCompanyForm() {

        const emailErrors = isValidEmail(email.value);
        setEmailValidationError(emailErrors);

        const passwordErrors = isValidPassword(password);
        setPasswordValidationError(passwordErrors);

        if(!emailErrors.length &&
            !passwordErrors.length
        ){
            return true
        }
    }

    function onCompanyFormSubmit (e) {
        e.preventDefault();
        const data = {
            name: name.value,
            phone: phone.value ? phone.value : '━',
            email: email.value,
            password: password,
            role: APP_DEFAULT_COMPANY_ROLE
        };
        if(!isValidAddCompanyForm()){
            return;
        }



        FireManager.createCompanyInFirebase({...data}, data.email).then(() => {
            props.addCompanyToList(data);
        })
            .catch(function(error) {
                console.error("Error creating company:", error);
            })


    }


    const { classes } = props;

    return (
        <div className={classes.formWrapper}>
            <form className={classes.form} onSubmit={onCompanyFormSubmit}>
                <TextField
                    {...name}
                    required
                    fullWidth
                    autoFocus
                    label="Name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    {...phone}
                    fullWidth
                    label="Phone"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    {...email}
                    required
                    fullWidth
                    label="Email"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                {!!emailValidationError.length && (
                    emailValidationError.map(error => (
                        <Typography color="error" key={error}>{error}</Typography>
                    ))
                )}
                <div className={classes.passwordRow}>
                    <TextField
                        value={password}
                        onChange={handlePasswordChange}
                        id="password"
                        required
                        fullWidth
                        label="Password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <Button
                        type="button"
                        onClick={getPassword}
                        variant="outlined"
                        color="primary"
                        className={classes.auto}
                    >
                        auto
                    </Button>
                </div>
                {!!passwordValidationError.length && (
                    passwordValidationError.map(error => (
                        <Typography color="error" key={error}>{error}</Typography>
                    ))
                )}
                <div className={classes.buttons} >
                    <Button variant="contained" color="secondary" className={classes.button} onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' variant="contained" color="primary"  >
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default withStyles(styles)(AddCompanyPage);