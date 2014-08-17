/**
 * @jsx React.DOM
 */

var React = require('react');

var BoxScoreList = require('./BoxScoreList');
var scrape = require('../scrape');

var App = React.createClass({

  getInitialState: function () {
    return {
      boxScoreDate: new Date(2014, 7, 15, 0, 0, 0, 0),
      boxScoreUrls: []
    }
  },

  componentDidMount: function () {
    this.updateBoxScoreUrls();
  },

  updateBoxScoreUrls: function() {
    var self = this;
    scrape.getGamedayForDate(self.state.boxScoreDate).then(function (gameday) {
      return scrape.getGamedayBoxScores(gameday);
    }).then(function (boxScoreUrls) {
      self.setState({boxScoreUrls: boxScoreUrls});
    }).catch(function (error) {
      console.log(error);
    });
  },

  render: function () {
    return ( <BoxScoreList urls={this.state.boxScoreUrls} /> );
  }

});

module.exports = App;
