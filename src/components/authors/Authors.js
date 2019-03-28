import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    authorsButton: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        textTransform: 'none',
    },
    author: {
        color: '#616161'
    },
    name: {
        color: '#232323',
    },
    date: {
        marginTop: 15
    }

});


class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const {classes} = this.props;
    return (
      <div>
        <div style={{position: 'relative'}}>
            <Button onClick={this.handleClickOpen} className={classes.authorsButton}>
            click me
            </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Just wanted to mention the authors of this amazing application, who are maybe looking for a job :)"}</DialogTitle>
          <DialogContent>
              <Typography variant='subtitle1' className={classes.author}><span className={classes.name}>Ani Grigoryan:</span>  https://github.com/Ani777</Typography>
              <Typography variant='subtitle1' className={classes.author}><span className={classes.name}>Astghik Khachatryan:</span>  https://github.com/astghiik</Typography>
              <Typography variant='subtitle1' className={classes.author}><span className={classes.name}>Mariam Mamikonyan:</span>  https://github.com/mariammamikonyan</Typography>
              <Typography variant='subtitle1' className={classes.author}><span className={classes.name}>Shushan Injighulyan:</span>  https://github.com/shushan-injighulyan</Typography>
              <Typography className={classes.date}>[March, 2019]</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
                oki doki
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AlertDialog);