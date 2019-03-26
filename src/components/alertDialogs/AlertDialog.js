import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function AlertDialogSlide (props) {
    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.close}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{ marginBottom: "25px" }}>
                    {`Are you sure you want to delete ${props.subject}?`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={props.close} color="secondary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={props.onYesBtnClick} color="primary" variant="contained">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialogSlide;