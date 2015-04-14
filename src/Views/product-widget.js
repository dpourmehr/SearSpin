/* globals define */
define(function(require, exports, module){
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
	var SequentialLayout = require('famous/views/SequentialLayout');
	var SpringTransition = require('famous/transitions/SpringTransition');
	var StateModifier = require('famous/modifiers/StateModifier');
	var SpinningWidget = require('../Views/spinning-widget.js');
	require('../../lib/facebookandsearsapi/scripts/searsAPI.js');

	var ProductWidget = function(image, name, price, description) {
		var self = this;
		
		this.mainView = new View();

		this.image = image;
		this.name = "<b>Item Name: </b>" + name;
		this.price = "<b>Price: </b>$" + price;
		this.description = description;

		this.initPage();

	}

	ProductWidget.prototype.getView = function(){
		return this.mainView;
	}

	ProductWidget.prototype.getPrize = function() {
		console.log(localStorage.getItem('prizeCat'));
	}

	ProductWidget.prototype.initPage = function(){
		var self = this;

		var topLayout = new SequentialLayout({direction: 0, itemSpacing: 10});
		var topItems = [];
		topLayout.sequenceFrom(topItems);

		var namePriceLayout = new SequentialLayout({direction: 1, itemSpacing: 30});
		var namePrice = [];
		namePriceLayout.sequenceFrom(namePrice);

		var topBottomLayout = new SequentialLayout({direction: 1, itemSpacing: 20});
		var topBottom = [];
		topBottomLayout.sequenceFrom(topBottom);

		var imageSurface = new ImageSurface({
			size: [150, 150],
			content: this.image,
			classes: ['product-image']
		});

		var name = new Surface({
			size: [300, 100],
			content: this.name,
			classes: ['product-line']
		});

		var price = new Surface({
			size: [300, 30],
			content: this.price,
			classes: ['product-line']
		});

		topItems.push(imageSurface);

		namePrice.push(name);
		namePrice.push(price);

		topItems.push(namePriceLayout);

		var description = new Surface({
			size: [510, 200],
			content: this.description,
			classes: ['product-description']
		});

		topBottom.push(topLayout);
		topBottom.push(description);

		var widgetModifier = new Modifier({
			origin: [0.5, 0.5],
			transform: Transform.translate(5, 100, 10)
		});

		var surface = new Surface({
			size: [510, 250],
			content: '',
			classes: ['product-background']
		});

		var backgroundModifier = new Modifier({
			transform: Transform.translate(0, 0, -5),
			origin: [0.5, 0]
		});

		var productView = new View();
		productView.add(backgroundModifier).add(surface);
		productView.add(topBottomLayout);

		var productModifier = new Modifier({
			origin: [0.5, 0]
		});

		this.mainView.add(productModifier).add(productView);


	}


	module.exports = ProductWidget;
});