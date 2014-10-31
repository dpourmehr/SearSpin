/* globals define */
define(function(require, exports, module) {
    'use strict';

    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');


    var DataWidget = function(options) {
    	var self = this;

    	this.options = options || {};

    	this.layoutItems = [];

    	this.layout = new SequentialLayout({direction: 0, itemSpacing: 0});

    	this.layout.sequenceFrom(this.layoutItems);

    	this.steps = this.options.steps || 0;
    	this.caloriesBurned = this.options.calories || 0;
    	this.distance = this.options.distance || 0;

    	this.month = this.options.month || "October";
    	this.day = this.options.day || 1;


    	this.widget = new View();

    	this.createWidget()
    }

    DataWidget.prototype.getWidget = function() {
    	return this.widget;
    }

    DataWidget.prototype.createWidget = function() {
    	var self = this;

    	var dateSurface = new Surface({
    		size: [200, 350],
    		content: this.month + "/" + "<br>&nbsp;&nbsp;&nbsp;&nbsp;<u>" + this.day + "</u>",
    		classes: ['date-surface']
    	});

    	var mainPostArea = new View({
    		size: [950, 350]
    	});

    	var mainPostAreaSurface = new Surface({
    		size: [950, 350],
    		content: '',
    		classes: ['main-post-area']
    	});

    	mainPostArea.add(new Modifier({origin: [0.5, 0.5]})).add(mainPostAreaSurface);

    	var insideLayout = new SequentialLayout({direction: 1, itemSpacing: 0});
    	var insideItems = [];

    	insideLayout.sequenceFrom(insideItems);

    	var insideSurface = new Surface({
    		size: [850, 250],
    		content: '',
    		classes: ['inside-post-surface']
    	});

    	insideItems.push(new View().add(new Modifier({origin: [0.5, 0.5], transform: Transform.translate(0, 0, 0)})).add(insideSurface));

    	var sliderLayout = new SequentialLayout({direction: 0});
    	var buttons = [];

    	var facebook = new Surface({
    		size: [50, 50],
    		content: '<img src="../content/images/facebook.png">',
    		classes: ['social-buttons']
    	});

    	var twitter = new Surface({
    		size: [50, 50],
    		content: '<img src="../content/images/twitter.png">',
    		classes: ['social-buttons']
    	});

    	var tumblr = new Surface({
    		size: [50, 50],
    		content: '<img src="../content/images/tumblr.png">',
    		classes: ['social-buttons']
    	});

    	var buttonsModifier = new Modifier({
    		transform: Transform.scale(0, 0, 0)
    	});

    	buttons.push(facebook);
    	buttons.push(twitter);
    	buttons.push(tumblr);

    	var buttonsView = new View();

    	buttonsView.add(buttonsModifier).add(sliderLayout);

    	insideSurface.on('mouseenter', function() {
    		buttonsModifier.setTransform(Transform.translate(0, 40, -20), {duration: 200});
    	});

    	insideSurface.on('mouseleave', function() {
    		buttonsModifier.setTransform(Transform.scale(0, 0, 0), {duration: 200});
    	});

    	sliderLayout.sequenceFrom(buttons);

    	insideItems.push(buttonsView);


    	mainPostArea.add(new Modifier({origin: [0.5, 0.5]})).add(insideLayout);

    	var leftSide = new View();

    	var mainDataLayout = new SequentialLayout({direction: 0, itemSpacing: 0});
    	var mainDataItems = [];

    	mainDataLayout.sequenceFrom(mainDataItems);

    	var leftSurface = new Surface({
    		size: [350, 220],
    		content: 'THIS IS A GRAPH',
    		classes: ['left-surface']
    	});

    	var fadeModifier = new Modifier({
    		opacity: 0
    	});

    	leftSide.add(fadeModifier).add(leftSurface);

    	//mainDataItems.push(leftSide);

    	var rightSide = new View();

    	fadeModifier.setOpacity(1, {duration: 3000});

	var rightSide = new View();

    	var rightSurface = new Surface({
    		size: [150, 150],
    		content: '<img src="http://s21.postimg.org/5yghpqlhj/img_thing.png" width="150px" height="150px">'
       	});

    	var initialTime = Date.now();
    	var spinner = new Modifier({
    		transform: function() {
    			return Transform.multiply(Transform.translate(250, 0, 0), Transform.rotateZ(0.0008 * (Date.now() - initialTime)));
    		}
    	});

    	rightSide.add(spinner).add(rightSurface);

    	var info = new Surface({
    		size: [350, 250],
    		content: 'Steps: 3214<br>Calories Burned: 31232<br>Distance: 9.3 Miles',
    		properties: {
    			fontSize: '20pt',
    			lineHeight: '70px',
    			marginTop: '70px',
    			fontWeight: '400'
    		}
    	});

    	var modifier = new Modifier({
    		origin: [0.3, 0]
    	});

    	mainPostArea.add(modifier).add(info);

	mainPostArea.add(new Modifier({origin: [0.5, 0.5]})).add(rightSide);
	
    	this.layoutItems.push(dateSurface);
    	this.layoutItems.push(mainPostArea);



    	this.widget.add(this.layout);

    }

    module.exports = DataWidget;

});

