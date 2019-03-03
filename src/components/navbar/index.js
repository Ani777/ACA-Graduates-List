import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import FireManager from "../../firebase/FireManager";
import GraduatesList from "../graduates/GraduatesList";
import firebase from "firebase";

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

class ScrollableTabsButtonForce extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        value: 0,
        courses: [],
        graduates: [],

    }

    componentDidMount(){
        firebase.firestore().collection('courses').get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data().name)).then(
            courses => {
                this.setState({courses})
            }
        ).then(()=>{FireManager.getGraduates().then(querySnapshot => {
            this.setState({graduates: querySnapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        ...docData,
                        id: doc.id
                    };
                })
            });
        })}).catch(error => {
            console.error("Error getting graduates:", error);
        })
    }



    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value, courses, graduates } = this.state;

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
                        {/*<Tab  icon={<PhoneIcon />} />*/}
                        {/*<Tab  icon={<FavoriteIcon />} />*/}
                        {/*<Tab  icon={<PersonPinIcon />} />*/}
                        {/*<Tab  icon={<HelpIcon />} />*/}
                        {/*<Tab  icon={<ShoppingBasket />} />*/}
                        {/*<Tab  icon={<ThumbDown />} />*/}
                        {/*<Tab  icon={<ThumbUp />} />*/}
                    </Tabs>
                </AppBar>

               <TabContainer><GraduatesList graduates={graduatesList}/></TabContainer>
                {/*{value === 1 && <TabContainer>Item Two</TabContainer>}*/}
                {/*{value === 2 && <TabContainer>Item Three</TabContainer>}*/}
                {/*{value === 3 && <TabContainer>Item Four</TabContainer>}*/}
                {/*{value === 4 && <TabContainer>Item Five</TabContainer>}*/}
                {/*{value === 5 && <TabContainer>Item Six</TabContainer>}*/}
                {/*{value === 6 && <TabContainer>Item Seven</TabContainer>}*/}
            </div>
        );
    }
}

ScrollableTabsButtonForce.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);