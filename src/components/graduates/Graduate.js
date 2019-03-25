import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FireManager from '../../firebase/FireManager';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/icons/List';
import OutlinedInput from '@material-ui/core/OutlinedInput';




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
        //margin: theme.spacing.unit,
        minWidth: 170,
        // maxWidth: 100,
        height: theme.spacing.unit * 4.5
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
    visibleForSelect: {
        fontSize: theme.spacing.unit * 1.5
    }
});


class Graduate extends Component {
    state = {
        visibleFor: [],
        companies: [],      // [{ data, id } ...]
        visibleForSelectOpen: false,
        availableGraduates: [],
        // isSelectHidden: true,
    };

    componentDidMount() {
        FireManager.getCompanies().then(querySnapshot => {
            this.setState({
                companies: querySnapshot.docs.map(doc => ({data: doc.data(), id: doc.id})),
                visibleFor: this.props.data.graduate.visibleFor
            });
        });
    }

    handleChange = event => {
        this.setState({visibleFor: event.target.value});
    };


    confirmVisibility = () => {
        const {companies, visibleFor} = this.state;
        const {graduate} = this.props.data;
        FireManager.updateGraduate(graduate.id, {visibleFor});

        const allCompaniesIds = companies.map(company => company.id);

        const availableGraduate = {
            firstName: graduate.firstName,
            lastName: graduate.lastName,
            dateOfBirth: graduate.dateOfBirth,
            course: graduate.course,
            testResults: graduate.testResults,
            works: graduate.works,
            feedback: graduate.feedback
        };

        allCompaniesIds.forEach(id => {
            if (visibleFor.includes(id)) {
                FireManager.addAvailableGraduate(id, graduate.id, availableGraduate);
            } else {
                FireManager.removeAvailableGraduate(id, graduate.id);
            }
        })
    }

    handleClose = () => {
        this.setState({visibleForSelectOpen: false});
        this.confirmVisibility()
    };

    handleOpen = () => {
        this.setState({visibleForSelectOpen: true});
    };

    render() {
        const { classes, data } = this.props;
        const { visibleFor } = this.state;

        return (

            <TableRow
                hover
                role="checkbox"
                aria-checked={data.isSelected}
                tabIndex={-1}
                key={data.graduate.id}
                selected={data.isSelected}
            >
                <TableCell padding="checkbox" onClick={event => this.props.onClick(event, data.graduate.id)}>
                    <Checkbox checked={data.isSelected}/>
                </TableCell>
                <TableCell component="th" scope="row" padding="none">{data.graduate.firstName}</TableCell>
                <TableCell component="th" scope="row" padding="none">{data.graduate.lastName}</TableCell>
                <TableCell align="right">{data.graduate.testResults}</TableCell>
                <TableCell align="right">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            displayEmpty
                            multiple
                            className={classes.visibleForSelect}
                            value={this.state.visibleFor}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput
                                    name="companies"
                                    labelWidth={0}
                                    id="outlined-age-native-simple"
                                />
                            }
                            renderValue={() => {
                                return (visibleFor.length ?
                                    visibleFor.length === 1 ? `1 company selected` :
                                        `${visibleFor.length} companies selected` : `no company selected`)
                            }}

                            open={this.state.visibleForSelectOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            //MenuProps={MenuProps}
                        >
                            {this.state.companies.map(company => (
                                <MenuItem key={company.id} value={company.id}>
                                    <Checkbox checked={this.state.visibleFor.indexOf(company.id) > -1}/>
                                    <ListItemText primary={company.data.name}/>
                                </MenuItem>)
                            )
                            }
                        </Select>
                    </FormControl>



                    {/* {this.state.visibleFor.length} */}
                </TableCell>
                <TableCell align="right">
                    <Link to={`/graduates/${this.props.data.graduate.id}`}><Tooltip title="More">
                        <IconButton aria-label="More">
                            <ChevronRight/>
                        </IconButton>
                    </Tooltip>
                    </Link>
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(toolbarStyles)(Graduate);