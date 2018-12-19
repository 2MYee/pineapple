var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var cors = require('cors');


// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signIn = require('./routes/signIn');
var signUp = require('./routes/signUp');
var calendar = require('./routes/calendar');
var board = require('./routes/board');

var chat = require('./routes/chat'); //chat

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use(cookieParser());
app.use(session({
  key: 'sid',
  secret: 'asdfaefafawfaw',
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signIn', signIn);
app.use('/signUp', signUp);
app.use('/calendar', calendar);
app.use('/board', board);

app.use('/chat', chat); //chat

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;