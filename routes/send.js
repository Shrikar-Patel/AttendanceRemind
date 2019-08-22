var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient; 
const uri = process.env.MONGODB_URI;
const ObjectID = require('mongodb').ObjectID;
var dbfunctions = require('../dbfunctions/getRequests.js');
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.get('/send', function(req,res,next){
     dbfunctions.getAllEvents( function (resp){
         console.log(resp);
        res.send(resp);
    })})
  



router.post('/send/message', function(req,res,next){

      dbfunctions.createEvent(req.body.eventName, req.body.groupName, function(err, result){
          console.log('Successfully created an event');
      })
    
      dbfunctions.getNumbersByGroup(req.body.groupName, function(result) {
        console.log(result);
        res.send(result);

        var i;
        var phones  =result;
        for ( i =0; i< phones.length; i++){
            const message = {
                to: phones[i],
                from: process.env.TWILIO_NUMBER,
                body: req.body.message
              };
              twilio.messages.create(message).then((sentMessage) => {
                console.log("Message Sent");
              }).catch(next);
        }
        
    })
    //console.log('Number Array ' + numbers);

})


router.post('/sms', function (req, res, next) {
    const twiml = new MessagingResponse();
    // based on this response, call another function that puts data into database, based on the result 
    var eventName = req.body.Body.substring(0, "/");
    var message = req.body.Body("/");
    var attendance = 0;
    if (message == 'Yes' || message == 'yes') {
      twiml.message('Great! See you there!');
      dbfunctions.updateAttendanceForEvent(eventName);
    } else if (message == 'no' || message == 'No') {
      twiml.message('Aww man, See you Soon!');
    } else {
      twiml.message(
        'No Body param match, Twilio sends this in the request to your server.'
      );
    }
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}
)








module.exports = router;