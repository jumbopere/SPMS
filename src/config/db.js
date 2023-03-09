import mongoose from "mongoose";

mongoose.Promise = Promise;

module.exports = (config) => {
  if (!config.dbUrl) {
    throw new Error('Connection error, Database url not found');
  }
  return mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  });
};
