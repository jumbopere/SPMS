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


  // cron.schedule('0 * * * *', async () => {
  //   try {
  //     // Generate random data
  //     const data = {
  //       speed: Math.random() * 100, // generate a random number between 0 and 100
  //       position: `${Math.random() * 90},${Math.random() * 180}`, // generate random latitude and longitude
  //       rpm: Math.random() * 1000, // generate a random number between 0 and 1000
  //       temperature: Math.random() * 50, // generate a random number between 0 and 50
  //       fuelConsumption: Math.random() * 10, // generate a random number between 0 and 10
  //       ship: 'your-ship-id'
  //     };
  
  //     // Send data to the post route
  //     await axios.post('http://your-api.com/your-post-route', data);
  //     console.log('Data sent successfully!');
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // });