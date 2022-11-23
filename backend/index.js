var express = require('express');
var mongoose = require('mongoose');
require('dotenv/config');

//route
/*
var indexRouter = require('./routes/index');
*/
var app = express();

mongoose.connect(process.env.DB_MONGO_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
  if (err)
  { 
    console.log('Failed connected!!!')
    throw err;
  }
  console.log("connect to db");
});

//diẻct
/*
app.use('/', indexRouter);
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port`);
});

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
