const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator =require('express-validator');
const logger = require('morgan');
const jwt = require('jwt-simple');
const port = process.env.PORT || 3000;


const airRoutes = require('./app/routes/airRoute');
const airPlane = require('./app/models/airplane');
const userRoutes  = require('./app/routes/user');
const config = require('./app/config/database');
const User = require('./app/models/user');

const app = express();
require('./app/config/passport')(passport);


// mongoose instance connectionUrl connectionUrl
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('client'));



airRoutes(app);
app.use('/api',userRoutes);



app.get('/', function(req, res){
    res.send('please use /api/airPlane');
});

app.listen(port, function () {
    console.log('server running port... http://127.0.0.1:'+ port);
});

module.exports = app;
