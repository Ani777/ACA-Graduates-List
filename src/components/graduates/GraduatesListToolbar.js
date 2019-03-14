import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';

// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import FireManager from '../../firebase/FireManager';



const toolbarStyles = theme => ({
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

      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: theme.spacing.unit / 4,
      },
      noLabel: {
        marginTop: theme.spacing.unit * 3,
      },
});


class GraduatesListToolbar extends Component {
    // state = {
    //     visibleFor: [],
    //     companies: []         // [{ name, id } ...]
    // };

    // componentDidMount() {
    //     FireManager.getCompanies().then(querySnapshot => {
    //         this.setState({
    //             companies: querySnapshot.docs.map(doc => ({ name: doc.data().name, id: doc.id}))
    //          })
    //     }).catch(function(error) {
    //         console.error("Error getting companies:", error);
    //     })
    // }

    // handleChange = event => {
    //     this.setState({ visibleFor: event.target.value });
    //   };
    
    //   handleChangeMultiple = event => {
    //     const { options } = event.target;
    //     const value = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //       if (options[i].selected) {
    //         value.push(options[i].value);
    //       }
    //     }
    //     this.setState({
    //       visibleFor: value,
    //     });
    //   };

    // handleChange = event => {
    //     this.setState({ visibleFor: event.target.value });
    //   };
    
      // handleChangeMultiple = event => {
      //   const { options } = event.target;
      //   const value = [];
      //   for (let i = 0, l = options.length; i < l; i += 1) {
      //     if (options[i].selected) {
      //       value.push(options[i].value);
      //     }
      //   }
      //   this.setState({
      //     visibleFor: value,
      //   });
      // };

      // addCompany = () => {
      //     debugger
      //     const { visibleFor } = this.state;
      //     const { selectedGraduatesIds } = this.props;
      //     selectedGraduatesIds.forEach(graduateId => FireManager.editGraduate(graduateId, { visibleFor }));
      // }

    render() {


        const { selectedGraduatesIds, classes } = this.props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: selectedGraduatesIds.length > 0,
                })}
            >
                <div className={classes.title}>
                    {selectedGraduatesIds.length > 0 ? (
                        <Typography color="inherit" variant="subtitle1">
                            {selectedGraduatesIds.length} selected
                        </Typography>
                    ) : (
                        <Typography variant="h6" id="tableTitle">
                            Graduates
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer} />

                <div className={classes.actions}>
                    {selectedGraduatesIds.length > 0 ? (
                        <div>
                            
                {/* <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Visible for</InputLabel>
            <Select
                multiple
                value={this.state.name}
                onChange={this.handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {this.state.visibleFor.map(id => (
                <MenuItem key={id} value={id}>
                    <Checkbox checked={this.state.visibleFor.indexOf(id) > -1} />
                    <ListItemText primary={id} />
                </MenuItem>
                ))}
            </Select>
            </FormControl> */}

        {/*<FormControl className={classes.formControl}>*/}
          {/*<InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>*/}
          {/*<Select*/}
            {/*multiple*/}
            {/*value={this.state.visibleFor}*/}
            {/*onChange={this.handleChange}*/}
            {/*input={<Input id="select-multiple-checkbox" />}*/}
            {/*renderValue={selectedIds => {   // [id1, id2...]*/}
                {/*const selectedCompanies = this.state.companies.filter(company => selectedIds.includes(company.id));*/}
                {/*return selectedCompanies.map(selComp => selComp.name).join(', ')}*/}
            {/*}*/}
            {/*//MenuProps={MenuProps}*/}
          {/*>*/}
            {/*{this.state.companies.map(company => (*/}
              {/*<MenuItem key={company.id} value={company.id}>*/}
                {/*<Checkbox checked={this.state.visibleFor.indexOf(company.id) > -1} />*/}
                {/*<ListItemText primary={company.name} />*/}
              {/*</MenuItem>*/}
            {/*))}*/}
          {/*</Select>*/}
                            <Tooltip title="Delete">
                                <IconButton aria-label="Delete" onClick={this.props.removeGraduate}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (
                        <Tooltip title="Add graduate">
                            <Link to="/graduates/addgraduate"><IconButton aria-label="Add graduate">
                                <AddIcon />
                            </IconButton></Link>
                        </Tooltip>
                    )}
                </div>
            </Toolbar>
        );
    }
};
export default withStyles(toolbarStyles)(GraduatesListToolbar);