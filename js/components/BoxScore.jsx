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
      return (
        <h3 className='text-center'>
          <span className='glyphicon glyphicon-refresh spin'></span>
        </h3>
      );
    }
    return (
        <table key={this.state.boxScore} className='table table-striped'>
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
        </table>
    );
  }

});

module.exports = BoxScore;
