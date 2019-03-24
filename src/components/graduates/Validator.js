import * as PasswordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';
import isURL from 'validator/lib/isURL';

const nameValidationMap = {
    min: 'Minimum length 2',
    max: 'Maximum length 16',
    symbols: 'Should not have symbols',
    digits: 'Should not have digits',
    oneOf: 'Should not equal "name", "firstname" or "lastname"'
};

export const isValidName = name =>{
    let schema = new PasswordValidator();
    schema
        .is().min(2)
        .is().max(16)
        .has().not().digits()
        .has().not().symbols()
        .is().not().oneOf(['name', 'firstname','lastname']);

    const validateResult = schema.validate(name, {list: true});
    return validateResult.map(errorKey => nameValidationMap[errorKey]);
};


export const isValidEmail = email => {
    return EmailValidator.validate(email)? []: ['Invalid Email'];
};


export const isValidPhoneNumber = phone => {
    let letters = /^374[0-9]{8}$/i;

    if(phone.match(letters)) {
        return [];
    } else {
        return ['Please enter in the following format 374********'];
    }
};


export const isValidUrl = url => {
    return isURL(url,
        { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false,
            require_host: true, require_valid_protocol: true, allow_underscores: false,
            host_whitelist: false, host_blacklist: false, allow_trailing_dot: false,
            allow_protocol_relative_urls: false, disallow_auth: false }) || url === "" ? []: ['Invalid Url'];
};


export const isValidYearOfBirth = yearOfBirth =>{
    let currentDate = new Date();
    return yearOfBirth > currentDate.getFullYear() - 60 && yearOfBirth < currentDate.getFullYear() - 10 ? []: ['Invalid Year'];
};


export const isValidTestsResult = testResults =>{
    return testResults > 0 && testResults < 101 ? []: ['Result must be 1 to 100'];
};

export const isValidPassword = password =>{
    return password.length < 6 ? ['Minimum length 2']: [];
};

export const isValidRequired = result =>{
    return result.length > 0 ? []: ['This field is required'];
};






