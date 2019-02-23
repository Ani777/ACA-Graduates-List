import React, { Components } from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import { v4 } from 'uuid';

export function AddCompanyPage() {
    
    const name = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');

    function onCompanyFormSubmit (e) {
        e.preventDefault();
        const id = v4();
        const data = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        FireManager.createCompanyInFirebase(data, id).then(() =>{
            FireManager.createUserWithEmailAndPassword(email.value, password.value).then(user =>{
                debugger;
            }).catch(err=>{
                debugger;
            })
        });
    }

    return (
        <form onSubmit={onCompanyFormSubmit}>
            <input {...name}/>
            <input {...email} />
            <input {...password} />
            <button type='submit'>add</button>
        </form>
    );
}