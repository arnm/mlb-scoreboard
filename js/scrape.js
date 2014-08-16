var RSVP = require('rsvp');
var Cheerio = require('cheerio');

exports.get = function (url) {
  return new RSVP.Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onreadystatechange = handler;
    req.send();

    function handler() {
      if (this.readyState === this.DONE) {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      }
    };
  });
};

exports.getSeasonGamedays = function (season) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.get('http://www.baseball-reference.com/boxes/' + season + '.shtml').then(function (response) {
      var gamedays = [];
      var $ = Cheerio.load(response);
      var regex = new RegExp('^/play-index*');

      $('td > a').filter(function () {
        return regex.test($(this).attr('href'));
      }).each(function (i, e) {
        gamedays[i] = 'http://www.baseball-reference.com' + $(this).attr('href');
      });

      resolve(gamedays);
    });

  });
};

exports.getGamedayBoxScores = function (gameday) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.get(gameday).then(function (response) {
      var boxscores = [];
      var $ = Cheerio.load(response);
      var regex = new RegExp('^/boxes/*')

      $('pre > a').filter(function () {
        return regex.test($(this).attr('href'));
      }).each(function (i) {
        boxscores[i] = 'http://baseball-reference.com' + $(this).attr('href');
      });

      resolve(boxscores);
    });
  });
};
