var React = require('react');
var ScoreboardApp = require('./components/ScoreboardApp.jsx');

window.onload = function () {
  React.renderComponent(
    <ScoreboardApp />,
    document.getElementById('app'));
};
