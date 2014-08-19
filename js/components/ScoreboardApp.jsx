var React = require('react');
var M = require('moment');
var Grid = require('react-bootstrap/Grid');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var Scoreboard = require('./Scoreboard.jsx');

var ScoreboardApp = React.createClass({

  render: function() {

    var footer =
    <footer className='text-center bottom-buffer'>
      <Row>
        <Col>
          <div>
            <Glyphicon glyph='copyright-mark'/>
            <span className='text-horizontal-buffer'>{M().toDate().getFullYear()}</span>
            <a target='_blank' href='http://alexeinunez.com'>Alexei Nunez</a>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <a target='_blank' href="https://github.com/arnm/mlb-scoreboard">GitHub</a>
        </Col>
      </Row>
      <Row>
        <Col>
          <a target='_blank' href="http://baseball-reference.com">Data</a>
        </Col>
      </Row>
    </footer>;

    return (
      <Grid>
        <Scoreboard />
        <div className='horizontal-divider bottom-buffer'></div>
        {footer}
      </Grid>
    );

  }

});

module.exports = ScoreboardApp;
