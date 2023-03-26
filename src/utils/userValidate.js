import Validator from 'validator';
import isEmpty from 'is-empty';

export const registerValidator = (data) => {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.dob = !isEmpty(data.dob) ? data.dob : '';
  data.nin = !isEmpty(data.nin) ? data.nin : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';


  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'FirstName is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'LastName is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender is required';
  }
  if (Validator.isEmpty(data.dob)) {
    errors.dob = 'Date of Birth is required';
  }
 
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone is required';
  }
  if (Validator.isEmpty(data.nin)) {
    errors.nin = 'NIN is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!Validator.isMobilePhone(data.phone)) {
    errors.phone = 'Phone Number is invalid';
  }
  
  if (!Validator.isLowercase(data.email)) {
    errors.email = 'Email must be in lowercase';
  }
  if(!Validator.isStrongPassword(data.password)){
    errors.password = "Password must be at least 8 character  containing at least 1 lowercase, number, uppercase, symbols"
}
if(!Validator.isDate(data.dob)){
  errors.dob="It must be YYYY/MM/DD,or YYYY-MM-DD, or YYYY,MM,DD format"
}

return {
  errors,
  isValid: isEmpty(errors),
};
};
export const loginValidator= (data)=>{
  let errors= {}
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
}
