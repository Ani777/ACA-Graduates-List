import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends Component {
  // state = {
  //   open: false,
  // };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.close}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Are you sure you want to delete this ${this.props.subject}?`}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this {this.props.subject}?
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button onClick={this.props.onYesBtnClick} color="primary" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;