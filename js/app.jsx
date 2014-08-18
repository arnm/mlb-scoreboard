var React = require('react');
var Scoreboard = require('./components/Scoreboard.jsx');

window.onload = function () {
  React.renderComponent(
    <div>
      <Scoreboard />
    </div>,
    document.getElementById('app'));
};
