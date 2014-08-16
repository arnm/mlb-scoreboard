/**
 * @jsx React.DOM
 */

var React = require('react');
var App = require('./components/App');

window.onload = function () {
  React.renderComponent( <App /> , document.getElementById('app'));
}
