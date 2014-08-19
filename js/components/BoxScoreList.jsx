var React = require('react');
var Alert = require('react-bootstrap/Alert');
var BoxScore = require('./BoxScore.jsx');

var BoxScoreList = React.createClass({

  render: function () {

    var noDataAlert =
      <Alert bsStyle='danger' className='top-buffer'>
        <h4>No data available for this date</h4>
        <p>Please select a different date with the date picker above.</p>
      </Alert>;

    // display alert if there is not urls
    if (!this.props.urls.length) {
      return noDataAlert;
    }

    var boxScores =
    <div className='top-buffer'>
      {
        this.props.urls.map(function (url) {
                    return <BoxScore url={url} />;
                  })
      }
    </div>;

    return boxScores;
  }

});

module.exports = BoxScoreList;
