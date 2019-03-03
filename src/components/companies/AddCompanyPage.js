import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import generatePassword from 'password-generator';
import { isValidEmail } from '../validators/EmailValidator';
import { isValidName } from '../validators/NameValidator';

export default function AddCompanyPage(props) {
    const name = useFormInput('');
    const email = useFormInput('');

    function getPassword () {
        document.getElementById("password").value = generatePassword(6, false);
    }

    function onCompanyFormSubmit (e) {
        if (!isValidName(name.value)) return;
        if (!isValidEmail(email.value)) return;
        e.preventDefault();
        const data = {
            name: name.value,
            email: email.value,
            password: document.getElementById('password').value
        }

        props.addCompanyToList(data);

        FireManager.createCompanyInFirebase(data).then(() => {
            FireManager.createUserWithEmailAndPassword(data.email, data.password).then(user => {
            }).catch(err => {
                console.log(err.message)
            })
        });
    }

    return (
        <form onSubmit={onCompanyFormSubmit}>
            <input {...name}/>
            <input {...email} />
            <input type='text' id='password'/>
            <button type='button'onClick={getPassword}>auto</button>
            <button type='submit'>add</button>
        </form>
    );
}
