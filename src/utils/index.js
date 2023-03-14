import jwt from 'jsonwebtoken'
import config from '../config';

export const generateToken = (paylaod) => {
    const options = {
      algorithm: 'HS256',
      issuer: 'spms.com',
      audience: 'spms.com',
      expiresIn: '365 days',
    };
  
    return jwt.sign(paylaod, config.secret, options);
  };

  export const userAge =(dob)=> {
    const currentDate = new Date();
    const birthDate = new Date(dob);
   let  age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }