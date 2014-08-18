var React = require('react');
var Scoreboard = require('./components/Scoreboard.jsx');

window.onload = function () {
  React.renderComponent( <Scoreboard /> , document.getElementById('app'));
};
