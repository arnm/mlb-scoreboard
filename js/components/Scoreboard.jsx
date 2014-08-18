var React = require('react');

var BoxScoreList = require('./BoxScoreList.jsx');
var scrape = require('../scrape');

var Scoreboard = React.createClass({

  getInitialState: function () {
    console.log('Initial State');
    return {
      boxScoreDate: new Date('2014-08-04'),
      boxScoreUrls: null
    };
  },

  componentWillMount: function () {
    console.log('Will Mount');
    this.updateBoxScoreUrls();
  },

  componentDidMount: function () {
    console.log('Did Mount');
    this.initializeDatePicker();
  },

  updateBoxScoreDate: function (changeDateEvent) {
    console.log('Update BoxScore Date');
    this.setState({boxScoreDate: changeDateEvent.date});
    this.updateBoxScoreUrls();
  },

  initializeDatePicker: function () {
    console.log('Initialize Picker');
    $('#datepicker').datepicker('setUTCDate', this.state.boxScoreDate);
    $('#datepicker').datepicker().on('changeDate', this.updateBoxScoreDate);
  },

  updateBoxScoreUrls: function () {
    console.log('Update BoxScore urls');
    var self = this;
    scrape.getGamedayForDate(self.state.boxScoreDate).then(function (gameday) {
      return scrape.getGamedayBoxScores(gameday);
    }).then(function (boxScoreUrls) {
      self.setState({
        boxScoreUrls: boxScoreUrls
      });
    }).catch(function (error) {
      self.setState({
        boxScoreUrls: []
      });
    });
  },

  render: function () {
    console.log('Render');
    return (
      <div>
        <input id="datepicker" className="form-control" />
        { !this.state.boxScoreUrls ?
          <h1 className='text-center'>Loading...</h1> :
          <BoxScoreList key={this.state.boxScoreUrls} urls={this.state.boxScoreUrls} />
        }
      </div>
    );
  }

});

module.exports = Scoreboard ;
