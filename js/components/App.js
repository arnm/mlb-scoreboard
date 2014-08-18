/**
 * @jsx React.DOM
 */

var React = require('react');

var BoxScoreList = require('./BoxScoreList');
var scrape = require('../scrape');

var App = React.createClass({

  getInitialState: function () {
    return {
      boxScoreDate: new Date('2014-08-04'),
      boxScoreUrls: []
    }
  },

  componentWillMount: function () {
    this.updateBoxScoreUrls();
  },

  componentDidMount: function () {
    this.initializeDatePicker();
  },

  updateBoxScoreDate: function (changeDateEvent) {
    this.setState({boxScoreDate: changeDateEvent.date});
    this.updateBoxScoreUrls();
  },

  initializeDatePicker: function () {
    $('#datepicker').datepicker('setUTCDate', this.state.boxScoreDate);
    $('#datepicker').datepicker().on('changeDate', this.updateBoxScoreDate);
  },

  updateBoxScoreUrls: function() {
    var self = this;
    scrape.getGamedayForDate(self.state.boxScoreDate).then(function (gameday) {
      return scrape.getGamedayBoxScores(gameday);
    }).then(function (boxScoreUrls) {
      console.log('Before: ' + self.state.boxScoreUrls);
      self.setState({boxScoreUrls: boxScoreUrls});
      console.log('After: ' + self.state.boxScoreUrls);
    }).catch(function (error) {
      console.log(error);
    });
  },

  render: function () {
    return (
      <div>
        <input id="datepicker" className="form-control" />
        <BoxScoreList urls={this.state.boxScoreUrls} />
      </div>
    );
  }

});

module.exports = App;
