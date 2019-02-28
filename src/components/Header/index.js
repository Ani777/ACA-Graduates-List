import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { NavLink, Link } from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
        textDecoration: 'none'
    },


};

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h5" align='right' color="inherit" className={classes.grow}>
                        Graduates
                    </Typography>

                    <Typography variant="h5" align='center' color="inherit" className={classes.grow} component={Link } to="/courses"  >

                        Courses

                    </Typography>

                    <Typography variant="h5" align='left' color="inherit" className={classes.grow}>
                        Companies
                    </Typography>
                    <Button color="inherit" >Login</Button>
                    <Button color="inherit" >Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);