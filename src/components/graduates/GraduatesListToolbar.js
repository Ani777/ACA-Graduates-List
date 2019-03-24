import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import AlertDialog from '../alertDialogs/AlertDialog';
import Search from './Search';


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',

    },

    titleSearch: {
        display: 'flex'
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});


class GraduatesListToolbar extends Component {
    state = {
        open: false,
    };
    handleClickOpenDialog = () => {
        this.setState({ open: true });
    };

    handleCloseDialog = () => {
        this.setState({ open: false });
    };

    handleRemoveGraduate = () => {
        this.props.removeGraduate();
        this.handleCloseDialog()
    }

    render() {
        const { selectedGraduatesIds, classes } = this.props;
        return (
            <>
                <AlertDialog
                    open={this.state.open}
                    close={this.handleCloseDialog}
                    onYesBtnClick={this.handleRemoveGraduate}
                    subject={selectedGraduatesIds.length > 1 ? 'these graduates' : 'this graduate'}
                />
                <Toolbar
                    className={classNames(classes.root, {
                        [classes.highlight]: selectedGraduatesIds.length > 0,
                    })}
                >
                    <div className={classes.title}>
                        {selectedGraduatesIds.length > 0 ? (
                            <Typography color="inherit" variant="subtitle1">
                                {selectedGraduatesIds.length} selected
                            </Typography>
                        ) : (
                            <div className={classes.titleSearch}>
                                <Typography variant="h6" id="tableTitle">
                                    Graduates
                                </Typography>
                                <Search filterGraduates={this.props.filterGraduates}/>
                            </div>
                        )}
                    </div>
                    <div className={classes.spacer} />

                    <div className={classes.actions}>
                        {selectedGraduatesIds.length > 0 ? (
                            <div>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="Delete" onClick={this.handleClickOpenDialog}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (
                            <Tooltip title="Add graduate">
                                <Link to="/graduates/addgraduate"><IconButton aria-label="Add graduate">
                                    <AddIcon />
                                </IconButton></Link>
                            </Tooltip>
                        )}
                    </div>
                </Toolbar>
            </>
        );
    }
};
export default withStyles(toolbarStyles)(GraduatesListToolbar);