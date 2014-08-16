/**
 * @jsx React.DOM
 */

var React = require('react');

var BoxScore = React.createClass({
  render: function() {
    return (
      <a href={this.props.url}> {this.props.url} </a>
    );
  }

});

module.exports = BoxScore;
