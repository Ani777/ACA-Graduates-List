import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GraduatesListHead from './GraduatesListHead';
import GraduatesListToolbar from './GraduatesListToolbar';
import Graduate from './Graduate';
import FireManager from '../../firebase/FireManager';


// let counter = 0;
// function createData(firstName, lastName, testResults, dbId) {  // dbId - database id
//   counter += 1;
//   return { id: counter, firstName, lastName, testResults, dbId };
// }

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
    root: {
        width: '98%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: '1%'    // ????????????????????????????
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class GraduatesList extends Component {
    state = {
        order: 'asc',
        orderBy: 'testResults',
        selected: [],
        page: 0,
        rowsPerPage: 10,
    };

    // componentDidMount() {
    //     FireManager.getGraduates().then(querySnapshot => {
    //         this.setState({data: querySnapshot.docs.map(doc => {
    //                 const docData = doc.data();
    //                 return {
    //                     firstName: docData.firstName,
    //                     lastName: docData.lastName,
    //                     testResults: docData.testResults,
    //                     id: doc.id
    //                 };
    //             })
    //         });
    //     }).catch(error => {
    //         console.error("Error getting graduates:", error);
    //     });
    // }

    handleDeleteButtonClick = () => {
        const { selected } = this.state;
        selected.forEach(id => {
            FireManager.removeGraduate(id);
        });
        this.setState({selected: []});
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState({ selected: this.props.graduates.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const {graduates}= this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, graduates.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <GraduatesListToolbar numSelected={selected.length} removeGraduate={this.handleDeleteButtonClick}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <GraduatesListHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={graduates.length}
                        />
                        <TableBody>
                            {stableSort(graduates, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(graduate => {
                                    const isSelected = this.isSelected(graduate.id);
                                    return ( <Graduate obj={{isSelected, graduate}} onClick={this.handleClick} key={graduate.id}/>
                                        // <TableRow
                                        //   hover
                                        //   onClick={event => this.handleClick(event, n.id)}
                                        //   role="checkbox"
                                        //   aria-checked={isSelected}
                                        //   tabIndex={-1}
                                        //   key={n.id}
                                        //   selected={isSelected}
                                        // >
                                        //   <TableCell padding="checkbox">
                                        //     <Checkbox checked={isSelected} />
                                        //   </TableCell>
                                        //   <TableCell component="th" scope="row" padding="none">
                                        //     {n.firstName}
                                        //   </TableCell>
                                        //   <TableCell align="right">{n.lastName}</TableCell>
                                        //   <TableCell align="right">{n.testResults}</TableCell>
                                        //   <TableCell align="right">{n.visibleFor}</TableCell>
                                        //   {/* <TableCell align="right">{n.protein}</TableCell> */}
                                        // </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={graduates.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(GraduatesList);