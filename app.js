require('./api/data/db.js');
var express = require('express')
var app = express()
var path= require('path')
var bodyParser= require('body-parser')
var hbs = require('express-handlebars')
var routes = require('./api/routes')
var mongo = require('mongodb')
var mongoose = require('mongoose')

//the middleware use() function of express for serving static files.
app.use(express.static(path.join(__dirname,'views')))
app.get('/', function(req, res){
  res.render('index');

});



//setting the port
app.set('port',3000)



//temp engine
app.engine('hbs',hbs({extname:'hbs',defaultLayout: 'layout1', layoutsDir:__dirname + '/views/layouts'}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','hbs');

//bodyparser for posting the form related Data
app.use(bodyParser.urlencoded({ extended : false}))


//if a request starting with /api occurs it searches automatically in the routes folder.
app.use('/api',routes)


//making use of variable to configure the server properties..
var server = app.listen(app.get('port'),function(){
  var port = server.address().port;
  console.log('Express server listening on port ' + port)
})
