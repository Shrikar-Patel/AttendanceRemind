var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient; 
const uri = process.env.MONGODB_URI;
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    
    getAllGroups: function getAllGroups () {
    MongoClient.connect(uri, {useNewUrlParser:true}, function(err, client){
        if(err){
            console.error("not connected", err);
        }else {
            const db = client.db("messaging_app");
            db.collection("group", function(err, collection){
                collection.find({}).toArray(function (err, groupsArray){
                    return groupsArray;
                })
            })
            db.on(close());
        }
        }
    )
},

    getNumbersByGroup: function getNumbersByGroup (groupName, callback) {
        console.log("IN HERE");
        var s = String(groupName);
        console.log(groupName);
        
        MongoClient.connect(uri, {useNewUrlParser:true}, function(err,client) {
        const db = client.db("messaging_app");
        db.collection("group", function(err,collection){
            collection.findOne({group: s}, function(err, numbersResp){
                if(err){
                    console.error("Was good", err);
                }
                const numArrays = numbersResp.numbers;
                console.log( 'In the function ' + numArrays);
                callback(numArrays);
                
            }
        )
    })
    db.on(close());
}
    )

},

    //handle post route 
    createEvent: function createEvent(eventNameSent, groupNameSent, callback) {
        MongoClient.connect(uri, {useNewUrlParser:true}, function(err,client) {
            const db = client.db("messaging_app");
            db.collection("event", function(err,collection){

                var obj = {
                    eventName: eventNameSent,
                    groupName: groupNameSent,
                    date: new Date(),
                    attendance : 0

                }

                collection.insertOne(obj, function(err, numbersResp){
                    if(err){
                        console.error("Was good", err);
                    }
                    console.log("Inserted Document");
                             
                }
                
                 )
        })
    
        db.on(close());})
   
    },

    createGroup: function createGroup(groupName, userName, numbers, callback){
        MongoClient.connect(uri, {useNewUrlParser:true}, function(err,client) {
            const db = client.db("messaging_app");
            db.collection("event", function(err,collection){

                var obj = {
                    group: groupName,
                    user: userName,
                    numbers : numbers

                }

                collection.insertOne(obj, function(err, numbersResp){
                    if(err){
                        console.error("Was good", err);
                    }
                    console.log("Inserted Document");
                             
                }
                
                 )
            
        })
        db.on(close());})


    },

    getAttendanceByEvent: function getAttendanceByEvent(eventId ,callback){
        MongoClient.connect(uri, {useNewUrlParser:true}, function(err,client) {
            const db = client.db("messaging_app");
            db.collection("event", function(err,collection){

                collection.findOne(new ObjectID(eventId), {projection: {eventName :1, attendance: 1}}, function(err, eventResp){
                    if(err){
                        console.error("Was good", err);
                    }
                    
                    callback(eventResp);
                             
                }
                
                 )
            
        })
        db.on(close())})


    },

    getAllEvents: function getAllEvents(callback){
        MongoClient.connect(uri, {useNewUrlParser:true}, function(err,client) {
            const db = client.db("messaging_app");
            db.collection("event", function(err,collection){

                collection.find({}).toArray(function(err, eventResp){
                    if(err){
                        console.error("Was good", err);
                    }else{

                    var array = new Array();
                    array = eventResp;

                     callback(array) ;
                    }      
                }
                
                 )
            db.on(close());
        })})

    },

    updateAttendanceForEvent: function updateAttendanceForEvent(eventNameMessage) {
        MongoClient.connect(uri, {useNewUrlParser:true}, function(err,client) {
            const db = client.db("messaging_app");
            db.collection("event", function(err,collection){

                collection.update({eventName: eventNameMessage}, {$inc: {attendance: 1 }},function(err, eventResp){
                    if(err){return err;}
                    console.log("Updated Document to increase by attendance");

                }
                
                 )
            //db.close();
        })
        db.on(close())})
    }


}


