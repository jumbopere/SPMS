require('dotenv').config();

module.exports = {
  dbUrl: process.env.APP_DB,
  secret: process.env.JWT_SECRET,
};