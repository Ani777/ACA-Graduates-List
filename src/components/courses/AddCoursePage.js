import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
//import { v4 } from 'uuid';
import '../../App.css';
//import {TextField} from '@material-ui/core/TextField';

export default function AddCoursePage(props) {

    const name = useFormInput('');



    function onCourseFormSubmit (e) {
        e.preventDefault();
        //const id = v4();
        const data = {
            name: name.value

        }



        FireManager.createCourseInFirebase(data).then(()=> {
            props.addCourseToList(data)
        }).catch(err=>{
            console.error(err.message)

        });
    }


    return (
        <form onSubmit={onCourseFormSubmit}>
            <input placeholder="Course Name" {...name} />
            <button type='submit'>Add</button>
        </form>
    );
}