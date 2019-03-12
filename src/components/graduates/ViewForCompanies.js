import React, { Component } from 'react';
import FireManager from "../../firebase/FireManager";
import Dialog from '@material-ui/core/Dialog';
import ProfileForCompanies from "./GraduateProfileForCompanies";


export default class ViewForCompanies extends Component {
    state = {
        availableGraduates: [],
        value: 0,
        open: false,

    }

    handleClickOpen = (i) => {
        this.setState({value: i,
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
        const list = this.state.availableGraduates.map((graduate, i)=> <li key={graduate.id}
                                                                                     graduate={graduate}
                                                                                     onClick={()=>this.handleClickOpen(i)}>{graduate.firstName} {graduate.lastName}</li>)
        return(
            <>
                <Dialog
                    // fullWidth
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                   <ProfileForCompanies graduate={this.state.availableGraduates[this.state.value]}/>
                </Dialog>

            <ul>{list}</ul>
                </>
        )
    }
}