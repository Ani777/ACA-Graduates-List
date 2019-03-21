import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1,

    },
    grow: {
        flexGrow: 1,
        textAlign: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: '#3949ab'
        }
    },
    button: {
        width: 250,
        textTransform: 'none'
    },
    tools: {
        minWidth: 750
    }
    
};

function ButtonAppBar(props) {
    const { classes, logout, user } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.tools}>

                    <Typography
                        variant="h5"
                        align='right'
                        color="inherit"
                        className={classes.grow}
                        component={Link}
                        to={"/graduates"}>
                        Graduates
                    </Typography>

                    <Typography
                    
                        variant="h5"
                        align='center'
                        color="inherit"
                        className={classes.grow}
                        component={Link }
                        to="/courses"  >

                        Courses

                    </Typography>

                    <Typography
                        variant="h5"
                        align='left'
                        color="inherit"
                        className={classes.grow}
                        component={Link} to={"/companies"}>
                        Companies
                    </Typography>

                    <Button
                        color="inherit"
                        className={classes.button} >
                        { user.email }
                    </Button>

                    <Button
                        color="inherit"
                        onClick={logout}
                        component={Link}
                        to={"/"}>
                        LogOut
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);