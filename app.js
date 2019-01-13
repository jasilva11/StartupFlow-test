const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(cors());

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://testuser:test123@ds255784.mlab.com:55784/startupflow_test';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

let port = process.env.PORT || 8080;

require('./server/routes')(app);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});