/**
 * @jsx React.DOM
 */

var React = require('react');
var BoxScore = require('./BoxScore')

var BoxScoreList = React.createClass({

  render: function () {
    return ( <BoxScore /> );
  }

});

module.exports = BoxScoreList;
