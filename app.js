var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

var routes = require('./routes/index');

var app = express();
var server = http.Server(app);
var io = socketio(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var connection_count = 0;
var questions = [];
var current_slide;

io.on('connection', function(socket) {
  connection_count++;

  io.emit('connections', connection_count);
  socket.emit('questions', questions);
  socket.emit('goto', current_slide);

  socket.on('disconnect', function() {
    connection_count--;
    io.emit('connections', connection_count);
  });

  socket.on('goto', function(data) {
    current_slide = data;
    io.emit('goto', data);
  });

  socket.on('question', function(data) {
    questions.push({question: data, upvotes: 0});
    io.emit('questions', questions);
  });

  socket.on('upvote', function(data) {
    var questionId = Number(data);

    if(questionId >= 0 && questionId < questions.length) {
      questions[questionId].upvotes++;
      io.emit('questions', questions);
    }
  });

});

server.listen(5000);