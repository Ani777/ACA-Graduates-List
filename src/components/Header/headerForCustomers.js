import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1,

    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
        textDecoration: 'none'
    },
    button:{
        width: 250
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'

    }
};

function HeaderForCustomers(props) {
    const { classes } = props;
    const logout= props.logout;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.buttons}>

                    {/*<Typography variant="h5" align='right' color="inherit" className={classes.grow} component={Link} to={"/graduates"}>*/}
                        {/*Graduates*/}
                    {/*</Typography>*/}

                    {/*<Typography variant="h5" align='center' color="inherit" className={classes.grow} component={Link } to="/courses"  >*/}

                        {/*Courses*/}

                    {/*</Typography>*/}

                    {/*<Typography variant="h5" align='left' color="inherit" className={classes.grow} component={Link} to={"/companies"}>*/}
                        {/*Companies*/}
                    {/*</Typography>*/}

                        <Button color="inherit" className={classes.button} >{ props.user.email }</Button>
                        <Button color="inherit" onClick={logout} component={Link} to={"/"}>LogOut</Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}

HeaderForCustomers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderForCustomers);