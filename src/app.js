import express from 'express';
import bodyParser from 'body-parser';
import cors  from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
});