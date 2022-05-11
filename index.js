const express = require('express');
require('@prisma/client');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// redirect to routes/index.js
const route = require('./routes');
app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/api/v1/', route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The primates are at localhost:${port}`);
});