import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//import FireManager from '../../firebase/FireManager';
import { lighten } from '@material-ui/core/styles/colorManipulator';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const toolbarStyles = theme => ({   // --------------------------
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

});


class AvailableGraduate extends Component {
    state = {
        visibleFor: [],
        companies: [],      // [{ data, id } ...]
        visibleForSelectOpen: false,
        availableGraduates: [],
        // isSelectHidden: true,
    };



    render() {
        const { graduate } = this.props;

        return (

            <TableRow
                hover
                tabIndex={-1}
                key={graduate.id}
            >
                <TableCell component="th" scope="row">
                    {graduate.firstName}
                </TableCell>
                <TableCell component="th" scope="row" padding="none">{graduate.lastName}</TableCell>
                <TableCell align="right">{graduate.testResults}</TableCell>
                <TableCell align="right"> {graduate.course}
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="More" onClick={this.props.onClick}>
                        <IconButton aria-label="More">
                            <ChevronRight/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(toolbarStyles)(AvailableGraduate);