var express = require('express');
var router = express.Router();

router.get('/display', function(req,res,next) {
    res.send('ADD DISPLAY ATTENDANCE FOR EACH EVENT');
});

module.exports = router;