import React from 'react'
import { SnackbarProvider, withSnackbar } from 'notistack';
import CredentialsRoot from './CredentialsRoot';


const CredentialsWithSnackbar = withSnackbar(CredentialsRoot);

function Credentials(props) {
    return (
        <SnackbarProvider maxSnack={3}>
            <CredentialsWithSnackbar email={props.email} password={props.password} showCreateUserDialog={props.showCreateUserDialog}/>
        </SnackbarProvider>
    );
}

export default Credentials;