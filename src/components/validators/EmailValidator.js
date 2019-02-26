import * as EmailValidator from 'email-validator';

export const isValidEmail = email => {
    if (EmailValidator.validate(email)) {
        return true;
    } else {
        alert('invalid email');
    }
}