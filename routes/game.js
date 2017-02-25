var express     = require('express');
var router      = express.Router();

/* GET game */
router.get('/', function(req, res, next){
  res.render('game', {
    name:   "NumberWang!"
  });
})

module.exports = router;
