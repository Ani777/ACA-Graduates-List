import React, { Components } from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import { v4 } from 'uuid';

export default function Courses() {

    const name = useFormInput('');
    const icon = useFormInput('');

    function onCoursesFormSubmit (e) {
        e.preventDefault();
        const id = v4();
        const data = {
            name: name.value
        }
        FireManager.addCourse(id, data, icon.value).then(() =>{
            debugger;
        });
    }

    return (
        <form onSubmit={onCoursesFormSubmit}>
            <input {...name}/>
            <input type='file' {...icon} />
            <button type='submit'>add</button>
        </form>
    );
}