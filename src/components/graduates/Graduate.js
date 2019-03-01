import React from 'react';

export default function Graduate(props) {
    return (
        <tr>
            <td>{props.data.firstName}</td>
            <td>{props.data.lastName}</td>
            <td>{props.data.course}</td>
        </tr>
    );
}