var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient; 
const uri = process.env.MONGODB_URI;
const ObjectID = require('mongodb').ObjectID;



router.get('/listgroups', function(req,res,next) {
    MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client) {
        if (err) {
            console.error('An error occurred connecting to MongoDB: ', err);
        } else {
            const db = client.db("messaging_app")
            db.collection("group", function (err, collection) {
                 collection.find({}).toArray(function(err, groups) {
                              res.send(groups);
                 })
            })
            client.close();
        }
    
})});

router.get('/listgroups/:id', function(req,res,next){
    MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
        if(err){
            console.error('An error occurred connecting to MongoDB: ', err);
        } else {
            const db = client.db("messaging_app");
            db.collection("group", function (err, collection) {
                 collection.findOne({_id: new ObjectID(req.params.id)} , function(err, group) {
                                console.log(req.params.id);
                              res.json(group);
                 }
                 )})     
            
            client.close();
        }
    })
})







module.exports = router;