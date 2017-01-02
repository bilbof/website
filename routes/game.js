var express     = require('express');
var router      = express.Router();
var gameEvents  = require('../gameEvents.js');

/* GET game */
router.get('/', function(req, res, next){
  res.render('game', {
    name:   "Inside Trader",
    events: gameEvents
  });
})

module.exports = router;