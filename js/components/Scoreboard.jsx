var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var M = require('moment');

var BoxScoreList = require('./BoxScoreList.jsx');
var scrape = require('../scrape');

var Scoreboard = React.createClass({

  getInitialState: function () {
    return {
      boxScoreDate: M().subtract(1, 'days').toDate(),
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
    $('#datepicker').datepicker('setDate', this.state.boxScoreDate);
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
     // ensure date picker calendar is hidden after date change
    $('#datepicker').datepicker('hide');

    var dateString = M(this.state.boxScoreDate).format('dddd, MMMM Do, YYYY');

    var datePicker =
      <Row>
        <Col xs={8} xsPush={2} md={8} mdPush={2}>
          {/* Need fine grain control for datepicker to work */}
          <div id='datepicker' className='input-group date'>
            <input type="text"
              className='form-control'
              value={dateString}
              disabled/>
            <span className='input-group-addon'>
              <Glyphicon glyph='th' />
            </span>
          </div>
        </Col>
      </Row>;

    var boxScoreList =
      !this.state.boxScoreUrls ?
      <h1 className='text-center'>
        <Glyphicon glyph='refresh' className='spin' />
      </h1> :
      <BoxScoreList
        key={this.state.boxScoreUrls}
        urls={this.state.boxScoreUrls}/>;

    return (
      <div className='top-buffer'>
        {datePicker}
        {boxScoreList}
      </div>
    );

  }
});

module.exports = Scoreboard ;
