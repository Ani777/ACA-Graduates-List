import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px auto`,
    },
});



function CredentialsRoot(props){
    function copyToClipboard (event) {
        let h2El = event.currentTarget.previousSibling;
        let range = document.createRange();
        range.selectNode(h2El)
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('Copy');
        sel.removeAllRanges();
        props.enqueueSnackbar('Copied to Clipboard.');
    }


    const { classes } = props;
    return (
        props.showCreateUserDialog ?
            (<ul style={{listStyle: "none", padding: "24px"}}>
                <li>E-mail:
                    <div style={{display: "flex"}}>
                        <h2>{props.email}</h2>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={copyToClipboard}>
                            Copy
                        </Button>
                    </div>
                </li>
                <li>Password:
                    <div style={{display: "flex"}}>
                        <h2>{props.password}</h2>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={copyToClipboard}>
                            Copy
                        </Button>
                    </div>
                </li>
            </ul>)
            : (
                <div style={{display: "flex"}}>
                    <h2>{props.email}</h2>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={copyToClipboard}>
                        Copy
                    </Button>
                </div>

            )

    )
}

export default withStyles(styles)(CredentialsRoot)