"use strict";

const express = require('express');
const app = express();
let hbs = require('express-hbs');
const port = process.env.NODE_ENV || 9001;

// Set static content.
app.use('/', express.static('./public'));

// Set view template engine for file extension server.view.html
app.engine('server.view.html', hbs.express4({
  extname: '.server.view.html'
}));

// Set view engine
app.set('view engine', 'server.view.html');

// Set views folder
app.set('views', './app/views');

app.use('/', function renderIndexPage(req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page not found');
  return next(err);
});


// Error handle
app.use(function(err, req, res, next) {
  const _status = err.status || 500;
  res.status(_status);
  res.render('error', {
    message: err.message,
    status : _status
  });
});

app.listen(port, function(err) {
  if(err) {
    console.error('Something error !!');
    console.error(err);
  }
  
  console.log('===== Sociss Class - Plugin Random team =====');
  console.log('App listen on port ' + port);
});
