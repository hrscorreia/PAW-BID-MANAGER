var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var User = require("./models/User");

var indexRouter = require('./routes/index');
var authRouter = require("./routes/auth");
var apiROtuer = require("./routes/api");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//MONGO
mongoose.connect('mongodb://localhost:27017/auction-paw', {useNewUrlParser: true});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Servir recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Dados de sessão
app.use(session({
  secret: require('./config').localSecret,
  resave: false,
  saveUninitialized: false
  }));

passport.serializeUser(
  function(user, done){
      done(null, user.id)});

passport.deserializeUser((id, done) =>
  User.findById(id, function(err, user){
    done(err, user);
  })
);

passport.use(require("./localStrategy"));
passport.use(require('./jwtStrategy'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use("/", authRouter);
app.use('/api', apiROtuer)
app.use('/admin', require('./routes/admin'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
