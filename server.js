var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const chalk = require('chalk');
var cors = require('cors')

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

var index = require('./routes/index');
var group = require('./routes/group');
var listgroups= require('./routes/listgroups');
var displayAttendance = require('./routes/display');
var sendMessage = require('./routes/send')

var app = express();

app.set('port', process.env.PORT ||  8080);

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//BodyParser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(function(req, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(cors());
app.options('*',cors());

app.use('/', index);
app.use('/api', group);
app.use('/api', listgroups);
app.use('/api', displayAttendance);
app.use('/api', sendMessage);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
  
