var users = require('./../controllers/users.js');


module.exports = function(app){
    app.get('/', function(req, res){
        return res.render('index');
    }),
    app.get('/search', function(req, res){
        users.search(req, res);
    }),
    app.get('/back', function(req, res){
        console.log("hit")
        return res.render('index');
    });
}