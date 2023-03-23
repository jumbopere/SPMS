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


// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongoServer;

// module.exports.connect = async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   });
// };

// module.exports.closeDatabase = async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// };

// module.exports.clearDatabase = async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany();
//   }
// };

// // sample.test.js

// const mongoose = require('mongoose');
// const { connect, closeDatabase, clearDatabase } = require('./setupTestDatabase');

// beforeAll(async () => {
//   await connect();
// });

// afterEach(async () => {
//   await clearDatabase();
// });

// afterAll(async () => {
//   await closeDatabase();
// });