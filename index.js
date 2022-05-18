const express = require('express');
require('@prisma/client');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// redirect to routes/index.js
const route = require('./routes');
app.use(cookieParser());
app.use(cors());
const whiteList = ['http://localhost:3000', ,'https://bro-1q1jokw3o-matthewfelixr.vercel.app'];
const corsOptions ={
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/api/v1/', route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The primates are at localhost:${port}`);
});