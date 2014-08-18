var React = require('react');
var M = require('moment');

var BoxScoreList = require('./BoxScoreList.jsx');
var scrape = require('../scrape');

var Scoreboard = React.createClass({

  getInitialState: function () {
    return {
      boxScoreDate: M(new Date()).subtract(1, 'days').toDate(),
      boxScoreUrls: null
    };
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

  updateBoxScoreUrls: function () {
    var self = this;
    scrape.getGamedayForDate(self.state.boxScoreDate).then(function (gameday) {
      return scrape.getGamedayBoxScores(gameday);
    }).then(function (boxScoreUrls) {
      self.setState({
        boxScoreUrls: boxScoreUrls
      });
    }).catch(function (error) {
      console.log(error);
      self.setState({
        boxScoreUrls: []
      });
    });
  },

  render: function () {
    return (
      <div>

        <div className='text-center'>
          <h2>{M(this.state.boxScoreDate).format('dddd, MMMM Do, YYYY')}</h2>
        </div>

        <div className="row">
          <div className='col-xs-6 col-xs-push-3 col-md-6 col-md-push-3'>
            <div id='datepicker' className='input-group date'>
              <input type="text" className='form-control'/>
              <span className='input-group-addon'>
                <i className='glyphicon glyphicon-th'></i>
              </span>
            </div>
          </div>
        </div>

        <br />

        {
          !this.state.boxScoreUrls ?
          <h1 className='text-center'>
            <span className='glyphicon glyphicon-refresh spin'></span>
          </h1> :
          <BoxScoreList key={this.state.boxScoreUrls} urls={this.state.boxScoreUrls} />
        }

      </div>

    );
  }

});

module.exports = Scoreboard ;
