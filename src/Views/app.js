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

    var HomePage = require('../src/Views/home-page.js');
    var CongratsPage = require('../src/Views/congratulations-page.js');
    var FinalPage = require('../src/Views/final-page.js');
    var FriendsPage = require('../src/Views/friends-page.js');

    window.fbAsyncInit = function() {
    FB.init({
      appId      : '886963431348171', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      oauth      : true, // enable OAuth 2.0
      xfbml      : true  // parse XFBML
    });    

  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "lib/facebookandsearsapi/scripts/all.js";
     d.getElementsByTagName('head')[0].appendChild(js);
   }(document));

    var App = function() {

      var self = this;

      this.mainContext = Engine.createContext();

      this.renderController = new RenderController();

      this.mainContext.add(this.renderController);

      this.home = new HomePage();
      this.finalPage = null;
      this.congratsPage = null;
      this.friendsPage = new FriendsPage();

      this.congratsPage = new CongratsPage();

      this.showHome();

    }

    App.prototype.showHome = function() {

      var transition = {
        method: SnapTransition,
        period: 300,
        dampingratio: .8,
        velocity: 0
      }

      var self = this;
      var view = new View();

      view.add(this.home.getView());

      this.renderController.show(view);

      this.home.getView().on('spin', function() {
        self.renderController.show(self.congratsPage.getView());
      });

      this.congratsPage.getView().on('no-share', function() {
        self.finalPage = new FinalPage();
        self.renderController.show(self.finalPage.getView());
      });

      this.congratsPage.getView().on('share', function() {
        self.renderController.show(self.friendsPage.getView());
      });

      this.friendsPage.getView().on('continue', function() {
        self.finalPage = new FinalPage();
        self.renderController.show(self.finalPage.getView());
      });

    }

    module.exports = App;
});


