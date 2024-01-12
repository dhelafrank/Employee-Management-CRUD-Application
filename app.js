var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {connectToDatabase} = require("./database")

var viewRouter = require('./routes/views');
var authRouter = require('./routes/auth');
var employeesRouter = require('./routes/employees')
var departmentsRouter = require('./routes/departments')

var app = express();
const PORT = process.env.PORT || 3001
//connectToDatabase("Up and Running")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);
app.use('/auth', authRouter);
app.use('/departments', departmentsRouter)
app.use('/employees', employeesRouter)

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

app.listen(PORT, ()=>{
  console.log(`Server is now listening on port ${PORT}`)
})
module.exports = app;
