import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FireManager from "../../firebase/FireManager";
import GraduatesList from "../graduates/GraduatesList";
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class NavBar extends React.Component {

    state = {
        value: 0,
        graduates: [],
        selected: [],
    }

    handleDeleteButtonClick = (e) => {
        const {selected} = this.state;

        Promise.all(selected.map(id => {
            return firebase
                .firestore()
                .collection('graduates')
                .doc(id)
                .get()
        }))
            .then(docs => {
                return docs.map(doc => {
                    return [doc.data().visibleFor, doc.id, doc.data().course]
            })
        })
            .then(arrs => {
                return Promise.all(arrs.map(arr => {
                    return Promise.all[FireManager.RemoveGraduateForCompanies(arr[0], arr[1]), FireManager.removeGraduateFromCourse(arr[2], arr[1] ) ]
            }))
        })
            .then(()=> {
                return Promise.all(selected.map(id => {
                    return FireManager.removeGraduate(id)
        }))})
            .then(()=> {
                return FireManager.getGraduates()})
            .then(querySnapshot => {
                this.setState({graduates: querySnapshot.docs.map(doc => {
                        const docData = doc.data();
                        return {
                            ...docData,
                            id: doc.id
                        };
                    }),
                    selected:[]
                })})
        .catch(err => {
            console.error((err.message))
        })
    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState({ selected: this.state.graduates.map(n => n.id) });
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




    componentDidMount(){
            FireManager.getGraduates()
                .then(querySnapshot => {
                    this.setState({graduates: querySnapshot.docs.map(doc => {
                        const docData = doc.data();
                        return {
                            ...docData,
                            id: doc.id
                        };
                    })
                    });
                })
                .catch(error => {
                    console.error("Error getting graduates:", error);
                })
    }

    componentDidUpdate() {                 // for visibleFor sorting
        FireManager.getGraduates().then(querySnapshot => {
            this.setState({graduates: querySnapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        ...docData,
                        id: doc.id
                    };
                })
            });
        }).catch(error => {
            console.error("Error getting graduates:", error);
        })
    }




    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value, graduates } = this.state;
        const { courses } = this.props;
        const tabs = courses.map((course, index) => <Tab key={course+index} label={course} />);
        const graduatesList = value ===0 ? graduates: graduates.filter(graduate => graduate.course === courses[value-1])



        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label='All' />
                        {tabs}
                    </Tabs>
                </AppBar>

               <TabContainer><GraduatesList graduates={graduatesList}
                                            selected={this.state.selected}
                                            handleSelectAllClick={this.handleSelectAllClick}
                                            handleDeleteButtonClick={this.handleDeleteButtonClick}
                                            handleClick={this.handleClick}/></TabContainer>
            </div>
        );
    }
}

export default withStyles(styles)(NavBar);