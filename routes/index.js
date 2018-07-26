var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    name: "Bill Franklin",
    headshot: "/images/bill.jpg",
    menu: [
      {name:"Twitter", url: "https://twitter.com/billfranklinuk"},
      {name: "GitHub", url: "https://github.com/bilbof/"},
      {name: "LinkedIn", url: "https://uk.linkedin.com/in/franklinbill"},
      {name:"Blog", url: "https://billfranklin.svbtle.com"}
    ],
  });
});

module.exports = router;
