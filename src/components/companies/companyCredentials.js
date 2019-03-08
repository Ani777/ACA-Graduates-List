import React from 'react';



export default function Credentials(props){
    return (
        <ul style={{listStyle: "none"}}>
            <li>E-mail: <h2>{props.email}</h2></li>
            <li>Password: <h2>{props.password}</h2></li>
        </ul>
    )
}