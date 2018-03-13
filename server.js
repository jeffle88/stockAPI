var express = require('express'),
    app = express(),
    bp = require('body-parser'),
    path = require('path'),
    session = require('express-session'),
    port = 8000;

app.use(express.static(__dirname + '/client/static'));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(session({secret: 'dojo'}));
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'ejs');
//routes go here
require("./server/config/routes")(app);

app.listen(port, function(){
    console.log(`We are listening to port ${port}`);
});