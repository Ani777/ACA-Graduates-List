import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import { v4 } from 'uuid';
import '../../App.css';

export default function AddCoursePage() {

    const name = useFormInput('');



    function onCourseFormSubmit (e) {
        e.preventDefault();
        const id = v4();
        const data = {
            name: name.value

        }
        FireManager.createCourseInFirebase(data, id).then(() =>{
            FireManager.writeUserData(name.value).then(user =>{
                debugger;
            }).catch(err=>{
                debugger;
            })
        });

    }

    return (
        <form onSubmit={onCourseFormSubmit}>
            <input placeholder="Course Name" {...name} />
            <button type='submit'>Add</button>
        </form>
    );
}