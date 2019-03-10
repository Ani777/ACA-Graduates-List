import React, { useState } from 'react';
import FireManager from '../../firebase/FireManager';
import '../../App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//import {TextField} from '@material-ui/core/TextField';

const styles = theme => ({
    button: {
        marginTop: '3%',
        marginLeft: '2%',
    },
    input: {
        display: 'none',
    },
    container: {
        marginLeft: '37%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


function AddCoursePage(props) {
    const [name, setName] = useState('');

    function handleChange(e) {
        setName(e.target.value)
    }
    function onCourseFormSubmit (e) {
        e.preventDefault();

        if (name) {

            //const id = v4();
            const data = {
                name,
            }
            FireManager.createCourseInFirebase(data).then(() => {
                props.addCourseToList(data);
                setName('');
            }).catch(err => {
                console.error(err.message)
            });
        }
    }

    const { classes } = props;
    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={onCourseFormSubmit}>
            <TextField
                value={name}
                onChange={handleChange}
                required
                autoFocus
                label="Course Name"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <Button  type='submit' variant="contained" color="primary" className={classes.button}>
                Add
            </Button>
        </form>
    );
}

export default withStyles(styles)(AddCoursePage);