import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const styles = {
    root: {
        flexGrow: 1,

    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: '#3949ab'
        }
    },
    button: {
        width: 250,
        textTransform: 'none',

    },

    nav: {
        width: 1000,

    },

    // buttons: {
    //     marginLeft: 'auto',
    //     width: 400,
    // },
    tools: {
        minWidth: 1000
    },
    toolItem: {
        width: 150,
        marginLeft: 40,
        paddingTop: 10,
        paddingBottom: 10,
        display: 'inline-block'
    }
};

function ButtonAppBar(props) {
    const { classes, logout, user } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.tools}>
                    <div className={classes.nav}>
                   <div className={classes.toolItem}>
                    <Typography
                        variant="h5"
                        align='center'
                        color="inherit"
                        className={classes.grow}
                        component={Link}
                        to={"/graduates"}>
                        Graduates
                    </Typography>
                   </div>
                   <div className={classes.toolItem}>
                    <Typography
                        variant="h5"
                        align='center'
                        color="inherit"
                        className={classes.grow}
                        component={Link }
                        to="/courses"  >

                        Courses

                    </Typography>
                   </div>
                    <div className={classes.toolItem}>
                    <Typography
                        variant="h5"
                        align='center'
                        color="inherit"
                        className={classes.grow}
                        component={Link} to={"/companies"}>
                        Companies
                    </Typography>
                    </div>
                    </div>
              {/*<div className={classes.buttons}>*/}
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
              {/*</div>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);