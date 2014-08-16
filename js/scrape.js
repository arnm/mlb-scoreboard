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
      var gamedayUrls = [];
      var $ = Cheerio.load(response);
      var regex = new RegExp('^/play-index*');

      $('td > a').filter(function () {
        return regex.test($(this).attr('href'));
      }).each(function (i, e) {
        gamedayUrls[i] = 'http://www.baseball-reference.com' + $(this).attr('href');
      });

      resolve(gamedayUrls);
    });

  });
};

exports.getGamedayBoxScores = function (gamedayUrl) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.get(gamedayUrl).then(function (response) {
      var boxscoreUrls = [];
      var $ = Cheerio.load(response);
      var regex = new RegExp('^/boxes/*')

      $('pre > a').filter(function () {
        return regex.test($(this).attr('href'));
      }).each(function (i) {
        boxscoreUrls[i] = 'http://baseball-reference.com' + $(this).attr('href');
      });
      resolve(boxscoreUrls);
    });
  });
};

exports.getGamedayForDate = function (date) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.getSeasonGamedays(date.getFullYear()).then(function (gamedayUrls) {
      var month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      };

      var rs = 'date=' + date.getFullYear() + '-' + month + '-' + date.getUTCDate();
      var regex = new RegExp(rs);

      var gamedays = gamedayUrls.filter(function (e) {
        return regex.test(e);
      });

      if (gamedays.length === 0) {
        reject(Error('No boxscores for: ' + date.toString()));
      }
      resolve(gamedays[0]);
    });
  });
};

exports.getBoxScore = function (boxscoreUrl) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.get(boxscoreUrl).then(function (response) {
      var $ = Cheerio.load(response);
      resolve($('#linescore').text());
    });
  });
};
