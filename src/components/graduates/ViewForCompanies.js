import React, { Component } from 'react';
import FireManager from "../../firebase/FireManager";
import Dialog from '@material-ui/core/Dialog';
import ProfileForCompanies from "./GraduateProfileForCompanies";
import AvailableGraduatesList from "../visibility/AvailableGraduatesList";


export default class ViewForCompanies extends Component {
    state = {
        availableGraduates: [],
        activeGraduate: {},
        open: false,

    }

    handleClickOpen = (graduate) => {
        this.setState({activeGraduate: graduate,
                             open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    componentDidMount() {
        FireManager.getAvailableGraduates(this.props.company.email).then(querySnapshot => {
                this.setState({
                    availableGraduates: querySnapshot.docs.map(doc => {
                        const docData = doc.data();
                        return {
                            ...docData,
                            id: doc.id
                        };
                    }),
                })
            }
        )
    }

    render(){

        return(
            <>
                <Dialog
                    // fullWidth
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                   <ProfileForCompanies graduate={this.state.activeGraduate}/>
                </Dialog>
                <AvailableGraduatesList graduates={this.state.availableGraduates} handleClick={this.handleClickOpen}/>

                </>
        )
    }
}