import React from 'react';
import FireManager from '../../firebase/FireManager';
import { useFormInput } from '../../hooks';
import generatePassword from 'password-generator';
import { isValidEmail } from '../validators/EmailValidator';
import { isValidName } from '../validators/NameValidator';
import {APP_DEFAULT_COMPANY_ROLE} from "../../constants/appConstants";

export default function AddCompanyPage(props) {
    const name = useFormInput('');
    const phone = useFormInput('');
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
            phone: phone.value ? phone.value : '━',
            email: email.value,
            password: document.getElementById('password').value,
            role: APP_DEFAULT_COMPANY_ROLE
        };



        FireManager.createUserWithEmailAndPassword(data.email, data.password).then(user => {
            FireManager.createCompanyInFirebase(data, user.user.uid).then(() => {
                props.addCompanyToList(data);
            });
        }).catch(function(error) {
            console.error("Error creating user:", error);
        })


    }

    return (
        <form onSubmit={onCompanyFormSubmit}>
            <input {...name}/>
            <input {...phone}/>
            <input {...email} />
            <input tyoe='text' id='password'/>
            <button type='button'onClick={getPassword}>auto</button>
            <button type='submit'>add</button>
        </form>
    );
}