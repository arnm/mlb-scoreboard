/**
 * @jsx React.DOM
 */

var React = require('react');

var BoxScoreList = require('./BoxScoreList');
var scrape = require('../scrape');

var App = React.createClass({

  getInitialState: function () {
    return {
      boxscoreDate: new Date()
    }
  },

  render: function () {

    scrape.getSeasonGamedays(new Date().getFullYear()).then(function (gamedayUrls) {
      return scrape.getGamedayBoxScores(gamedayUrls[0]);
    }).then(function (boxscoreUrls) {
      return scrape.getBoxScore(boxscoreUrls[0]);
    }).then(function (res) {
      console.log(res);
    }).catch(function (error) {
      alert(error);
    });

    return ( <BoxScoreList /> );
  }

});

module.exports = App;
