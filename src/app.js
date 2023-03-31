import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './config/db'
import config from './config';
import { userRoute, performanceDataRoute, sensorRoute, shipRoute } from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db(config).
  then(() => {
    app.use('/user', userRoute(express));
    app.use('/performance', performanceDataRoute(express));
    app.use('/sensor', sensorRoute(express));
    app.use('/ship', shipRoute(express));

    app.get('/', (req, res) => {
      res.status(200).send({message:'Welcome to the ship performance monitoring system'});
    });
    app.use('*', (req, res) => {
      res
      .status(404)
      .send({ message: "you are trying to access an unknown route" });
  });
    app.use((err, req, res, next) => {
      if (err) {
        res.status(400).json({
          message: err.toString(),
        });
      } else {
        next(err);
      }
    });

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    });
  }).catch((err) => {
    throw new Error(`Connection error: ${err.message}`);
  })




module.exports = app