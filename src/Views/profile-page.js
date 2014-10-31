/* globals define */
define(function(require, exports, module) {
    'use strict';

    var Surface = require('famous/core/Surface');
    var Engine = require('famous/core/Surface');
    var View = require('famous/core/View');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var InputSurface = require('famous/surfaces/InputSurface');
    var Modifier = require('famous/core/Modifier');
    var ScrollContainer = require('famous/views/ScrollContainer');
    var Utility = require('famous/utilities/Utility');
    var Transform = require('famous/core/Transform');
    var SnapTransition = require('famous/transitions/SnapTransition');
    var Easing = require('famous/transitions/Easing');

    var DataWidget = require('./../../src/Views/data-widget');

    var Profile = function(context) {

    	var self = this;

    	this.mainView = new View();

    	this.profileItems = [];

    	this.profileLayout = new SequentialLayout({direction: 1, itemSpacing: 10});

    	this.profileLayout.sequenceFrom(this.profileItems);

    	this.mainView.add(new Modifier({origin: [0.5, 0]})).add(this.profileLayout);

    	this.showProfile();

    }

    Profile.prototype.getView = function() {
    	return this.mainView;
    }

    Profile.prototype.showProfile = function() {
    	var self = this;

    	var header = new View({
    		size: [1288, 250]
    	});

    	var headerBackground = new Surface({
    		size: [1288, 250],
    		content: '<img src="../content/images/header-background.png">',
    		classes: ['header-background']
    	});

    	header.add(new Modifier({opacity: 1})).add(headerBackground);

    	var headerLayout = new SequentialLayout({direction: 0, itemSpacing: 20});

    	var headerItems = [];

    	headerLayout.sequenceFrom(headerItems);

    	var profilePicture = new Surface({
    		size: [200, 200],
    		content: '<img src="../content/images/dramatic.jpeg" width="200px" height="200px">',
    		classes: ['profile-picture']
    	});

    	var profilePictureView = new View({
    		size: [300, 250]
    	});

    	profilePictureView.add(new Modifier({
    		origin: [0, 0.1]
    	})).add(profilePicture);

    	headerItems.push(profilePictureView);

    	var usernameView = new View({
    		size: [250, 250]
    	});

    	usernameView.add(new Modifier({
    		origin: [0, 1]
    	})).add(profileUser);

    	var profileUser = new Surface({
    		size: [250, 50],
    		content: 'Darien Pourmehr',
    		classes: ['profile-user']
    	});

    	usernameView.add(new Modifier({
    		origin: [0, .9]
    	})).add(profileUser);

    	headerItems.push(usernameView);

    	var logoView = new View();

    	var logoSurface = new Surface({
    		size: [800, 250],
    		content: '<img src="../content/images/misfit.png" width="600" height="200">',
    		classes: ['header-logo']
    	});

    	logoView.add(new Modifier({origin: [0.2, 0]})).add(logoSurface);

    	headerItems.push(logoView);

    	header.add(headerLayout);

    	this.profileItems.push(header);

    	var test = new View();
    	var modify = new Modifier({
    		transform: Transform.translate(0, 1000, 0)
    	});

    	test.add(modify).add(this.getMainArea());

    	this.profileItems.push(test);

    	modify.setTransform(Transform.translate(0, 0, 0), {duration: 500, curve: 'easeInOut'});

    }

    Profile.prototype.getMainArea = function() {
    	var self = this;

    	var scroller = new ScrollContainer({scrollview: {direction: Utility.Direction.Y, clipSize: 600}});
    	scroller.container.setSize([1500, 800]);
    	var widgets = [];

    	scroller.sequenceFrom(widgets);

    	var firstWidget = new DataWidget();
    	var secondWidget = new DataWidget();
    	var thirdWidget = new DataWidget();
    	var fourthWidget = new DataWidget();
    	var fifthWidget = new DataWidget();
    	var sixthWidget = new DataWidget();

    	widgets.push(firstWidget.getWidget());
    	widgets.push(secondWidget.getWidget());
    	widgets.push(thirdWidget.getWidget());
    	widgets.push(fourthWidget.getWidget());
    	widgets.push(fifthWidget.getWidget());
    	widgets.push(sixthWidget.getWidget());

    	firstWidget.getWidget().pipe(scroller);
    	secondWidget.getWidget().pipe(scroller);
    	thirdWidget.getWidget().pipe(scroller);
    	fourthWidget.getWidget().pipe(scroller);
    	fifthWidget.getWidget().pipe(scroller);
    	sixthWidget.getWidget().pipe(scroller);    	
    	return scroller;
    }

    Profile.prototype.addListener = function(surface) {
    	var self = this;

    }

    module.exports = Profile;
});

