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
        FireManager.getAvailableGraduates(this.props.company.email)
            .then(querySnapshot => {
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
            .catch((err)=>{
                console.error('Error getting available graduates', err.message)
            })
    }

    render(){
        const { open, activeGraduate, availableGraduates } = this.state;

        return(
            <>
                <Dialog
                    // fullWidth
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                   <ProfileForCompanies graduate={activeGraduate}/>
                </Dialog>
                <AvailableGraduatesList graduates={availableGraduates} handleClick={this.handleClickOpen}/>

                </>
        )
    }
}