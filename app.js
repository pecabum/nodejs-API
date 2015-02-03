var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    users = require('./routes/users'),
    assert = require('chai').assert,
    http = require('http'),
    rest = require('restler'), 
    Attraction = require('./models/attraction.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('cors')());
app.use('/', routes);
app.use('/users', users);

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

app.get('/api/attractions', function(req, res){
   Attraction.find({ approved: true }, function(err, attractions){
       if(err) return res.send(500, 'Error occurred: database error.');
       res.json(attractions.map(function(a){
           return {
               name: a.name,
               id: a._id,
               description: a.description,
               location: a.location,
           }
       }));
   });
});
app.post('/api/attraction', function(req, res){
   var a = new Attraction({
       name: req.body.name,
       description: req.body.description,
       location: { lat: req.body.lat, lng: req.body.lng },
       history: {
           event: 'created',
           email: req.body.email,
           date: new Date(),
       },
       approved: false,
   });
   a.save(function(err, a){
       if(err) return res.send(500, 'Error occurred: database error.');
       res.json({ id: a._id });
   });
});
app.get('/api/attraction/:id', function(req,res){
   Attraction.findById(req.params.id, function(err, a){
       if(err) return res.send(500, 'Error occurred: database error.');
       res.json({
           name: a.name,
           id: a._id,
           description: a.description,
           location: a.location,
       });
   });
});


module.exports = app;

// Listen
app.listen(app.get('port'), function(){

	console.log( 'Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.' );

});
