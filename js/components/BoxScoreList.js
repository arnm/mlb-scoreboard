/**
 * @jsx React.DOM
 */

var React = require('react');
var BoxScore = require('./BoxScore')

var BoxScoreList = React.createClass({

  render: function () {
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
