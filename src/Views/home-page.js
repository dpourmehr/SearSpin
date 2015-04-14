/* globals define */
define(function(require, exports, module) {
	'use strict';
	// import dependencies
	var Engine = require('famous/core/Engine');
	var Modifier = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
	var TransitionableTransform = require('famous/transitions/TransitionableTransform');
	var View = require('famous/core/View');
	var GridLayout = require('famous/views/GridLayout');
	var RenderController = require('famous/views/RenderController');
	var Surface = require('famous/core/Surface');
	var Easing = require('famous/transitions/Easing');
	var Flipper = require('famous/views/Flipper');
	var SpringTransition = require('famous/transitions/SpringTransition');
	var SnapTransition = require('famous/transitions/SnapTransition');
	var SpringTransition = require('famous/transitions/SpringTransition');
	var StateModifier = require('famous/modifiers/StateModifier');

	var SpinningWidget = require('../Views/spinning-widget.js');

	var HomePage = function() {

	  var self = this;

	  this.mainView = new View();

	  this.initHome();
	}

	HomePage.prototype.getView = function() {
	  return this.mainView;
	}

	HomePage.prototype.initHome = function() {
	  var self = this;

	  this.addtitle();

	  this.addCircle();

	}

	HomePage.prototype.addCircle = function() {
	  var self = this;

	  var spinGame = new SpinningWidget();

	  var circleWidgetModifier = new Modifier({
		origin: [0.5, 0],
		transform: Transform.translate(0, 200, 0)
	  });

	  this.mainView.add(circleWidgetModifier).add(spinGame.getView());

	  spinGame.getView().on('spin', function() {
		self.mainView._eventOutput.emit('spin');
	  });

	  //circleWidgetModifier.setTransform(Transform.scale(1), {method: SnapTransition, period: 500, dampingRatio: .5})
	}

	HomePage.prototype.addtitle = function() {
	  var self = this;

	  var titleSurface = new Surface({
		size: [true, true],
		content: '<img src="./content/images/header.svg" width="60%">',
		classes: ['home-title']
	  });

	  var titleModifier = new Modifier({
		origin: [0.5, 0],
		transform: Transform.translate(-100, 60, 0)
	  });

	  this.mainView.add(titleModifier).add(titleSurface);

	  titleModifier.setTransform(Transform.translate(0, 60, 0), {curve: Easing.outExpo, duration: 1300});
	}

	module.exports = HomePage;
});


