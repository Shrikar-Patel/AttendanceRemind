var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
var dbfunctions = require('../dbfunctions/getRequests.js');

router.get('/group', function(req,res,next) {
    res.send('ADD PHONE NUMBERS TO GROUP API');
    //most likely going to render a template, with username, names and phone numbers
});

router.post('/group/newgroup', function (req, res, next){
    var user = req.body.user;
    var groupName = req.body.groupName;
    var  numbers = req.body.numbers;

    dbfunctions.createGroup(groupName, user, numbers, function(err,resp){
        if(err){
            console.error(err);
        }
        res.send('Successfully Created Group');
    })
    
})
















module.exports = router;