var RSVP = require('rsvp');
var Cheerio = require('cheerio');

var utils = require('./utils');

var BASE_URL = 'http://baseball-reference.com';

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
    }
  });
};

// promise -> array of gameday urls for the season
exports.getSeasonGamedays = function (season) {
  return new RSVP.Promise(function (resolve, reject) {
    exports.get(BASE_URL + '/boxes/' + season + '.shtml').then(function (response) {
      var gamedayUrls = [];
      var C = Cheerio.load(response);
      var regex = new RegExp('^/play-index*');

      C('td > a').filter(function () {
        return regex.test(C(this).attr('href'));
      }).each(function (i, e) {
        gamedayUrls[i] = BASE_URL + C(this).attr('href');
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
      var C = Cheerio.load(response);
      var regex = new RegExp('^/boxes/*');

      C('pre > a').filter(function () {
        return regex.test(C(this).attr('href'));
      }).each(function (i) {
        boxscoreUrls[i] = BASE_URL + C(this).attr('href');
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
      }

      var day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }

      var rs = 'date=' + date.getFullYear() + '-' + month + '-' + day;
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
      var C = Cheerio.load(response);
      // remove innings and dashes and extra whitespace
      var lineScoreText = C('#linescore').text().replace(/\s+/g, ' ').trim();
      var lines = lineScoreText.match(/\d(\d|\s)+/g).map(function (s) {
        return s.trim();
      });

      // create box score header
      var header = lines[0].split(' ');
      ['R', 'H', 'E'].map(function (e) {
        header.push(e);
      });
      var awayLine = lines[1].split(' ');
      var homeLine = lineScoreText.split(' ').slice(-awayLine.length);
      var awayTeam = lineScoreText.match(/(-\s+)([a-z]\D+)(\s)/i)[2] + ' ';
      var homeTeam = lineScoreText.match(/\D+\s/g)[1];
      var awayRecord = C('td:nth-child(1) > div.x_large_text.bold_text').text();
      var homeRecord = C('td:nth-child(3) > div.x_large_text.bold_text').text();

      var teamLinks = [];
      C('#linescore > strong > a').each(function (i) {
        teamLinks[i] = BASE_URL + C(this).attr('href');
      });

      var attendance = utils.numberWithCommas(
        C('#attendance').text().match(/\d/g).join(''));
      var duration = C('#gametime').text().match(/\d+:\d+/g)[0];

      var boxScore = {
        header: header,
        attendance: attendance,
        duration: duration,
        away: {
          name: awayTeam,
          record: awayRecord,
          teamLink: teamLinks[0],
          line: awayLine
        },
        home: {
          name: homeTeam,
          record: homeRecord,
          teamLink: teamLinks[1],
          line: homeLine
        }
      };
      resolve(boxScore);
    });
  });
};
