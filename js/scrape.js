var RSVP = require('rsvp');
var Cheerio = require('cheerio');

// promise -> if request returns 200 resolve the response
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

// promise -> array of gameday urls for the season
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

// promise -> array of box score urls for gameday
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

// promise -> gameday url for the specified date, is null if no gameday on date
exports.getGamedayForDate = function (date) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.getSeasonGamedays(date.getFullYear()).then(function (gamedayUrls) {

      var month = date.getMonth() + 1; // Date months are 0 - 11 for some reason
      // match required format
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

// promise -> map representing a game box score
exports.getBoxScore = function (boxscoreUrl) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.get(boxscoreUrl).then(function (response) {
      var $ = Cheerio.load(response);
      // remove innings and dashes and extra whitespace
      var lineScoreText = $('#linescore').text().replace(/\s+/g, ' ');
      var lines = lineScoreText.match(/\d(\d|\s)+/g);

      // create box score header
      var header = lines[0].split(' ');
      ['R', 'H', 'E'].map(function (e) {
        header.push(e);
      });
      var awayLine = lines[1].split(' ');
      var homeLine = lines[2].split(' ');
      var awayTeam = lineScoreText.match(/(-\s+)([a-z]\D+)(\s)/i)[2];
      var homeTeam = lineScoreText.match(/\D+\s/g)[1].trim();

      var boxScore = {
        header: header,
        home: {
          name: homeTeam,
          line: homeLine
        },
        away: {
          name: awayTeam,
          line: awayLine
        }
      };
      resolve(boxScore);
    });
  });
};
