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

	var FinalPage = require('./final-page.js');

	var CongratulationsPage = function() {
		var self = this;

		this.mainView = new View();
		this.category = "";
		this.prize = "";
		this.message = "";
		this.initPage();

	}

	CongratulationsPage.prototype.getView = function(){
		return this.mainView;
	}

	CongratulationsPage.prototype.initPage = function(){
		var self = this;

		this.getCategory();
		this.getPrize();

		this.showPage();
	}

	CongratulationsPage.prototype.showPage = function(){
		var self = this;

		var mainLayout = new SequentialLayout({
		direction: 1,
		itemSpacing: 30
		});
		var mainItems = [];
		mainLayout.sequenceFrom(mainItems);

		var titleSurface = new Surface({
		size: [700, 200],
		content: 'Congratulations!',
		classes: ['congrats-title']
		});

		var titleView = new View();
		var titleModifier = new Modifier({
		origin: [0.5, 0.2]
		});
		titleView.add(titleSurface);

		var mainContent = new Surface({
		size: [700, 400],
		content: this.message,
		classes: ['congrats-content']
		});

		var contentView = new View();
		var contentModifier = new Modifier({
		origin: [0.5, .3],
		transform: Transform.translate(0, 200, 0)
		});
		contentView.add(mainContent);

		this.mainView.add(titleModifier).add(titleSurface);

		this.mainView.add(contentModifier).add(mainContent);

		var shareButton = new Surface({
		size: [150, 50],
		content: 'Share',
		classes: ['congrats-share']
		});

		this.addListeners(shareButton);

		var shareModifier = new Modifier({
		origin: [0.5, 0.6]
		});

		this.mainView.add(shareModifier).add(shareButton);
	}

	CongratulationsPage.prototype.getCategory = function(){

		var self = this;

		var temp = localStorage.getItem('categories').split(',');

		var random = Math.floor((Math.random() * 3));

		this.category = temp[random];

	}

	CongratulationsPage.prototype.getPrize = function(){
		var self = this;

		var prizes = ['10%', '20%', '15%', '10%', '30%', '15%', '20%', '10%', '15%', '$10', '$30', '10%'];

		var random = Math.floor((Math.random() * 12));

		this.prize = prizes[random];

		this.message = "You have won <b>" + this.prize + "</b> off of your <b>" + this.category + "</b> purchase at Sears or Kmart.<br>" + 
					"Click the share button below to post this and redeem your prize!.";

		if(this.prize.indexOf('%') == -1){
		this.message = "You have won <b>" + this.prize + "</b> in Shop Your Way points. " +
					"Click the share button below to recieve an additional 10% off your purchases.";
		}


	}

	CongratulationsPage.prototype.addListeners = function(surface, name){

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

			self.share();

		}
		);
	}




	CongratulationsPage.prototype.share = function(){
		var self = this;
	FB.ui({
		method: 'feed',
		name: 'Sears Spin-to-Win',
		link: 'http://hackathon.codefyr.com/SearSpin/index.html',
		picture: 'http://hackathon.codefyr.com/SearSpin/content/images/sears.png',
		caption: 'Get discounts on your favorite everyday items!',
		description: 'Look what I got from Sears!',
		message: 'OMG.. so much fun'
	},

	function(response){
		if (response && response.post_id){
			//go to share friends page, add 10% to prize
			var things = [];
			things.push(self.prize);
			things.push(self.category);
			localStorage.setItem('prizeCat', things);
			localStorage.setItem('shared', true);
			self.mainView._eventOutput.emit('share');
		} else{
			// THE POST WAS NOT PUBLISHED
			var things = [];
			things.push(self.prize);
			things.push(self.category);
			localStorage.setItem('prizeCat', things);
			localStorage.setItem('shared', false);
			self.mainView._eventOutput.emit('no-share');
		}
	}
	);
}

	module.exports = CongratulationsPage;
});