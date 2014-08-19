var React = require('react');
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
            <span className='horizontal-buffer'>2014</span>
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
        {footer}
      </Grid>
    );

  }

});

module.exports = ScoreboardApp;
