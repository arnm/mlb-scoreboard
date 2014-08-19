var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Panel = require('react-bootstrap/Panel');
var Table = require('react-bootstrap/Table');

var scrape = require('../scrape');

var BoxScore = React.createClass({

  getInitialState: function () {
    return {
      boxScore: null
    };
  },

  componentWillMount: function () {
    this.updateBoxScore();
  },

  updateBoxScore: function () {
    var self = this;
    scrape.getBoxScore(self.props.url).then(function (boxScore) {
      self.setState({
        boxScore: boxScore
      });
    });
  },

  render: function() {
    var boxScore = this.state.boxScore;

    if(!boxScore){
      return (
        <h3 className='text-center'>
          <Glyphicon glyph='refresh' className='spin' />
        </h3>
      );
    }

    var boxScoreTable =
      <Table striped condensed>
        <thead>
          <tr>
            <th></th>
            {
              boxScore.header.map(function (header) {
                return <th>{header}</th>;
              })
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a target='_blank' href={boxScore.away.teamLink}>{boxScore.away.name}</a></td>
            {
              boxScore.away.line.map(function (data) {
                return <td>{data}</td>;
              })
            }
          </tr>
          <tr>
            <td><a target='_blank' href={boxScore.home.teamLink}>{boxScore.home.name}</a></td>
            {
              boxScore.home.line.map(function (data) {
                return <td>{data}</td>;
              })
            }
          </tr>
        </tbody>
      </Table>;

    var boxScoreTableFooter =
      <a target='_blank' href={this.props.url}>Game Summary</a>;

    return (
      <Panel footer={boxScoreTableFooter}>
        {boxScoreTable}
      </Panel>
    );
  }

});

module.exports = BoxScore;
