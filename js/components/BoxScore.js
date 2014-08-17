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
      self.setState({
        boxScore: boxScore
      });
    });
  },

  render: function() {
    return (
        <table className='table table-bordered table-striped'>
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
              <td><a href={this.state.boxScore['away']['teamLink']}>{this.state.boxScore['away']['name']}</a></td>
              {this.state.boxScore['away']['line'].map(function (data) {
                return <td>{data}</td>;
              })}
            </tr>
            <tr>
              <td><a href={this.state.boxScore['home']['teamLink']}>{this.state.boxScore['home']['name']}</a></td>
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
