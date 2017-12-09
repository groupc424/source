#!/usr/bin/env node

/**
 * Module dependencies
 */

 var express = require('express');
 var path = require('path');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var exphbs = require('express-handlebars');
 var expressValidator = require('express-validator');
 var flash = require('connect-flash');
 var session = require('express-session');
 var passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var mongo = require('mongodb');
 var mongoose = require('mongoose');
 var db = mongoose.connection;

 var routes = require('./routes/index');
 var users = require('./routes/users');

 // Init server
 var server = express();


//var server = require('./src/app');

var debug = require('debug')('untitled:server');
var http = require('http');


// Init App
var app = express();

// View Engine
server.set('views', path.join(__dirname, 'views'));
server.engine('handlebars', exphbs({defaultLayout:'layout'}));
server.set('view engine', 'handlebars');

// BodyParser Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

// Set Static Folder
server.use(express.static(path.join(__dirname, 'public')));

// Express Session
server.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
server.use(passport.initialize());
server.use(passport.session());

// Express Validator
server.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
server.use(flash());

// Global Vars
server.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  //res.locals.user = req.user || null;
  next();
});



server.use('/', routes);
server.use('/users', users);





/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
server.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
