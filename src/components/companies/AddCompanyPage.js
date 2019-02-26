import React, { Component } from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import { v4 } from 'uuid';
import generatePassword from 'password-generator';
import { isValidEmail } from '../validators/EmailValidator';
import { isValidName } from '../validators/NameValidator';

export default function AddCompanyPage(props) {
    
    const name = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');

    function onCompanyFormSubmit (e) {
        if (!isValidName(name.value)) return;
        if (!isValidEmail(email.value)) return;
        e.preventDefault();
        const id = v4();
        const data = {
            name: name.value,
            email: email.value,
           // password: password.value
        }

        props.addCompanyToList(data);

        let a = generatePassword(7, null, null, `${data.name}-`);
        data.password = a;
        console.log(a);
        FireManager.createCompanyInFirebase(data, id).then(() => {
            FireManager.createUserWithEmailAndPassword(email.value, a).then(user => {
                debugger;
            }).catch(err => {
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
            <div>

            </div>
        </form>
    );
}