import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'


export default function Graduate(props) {
    return (

        <TableRow
            hover
            onClick={event => props.onClick(event, props.obj.graduate.id)}
            role="checkbox"
            aria-checked={props.obj.isSelected}
            tabIndex={-1}
            key={props.obj.graduate.id}
            selected={props.obj.isSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox checked={props.obj.isSelected} />
            </TableCell>
            <TableCell component="th" scope="row" padding="none">
                {props.obj.graduate.firstName}
            </TableCell>
            <TableCell component="th" scope="row" padding="none">{props.obj.graduate.lastName}</TableCell>
            <TableCell align="right">{props.obj.graduate.testResults}</TableCell>
            <TableCell align="right">{props.obj.graduate.visibleFor ? props.obj.graduate.visibleFor.length : '0'}</TableCell>
            <TableCell align="right">
                <Link to={`/graduates/${props.obj.graduate.id}`}><Tooltip title="More">
                    <IconButton aria-label="More">
                        <ChevronRight/>
                    </IconButton>
                </Tooltip>
                </Link>
            </TableCell>
        </TableRow>

        // <tr>
        //      <td>{props.data.firstName}</td>
        //      <td>{props.data.lastName}</td>
        //      <td>{props.data.course}</td>
        // </tr>
    );
}