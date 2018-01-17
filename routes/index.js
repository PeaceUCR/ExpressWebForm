var express = require('express');
var router = express.Router();

// mideware to get the file upload
var fileUpload = require('express-fileupload');
router.use(fileUpload());

var mv = require('mv');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.id);
    if(!req.session.idSession){
        res.render('index', { title: 'Express' });
    }else{
        res.send("you already have session!");
    }

  console.log("handler1");
  next();
});

router.get('/', function(req, res, next) {
    console.log("handler2");
});

router.get('/upload', function(req, res, next) {
    console.log(req.session.id);
    res.render('upload', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    console.log(req.session.id);
    console.log('login here');
    console.log(req.body);
    res.send("data sent!");
});


router.post('/upload', function(req, res, next) {
    //https://www.npmjs.com/package/express-fileupload
    console.log(req.files.pic);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.pic;
    //get uct time as file name
    var time = new Date();
    var utc = "Date"+time.toLocaleDateString().replace(/\//g,"-")+"Hour"+time.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
    console.log(utc);
    // Use the mv() method to place the file somewhere on your server
    // care the path ,don't put'/' at first char, or get " ENOENT" error
    sampleFile.mv('public/images/'+utc+'.jpg', function(err) {
        if (err)
            return res.status(500).send(err);

        res.render('upload_success',{ imgPath: '/images/'+utc+'.jpg'});
        //res.sendFile("upload_success.html",{ root: "/public/htmls/" });
    });
});
module.exports = router;
