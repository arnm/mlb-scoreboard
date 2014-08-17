/**
 * @jsx React.DOM
 */

var React = require('react');
var scrape = require('../scrape');

var BoxScore = React.createClass({

  getInitialState: function () {
    return {
      boxScore: {
        header: [],
        home: {
          name: '',
          line: []
        },
        away: {
          name: '',
          line: []
        }
      }
    };
  },

  componentDidMount: function () {
    this.updateBoxScore();
  },

  updateBoxScore: function () {
    var self = this;
    scrape.getBoxScore(self.props.url).then(function (boxScore) {
      self.setState({boxScore: boxScore});
    });
  },

  render: function() {
    return (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              {this.state.boxScore['header'].map(function (header) {
                return <th>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.boxScore['away']['name']}</td>
              {this.state.boxScore['away']['line'].map(function (data) {
                return <td>{data}</td>;
              })}
            </tr>
            <tr>
              <td>{this.state.boxScore['home']['name']}</td>
              {this.state.boxScore['home']['line'].map(function (data) {
                return <td>{data}</td>;
              })}
            </tr>
          </tbody>
        </table>
    );
  }

});

module.exports = BoxScore;
