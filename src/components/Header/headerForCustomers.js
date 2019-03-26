import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1,

    },
    button:{
        width: 250,
        textTransform: 'none'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

function HeaderForCustomers(props) {
    const { classes, logout, user } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.buttons}>
                    <Button color="inherit" className={classes.button} >{ user.email }</Button>
                    <Button color="inherit" onClick={logout} component={Link} to={"/"}>LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(HeaderForCustomers);