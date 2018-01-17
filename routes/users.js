var express = require('express');
var router = express.Router();

//DB related
var mongoose= require('mongoose');
mongoose.connect('mongodb://peace:123@localhost/myDB', { useMongoClient: true });
var schema= mongoose.Schema({
    name: String,
    password: String,
    email: String
});
var account = mongoose.model('account', schema);
//model CRUD doc here http://mongoosejs.com/docs/models.html
//mongo shell commands here:https://docs.mongodb.com/manual/reference/mongo-shell/#command-line-options
//use myDB
//db.accounts.find()


var userList={'peace': {name:'peace',password:'123',email:'phe004@ucr.edu'}
              };

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userLogin', function(req, res, next) {
    res.render("userLogin");
});

router.get('/userRegister', function(req, res, next) {
    res.render("userRegister");
});

router.get('/userLogon', function(req, res, next) {
    res.render("userLogon",{message:req.session.name+" welcome!!!"});
});

router.post('/loginHandler', function(req, res, next) {
    console.log(req.body);
    console.log(req.body.password);
    console.log(userList[req.body.name]);
    if((userList[req.body.name]!==undefined)&&req.body.password===userList[req.body.name].password){
        req.session.name=req.body.name;
        res.redirect('/users/userLogon');
    }else{
        res.render("userLogin",{message:"wrong name password!!!"});
    }

});


router.post('/registerHandler', function(req, res, next) {

    var newAccount= new account({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    newAccount.save(function (err, response) {
        if(err){
            console.log('save fail'+err);
            res.send('register fail');
        }else{
            console.log('save success');
            res.send('register success');
        }
    })
});


//show all accounts
router.get('/accounts', function(req, res, next) {
    account.find(function (err, response) {
        res.json(response);
    });

});

module.exports = router;
