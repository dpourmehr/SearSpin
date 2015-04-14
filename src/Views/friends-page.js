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

	var ProductWidget = require('../Views/product-widget.js');

	var FriendsPage = function() {
		var self = this;
		
		this.mainView = new View();
		this.storage = localStorage.getItem('prizeCat').split(',');
		this.productLayout = new SequentialLayout({
			direction: 1,
			itemSpacing: 170
		});
		this.products = [];
		this.productLayout.sequenceFrom(this.products);
		// this.category = localStorage.getItem('prizeCat')[1];
		// this.prize = localStorage.getItem('prizeCat')[0];
		var string = this.storage[1];
		searsAPI.getCategoryProducts(this.storage[1].toLowerCase(), function(res){
			//var obj = JSON.parse(res);

			for(var i = 0; i < 3; i++) {

				var random = Math.floor((Math.random() * 25));
				var name = res['SearchResults']['Products'][Number(random)]['Description']['Name'];
				var price = res['SearchResults']['Products'][Number(random)]['Price']['DisplayPrice'];
				var description = res['SearchResults']['Products'][Number(random)]['Description']['BrandName'];
				var image = res['SearchResults']['Products'][Number(random)]['Description']['ImageURL'];

				var pw = new ProductWidget(image, name, price, description);

				var view = pw.getView();
				var viewModifier = new Modifier({
					transform: Transform.scale(.85, .85, 1)
				});

				var mainView = new View();
				mainView.add(viewModifier).add(view);
				self.products.push(mainView);
			}

		});
		this.message = "";
		this.initPage();

	}

	FriendsPage.prototype.getView = function(){
		return this.mainView;
	}

	FriendsPage.prototype.getPrize = function() {
		console.log(localStorage.getItem('prizeCat'));
	}

	FriendsPage.prototype.initPage = function(){
		var self = this;

		var leftModifier = new Modifier({
		});

		var leftView = new View();
		leftView.add(leftModifier).add(this.productLayout);

		var FriendsPageLayout = new SequentialLayout({
			direction: 0,
			itemSpacing: 200
		});
		var items = [];
		FriendsPageLayout.sequenceFrom(items);

		items.push(leftView);

		var rightView = new View();
		var rightModifier = new Modifier({
		});
		var temp = new Surface({
			size: [400, 500],
			content: '',
			properties: {
				backgroundColor: 'white'
			}
		});
		rightView.add(rightModifier).add(this.getSummary());

		items.push(rightView);

		  var titleSurface = new Surface({
			size: [true, true],
			content: '<img src="./content/images/header.svg" width="60%">',
			classes: ['home-title']
		  });

		  var titleModifier = new Modifier({
		  	origin: [0.5, 0],
			transform: Transform.translate(-100, -100, 0)
		  });

		  var titleView = new View();

		  titleView.add(titleModifier).add(titleSurface);

		  var topDown = new SequentialLayout({
		  	direction: 1,
		  	itemSpacing: 10
		  });
		  var topDownItems = [];
		  topDown.sequenceFrom(topDownItems);

		  topDownItems.push(titleView);

		  var finalView = new View();
		  var modifier = new Modifier({
		  	origin: [0.5, 0]
		  });

		  finalView.add(modifier).add(FriendsPageLayout);
		  topDownItems.push(finalView);

		var mainMod = new Modifier({
			origin: [0.6, 0],
			transform: Transform.translate(0, 150, 0)
		});

		this.mainView.add(mainMod).add(topDown);


	}

	FriendsPage.prototype.addListeners = function(surface, name){

		var self = this;

		surface.on('mouseenter', function(){

		if(this.getProperties().opacity == .3){}
		else{ 
			this.setProperties({
			// backgroundColor: '#fff',
			// color: '#444',
			cursor: 'pointer',
			opacity: '.8'
			});
		}
		});

		surface.on('mouseleave', function(){

		if(this.getProperties().opacity == .3){}
		else{ 
			this.setProperties({
			cursor: 'initial',
			opacity: '1'
		});
		}
		});

		surface.on('click', function(){
			if(surface.getContent() == 'Continue') {
				self.mainView._eventOutput.emit('continue');
			}
			if(this.getProperties().opacity == .3){
			this.setProperties({
				cursor: 'pointer',
				opacity: '1'
			});
			} else{
			this.setProperties({
				cursor: 'pointer',
				opacity: '.3'
			});
			}

		}
		);
	}


	FriendsPage.prototype.getSummary = function() {
		var self = this;

		var firstPrize = localStorage.getItem('prizeCat').split(',')[0];

		if(firstPrize.indexOf('$') == -1) {

		}

		var category = localStorage.getItem('prizeCat').split(',')[1];

		var extra = false;

		if(localStorage.getItem('shared') != false) {
			extra = true;
		}

		var layout = new SequentialLayout({
			direction: 1,
			itemSpacing: 10
		});

		var items =[];

		layout.sequenceFrom(items);

		var firstLine = new ImageSurface({
			size: [500, 236],
			content: 'content/images/facebookFriends.jpg',
			classes: ['facebook-image']
		});

		var view = new View();

		view.add(firstLine);

		items.push(view);

		var continueSurface = new Surface({
			size: [175, 30],
			content: 'Continue',
			classes: ['continue-button']
		});

		this.addListeners(continueSurface, continueSurface.getContent());

		var buttonView = new View();
		var buttonModifier = new Modifier({
			origin: [1, 0],
			transform: Transform.translate(0, 5, 0)
		});

		buttonView.add(buttonModifier).add(continueSurface);

		items.push(buttonView);

		return layout;

	}

	module.exports = FriendsPage;
});