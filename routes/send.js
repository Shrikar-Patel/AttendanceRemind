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
  



router.post('/send/:groupname/:message', function(req,res,next){

      dbfunctions.createEvent(req.body.eventName, req.body.groupname, function(err, result){
          console.log('Successfully created an event');
      })
    
      dbfunctions.getNumbersByGroup(req.body.groupname, function(result) {
        console.log(result);
        res.send(result);

        var i;
        var phones  =result;
        for ( i =0; i< phones.length; i++){
            const message = {
                to: phones[i],
                from: '+19084021532',
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
    var attendance = 0;
    if (req.body.Body == 'Yes' || req.body.Body == 'yes') {
      twiml.message('Great! See you there!');
      attendance = 1;
    } else if (req.body.Body == 'no' || req.body.Body == 'No') {
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