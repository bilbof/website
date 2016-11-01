var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    name: "Bill Franklin",
    headshot: "/images/bill.jpg",
    description: "I work as a Customer Success Engineer at ChartMogul and study English Literature part-time at Oxford University.",
    menu: [
      {name:"Blog", url: "https://billfranklin.svbtle.com"},
      {name:"Twitter", url: "https://twitter.com/billfranklinuk"},
      {name: "GitHub", url: "https://github.com/bilbof/"},
      {name: "LinkedIn", url: "https://uk.linkedin.com/in/franklinbill"}
    ],
    experience: [
      {date: "Apr 2015 - Present", role: "Success Engineer", org: "ChartMogul"},
      {date: "Oct 2015 - Present", role: "Student", org: "Oxford University"},
      {date: "Apr 2014 - Apr 2015", role: "CMO", org: "Lavaboom"},
      {date: "Apr 2013 - August 2013", role: "Editor", org: "Pearson"}
    ],
    projects: [
      {name: "Chargebee integration", technologies: "Javascript (Node.js), MongoDB, Jade, Sass", org: "ChartMogul", link: "https://chargebee-chartmogul.herokuapp.com/"},
      {name: "Zendesk integration", technologies: "Javascript (Node.js, Ember), HTML, SCSS", org: "ChartMogul", link: "https://www.zendesk.com/apps/chartmogul/"},
      {name: "Google Sheets integration", technologies: "Javascript (GoogleScript), HTML, CSS", org: "ChartMogul", link: "https://chrome.google.com/webstore/detail/chartmogul/kpipbgelkcgkkeikmodggajbchfdnpcl?hl=en"},
      {name: "Geckoboard integration", technologies: "Javascript (Node.js)", org: "ChartMogul", link: "https://github.com/bilbof/chartmogul-geckoboard"},
      {name: "Intercom integration", technologies: "Javascript (Node.js), MongoDB, Jade, CSS", org: "ChartMogul", link: "https://chartmogul-intercom.herokuapp.com/"},
      {name: "Mac OS X menu bar integration", technologies: "Python", org: "ChartMogul", link: "https://github.com/bilbof/chartmogul-menu"},
      {name: "Various ChartMogul API integrations (IOS, PDF Export)", technologies: "Javascript, MongoDB, Jade, SCSS", org: "ChartMogul"},
      {name: "ChartMogul Command Line Interface (CLI)", technologies: "Javascript (Node.js)", org: "ChartMogul", link: "https://github.com/bilbof/chartmogul-cli"},
      {name: "ChartMogul Node.js client library", technologies: "Javascript (Node.js)", org: "ChartMogul", link: "https://github.com/bilbof/chartmogul-node"},
      {name: "German flashcard app", technologies: "HTML, CSS, Javascript (jQuery)", org: "Personal", link: "https://github.com/bilbof/Deutsch-app"},
      {name: "Lavaboom website", technologies: "HTML5, CSS3, Javascript (jQuery)", org: "Lavaboom"},
      {name: "Abacus web platform", technologies: "XML, HTML", org: "Pearson"}
    ]
  });
});

module.exports = router;
