/**
 * @jsx React.DOM
 */

var scrape = require('./scrape');
var App = require('./components/App');

var React = require('react');

window.onload = function () {

  scrape.getSeasonGamedays(new Date().getFullYear()).then(function (gamedays) {
    gamedays.map(scrape.getGamedayBoxScores).map(function (gamedayPromise) {
      gamedayPromise.then(function (boxscores) {
        console.log(boxscores);
      });
    });
  });

  React.renderComponent( <App /> , document.body);
}
