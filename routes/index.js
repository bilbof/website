var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: "Bill Franklin", headshot: "/images/bill.jpg", experience: [{date: "Apr 2015 - Present", role: "Success Engineer", org: "ChartMogul"}, {date: "2015 - Present", role: "Student", org: "Oxford"}], menu: [{name:"Blog", url: "https://billfranklin.svbtle.com"}] });
});

module.exports = router;
