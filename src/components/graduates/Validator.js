import * as PasswordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';



const nameValidationMap = {
    min: 'Minimum length 2',
    max: 'Maximum length 16',
    symbols: 'Should not have symbols',
    digits: 'Should not have digits',
    oneOf: 'Should not equal "name", "firstname" or "lastname"'
};
const isValidValidationMap = {
    min: 'Minimum length 2'
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
    min: 'This field is required',
    letters: 'Should not have letters',
    symbols: 'Should not have symbols',
};
const requiredValidationMap = {
    min: 'This field is required'
};

const phoneNumberValidationMap = {
    min: 'This field is required',
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
        .has().not().letters()
        .has().not().symbols()


    const validateResult = schema.validate(testResults, {list: true});
    return validateResult.map(errorKey => testResultValidationMap[errorKey]);
};

export const isValidRequired = testResults =>{
    let schema = new PasswordValidator();
    schema
        .is().min(1)


    const validateResult = schema.validate(testResults, {list: true});
    return validateResult.map(errorKey => requiredValidationMap[errorKey]);
};



export const isValidPhoneNumber = phone =>{
    let schema = new PasswordValidator();
    schema
        .is().min(8)
        .has().not().letters()
        .has().not().symbols()
        .has().digits()



    const validateResult = schema.validate(phone, {list: true});
    return validateResult.map(errorKey => phoneNumberValidationMap[errorKey]);
};

export const isValidField = field =>{
    let schema = new PasswordValidator();
    schema
        .is().min(1)




    const validateResult = schema.validate(field, {list: true});
    return validateResult.map(errorKey => isValidValidationMap[errorKey]);
};