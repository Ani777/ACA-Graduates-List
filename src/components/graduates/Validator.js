import * as PasswordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';



const nameValidationMap = {
    min: 'Minimum length 2',
    max: 'Maximum length 16',
    symbols: 'Should not have symbols',
    digits: 'Should not have digits',
    oneOf: 'Should not equal "name", "firstname" or "lastname"'
};


export const isValidEmail = email => {
    return EmailValidator.validate(email)? []: ['Invalid Email'];
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





const dateOfBirthValidationMap = {
    min: 'Length must be 4',
    max: 'Length must be 4',
    letters: 'Should not have letters',
    symbols: 'Should not have symbols',
};

const testResultValidationMap = {
    min: 'Minimum length 1',
    max: 'Maximum length 4',
    letters: 'Should not have letters',
    symbols: 'Should not have symbols',
};

const phoneNumberValidationMap = {
    min: 'Length must be 12',
    max: 'Length must be 12',
    letters: 'Should not have letters',
    symbols: 'Should not have symbols',
};



// export const isValidEmail = email => {
//     return EmailValidator.validate(email)? []: ['Invalid Email'];
// };

// export const isValidName = name =>{
//     let schema = new PasswordValidator();
//     schema
//         .is().min(2)
//         .is().max(16)
//         .has().not().digits()
//         .has().not().symbols()
//         .is().not().oneOf(['name', 'firstname','lastname']);

//     const validateResult = schema.validate(name, {list: true});
//     return validateResult.map(errorKey => nameValidationMap[errorKey]);
// };

export const isValidDateOfBirth = dateOfBirth =>{
    let schema = new PasswordValidator();
    schema
        .is().min(4)
        .is().max(4)
        .has().not().letters()
        .has().not().symbols()

    const validateResult = schema.validate(dateOfBirth, {list: true});
    return validateResult.map(errorKey => dateOfBirthValidationMap[errorKey]);
};

export const isValidTestResults = testResults =>{
    let schema = new PasswordValidator();
    schema
        .is().min(1)
        .is().max(4)
        .has().not().letters()
        .has().not().symbols()


    const validateResult = schema.validate(testResults, {list: true});
    return validateResult.map(errorKey => testResultValidationMap[errorKey]);
};

export const isValidPhoneNumber = phone =>{
    let schema = new PasswordValidator();
    schema
        .is().min(12)
        .is().max(12)
        .has().not().letters()
        .has().not().symbols()
        .has().digits()
        .has().spaces()



    const validateResult = schema.validate(phone, {list: true});
    return validateResult.map(errorKey => phoneNumberValidationMap[errorKey]);
};