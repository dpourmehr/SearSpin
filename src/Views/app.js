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
    var StateModifier = require('famous/modifiers/StateModifier');

    var Login = require('./../../src/Views/login-page');
    var Profile = require('./../../src/Views/profile-page');

    var App = function() {

      var self = this;

      this.mainContext = Engine.createContext();
      this.mainContext.setPerspective(3000);
      this.renderController = new RenderController();

	this.loginPage = new Login(this.renderController);


      this.mainContext.add(new Modifier({origin: [0, 0.5]})).add(this.renderController);

      this.showLogin();
    }

    App.prototype.showLogin = function() {
      var transition = {
        method: SnapTransition,
        period: 300,
        dampingratio: .8,
        velocity: 0
      }
      var self = this;
      var view = new View();

      this.loginModifier = new Modifier({
        origin: [0.25, 0.5],
        transform: Transform.translate(1000, 0, 0)
      });

      view.add(this.loginModifier).add(this.loginPage.getView()[0]);

      var logoView = new View();
      
	var spinningCircle = new Surface({
		size: [650, 650],
		content: '<img src="http://s30.postimg.org/dsiagqdv5/img_thing.png" width="650px" height="650px">'
	});

	var initTime = Date.now();
	var spinner = new Modifier({
		origin: [0.5, 0.5],
		transform: function() {
			return Transform.rotateZ(.0004 * (Date.now() - initTime));
		}
	});

	logoView.add(spinner).add(spinningCircle);
	
	var logoSurface = new Surface({
		size: [600, 250],
		content: '<img src="http://s29.postimg.org/h9wpf8uw7/physica.png">'
	});

	logoView.add(new Modifier({origin: [0.5, 0.5], transform: Transform.scale(.8, .8, 1)})).add(logoSurface);

	view.add(new Modifier({transform: Transform.translate(400, 0, 0)})).add(logoView);

      this.loginModifier.setTransform(Transform.translate(0, 0, 0), {method: SnapTransition, period: 600, velocity: 0, dampingRatio: .6});
      this.renderController.show(view);
    }

    module.exports = App;
});


