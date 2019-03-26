import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

class AvailableGraduate extends Component {
    state = {
        visibleFor: [],
        companies: [],      // [{ data, id } ...]
        visibleForSelectOpen: false,
        availableGraduates: [],
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
                            <AccountCircle/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    }
}

export default AvailableGraduate;