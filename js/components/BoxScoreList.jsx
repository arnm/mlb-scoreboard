var React = require('react');
var BoxScore = require('./BoxScore.jsx');

var BoxScoreList = React.createClass({

  render: function () {
    if (this.props.urls.length === 0) {
      return <h1 className='text-center'>NO AVAILABLE DATA FOR THIS DAY!</h1>;
    }
    return (
      <div>
        {this.props.urls.map(function (url) {
            return <BoxScore url={url} />;
        })}
      </div>
    );
  }

});

module.exports = BoxScoreList;
