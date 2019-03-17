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

    render() {
        const { selectedGraduatesIds, classes, removeGraduate } = this.props;
        return (
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
                        <Typography variant="h6" id="tableTitle">
                            Graduates
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer} />

                <div className={classes.actions}>
                    {selectedGraduatesIds.length > 0 ? (
                        <div>
                            <Tooltip title="Delete">
                                <IconButton aria-label="Delete" onClick={removeGraduate}>
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
        );
    }
};
export default withStyles(toolbarStyles)(GraduatesListToolbar);