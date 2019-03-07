import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import generatePassword from 'password-generator';
import { isValidEmail } from '../validators/EmailValidator';
import { isValidName } from '../validators/NameValidator';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {APP_DEFAULT_COMPANY_ROLE} from "../../constants/appConstants";


const styles = theme => ({
    main: {
        position:'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        width: 'auto',
        // marginLeft: theme.spacing.unit * 3,
        // marginRight: theme.spacing.unit * 3,
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
        marginTop: theme.spacing.unit * 6
    },
    formWrapper: {
        padding: 30
    }
});


 function AddCompanyPage(props) {
    let name = useFormInput('');
    let phone = useFormInput('');
    let email = useFormInput('');

    function getPassword () {
        document.getElementById("password").value = generatePassword(6, false);
    }

    function onCompanyFormSubmit (e) {
        if (!isValidName(name.value)) return;
        if (!isValidEmail(email.value)) return;
        e.preventDefault();
        const data = {
            name: name.value,
            phone: phone.value ? phone.value : '━',
            email: email.value,
            password: document.getElementById('password').value,
            role: APP_DEFAULT_COMPANY_ROLE
        };

        FireManager.createUserWithEmailAndPassword(data.email, data.password).then(user => {
            FireManager.createCompanyInFirebase(data, user.user.uid).then(() => {
                props.addCompanyToList(data);
            });
        }).catch(function(error) {
            console.error("Error creating user:", error);
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
                    <div className={classes.passwordRow}>
                        <TextField
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
                    <div className={classes.buttons}>
                        <Button type='submit' variant="contained" color="primary">
                            Add
                        </Button>
                    </div>
                </form>
        </div>
    );
}

export default withStyles(styles)(AddCompanyPage);