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
	var SequentialLayout = require('famous/views/SequentialLayout');
	var SnapTransition = require('famous/transitions/SnapTransition');
	var SpringTransition = require('famous/transitions/SpringTransition');
	var StateModifier = require('famous/modifiers/StateModifier');

	var SpinningWidget = function() {

	  var self = this;

	  this.selectedCategories = [];

	  this.buttonView = new View();
	  this.buttonEnabled = false;

	  this.mainView = new View();

	  this.count = 0;

	  this.initGame();
	}

	SpinningWidget.prototype.getView = function() {
	  return this.mainView;
	}

	SpinningWidget.prototype.initGame = function() {
	  var self = this;

	  var topGameModifier = new Modifier({
		//origin: [0.65, 0.2],
		transform: Transform.multiply(Transform.translate(100, 0, 0), Transform.scale(1, 1, 1))
	  });

	  var mainLayout = new SequentialLayout({direction: 0, itemSpacing: 150});
	  var mainItems = [];
	  mainLayout.sequenceFrom(mainItems);

	  var titleView = new View();
	  titleView.add(topGameModifier).add(this.chooseInterests());
	  topGameModifier.setTransform(Transform.multiply(Transform.translate(0, 0, 0), Transform.scale(1, 1, 1)), {curve: Easing.outExpo, duration: 800});

	  var wheelButtonModifier = new Modifier({
		origin: [0, 0]
	  });

	  var bottomGameModifier = new Modifier({
		origin: [0.5, 0.5],
		align: [0.5, 0.5],
		transform: Transform.multiply(Transform.translate(0, 0, 0), Transform.scale(0, 0, 1))
	  });

	  //this.mainView.add(bottomGameModifier).add(this.showSpinGame());

	  setTimeout(function() {
		 bottomGameModifier.setTransform(Transform.multiply(Transform.rotateZ(Math.PI), Transform.multiply(Transform.translate(0, 0, 0), Transform.scale(1.3, 1.3, 1))), {curve: Easing.outExpo, duration: 700, dampingRatio: .8});;   
	  }, 300);

	  var wheelLayout = new SequentialLayout({direction: 1, itemSpacing: 40});
	  var wheelItems = [];
	  wheelLayout.sequenceFrom(wheelItems);

	  var wheelView = new View();
	  wheelView.add(bottomGameModifier).add(this.showSpinGame());

	  wheelItems.push(wheelView);

	  var surface = new Surface({
		size: [200, 50],
		content: 'Spin-To-Win',
		classes: ['spin-button']
	  });

	  this.addListeners(surface, surface.getContent());

	  var surfaceModifier = new Modifier({
		origin: [0.5, 0.45]
	  });

	  this.buttonView.add(surfaceModifier).add(surface);

	  surfaceModifier.setOpacity(0);

	  this.buttonView.on('enable', function() {
		self.buttonEnabled = true;
		surfaceModifier.setOpacity(1, {duration: 1000});
	  });

	  this.buttonView.on('disable', function() {
		self.buttonEnabled = false;
		surfaceModifier.setOpacity(0, {duration: 500});
	  })

	  wheelItems.push(this.buttonView);

	  var wheelView = new View();
	  wheelView.add(wheelLayout);

	  mainItems.push(wheelView);
	  mainItems.push(titleView);

	  var mainModifier = new Modifier({
		origin: [.5, 0],
		transform: Transform.scale(.8, .8, 1)
	  });

	  this.mainView.add(mainModifier).add(mainLayout);

	}

	SpinningWidget.prototype.showSpinGame = function() {
	  var self = this;

	  var spinView = new View();
	  var spinModifier = new Modifier({
		// origin: [0.5, 0]
	  });

	  var wheel = new Surface({
		size: [297, 297],
		content: '<img src="../SearSpin/content/images/wheel.svg" width="297px">',
		classes: ['spin-wheel']
	  });

	  spinView.add(spinModifier).add(wheel);

	  return spinView;



	}

	SpinningWidget.prototype.chooseInterests = function() {
	  var self = this;

	  var buttonTitles = ["Appliances", "Auto", "Baby", "Clothing & Shoes", "Fitness", "Outdoor", "Home", "Parts & Services", "Tools", "Toys"];

	  var surfaces = [];

	  for(var i = 0; i < 10; i++) {
		var button = new Surface({
		  size: [150, 150],
		  content: buttonTitles[i],
		  classes: ['category-button']
		});
		if(button.getContent() == 'Clothing & Shoes' || button.getContent() == 'Parts & Services') button.setProperties({
		  lineHeight: 'normal',
		  paddingTop: '50px'
		});
		if(button.getContent() == '') {
		  button.setProperties({
			//backgroundImage: 'url("content/images/dot.png")',
			backgroundColor: '#15284c',
			borderRadius: '30px'
		  });
		}
		surfaces.push(button);
		this.addListeners(button);
	  }

	  var column1 = new SequentialLayout({direction: 1, itemSpacing: 5});
	  var column2 = new SequentialLayout({direction: 1, itemSpacing: 5});
	  //var column3 = new SequentialLayout({direction: 1, itemSpacing: 5});

	  var col1Items = [];
	  var col2Items = [];
	  //var col3Items = [];

	  column1.sequenceFrom(col1Items);
	  column2.sequenceFrom(col2Items);
	  //column3.sequenceFrom(col3Items);

	  for(var i = 0; i < 5; i++) {
		col1Items.push(surfaces[i]);
	  }

	  for(var i = 5; i < 10; i++) {
		col2Items.push(surfaces[i]);
	  }

	  // for(var i = 8; i < 12; i++) {
	  //   col3Items.push(surfaces[i]);
	  // }

	  var mainLayout = new SequentialLayout({
		direction: 0,
		itemSpacing: 5
	  });
	  var mainItems = [];

	  mainLayout.sequenceFrom(mainItems);

	  mainItems.push(column1);
	  mainItems.push(column2);
	  //mainItems.push(column3);

	  var topBottomLayout = new SequentialLayout({direction: 1, itemSpacing: 10});
	  var topBottomItems = [];
	  topBottomLayout.sequenceFrom(topBottomItems);

	  var categoryInstructions = new Surface({
		size: [300, 50],
		content: 'Categories (Select 3 to spin)',
		classes: ['categories-instruction']
	  });

	  topBottomItems.push(categoryInstructions);
	  topBottomItems.push(mainLayout);

	  return topBottomLayout;

	}

	SpinningWidget.prototype.addListeners = function(surface, name) {
	  var self = this;

	  surface.on('mouseenter', function() {
		if(surface.getContent() == 'Spin-To-Win') {
		  this.setProperties({
			cursor: 'default'
		  });
		  if(self.buttonEnabled == false) {
			return;
		  }
		}
		if(this.getProperties().opacity == .3) {}
		else { 
		  this.setProperties({
			// backgroundColor: '#fff',
			// color: '#444',
			cursor: 'pointer',
			opacity: '.8'
		  });
		}
	  });

	  surface.on('mouseleave', function() {
		if(surface.getContent() == 'Spin-To-Win') {
		  if(self.buttonEnabled == false) {
			return;
		  }
		}
		if(this.getProperties().opacity == .3) {}
		else { 
		  this.setProperties({
			cursor: 'initial',
			opacity: '1'
		});
	  }
	  });

	  surface.on('click', function() {
		if(surface.getContent() == 'Spin-To-Win') {
		  localStorage.setItem('categories', self.selectedCategories);
		  self.mainView._eventOutput.emit('spin');
		  if(self.buttonEnabled == false) {
			return;
		  }
		}
		if(this.getProperties().opacity == .3) {
		  var temp = [];
		  for(var i = 0; i < self.selectedCategories.length; i++) {
			console.log(self.selectedCategories[i]);
			if(self.selectedCategories[i] == this.getContent()) {
			  continue;
			}
			temp.push(self.selectedCategories[i]);
		  }
		  self.selectedCategories = temp;
		  self.buttonView._eventOutput.emit('disable');
		  this.setProperties({
			opacity: '1'
		  });
		} else {
		  if(this.getContent() == 'Spin-To-Win') {
			if(this.getProperties().opacity == .3) {
			  this.setProperties({
				opacity: '1'
			  });
			}
			this.setProperties({
			  cursor: 'pointer',
			  opacity: '.3'
			});
			return;
		  }
		  if(self.selectedCategories.length == 3) {
			alert('too many selected');
			return;
		  }
		  else {
			self.selectedCategories.push(this.getContent());
			if(self.selectedCategories.length == 3) {
			  self.buttonView._eventOutput.emit('enable');
			}
			this.setProperties({
			  cursor: 'pointer',
			  opacity: '.3'
			});
		  }
		}
	  });
	}


	module.exports = SpinningWidget;
});


