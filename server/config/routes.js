var users = require('./../controllers/users.js');


module.exports = function(app){
    app.get('/', function(req, res){
        return res.render('index');
    }),
    app.get('/search', function(req, res){
        users.search(req, res);
    });

}