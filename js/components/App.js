/**
 * @jsx React.DOM
 */

var React = require('react');
var BoxScoreList = require('./BoxScoreList');

var App = React.createClass({

  render: function() {
    return (
      <BoxScoreList />
    );
  }

});

module.exports = App;
