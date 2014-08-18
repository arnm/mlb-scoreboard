var React = require('react');
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
      return <h3 className='text-center'>Loading...</h3>;
    }
    return (
        <table key={this.state.boxScore} className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Team</th>
              {boxScore.header.map(function (header) {
                return <th>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href={boxScore.away.teamLink}>{boxScore.away.name}</a></td>
              {boxScore.away.line.map(function (data) {
                return <td>{data}</td>;
              })}
            </tr>
            <tr>
              <td><a href={boxScore.home.teamLink}>{boxScore.home.name}</a></td>
              {boxScore.home.line.map(function (data) {
                return <td>{data}</td>;
              })}
            </tr>
          </tbody>
        </table>
    );
  }

});

module.exports = BoxScore;
