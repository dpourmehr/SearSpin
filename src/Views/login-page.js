/* globals define */
define(function(require, exports, module) {
    'use strict';

    var Surface = require('famous/core/Surface');
    var Engine = require('famous/core/Surface');
    var View = require('famous/core/View');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var InputSurface = require('famous/surfaces/InputSurface');
    var Modifier = require('famous/core/Modifier');

    var Profile = require('./../../src/Views/profile-page');

    var Login = function(context) {
    	var self = this;

    	this.mainView = new View();
	this.mainString = "";
	this.renderController = context;
    	this.showLogin();

    }

    Login.prototype.getView = function() {
	var array = [this.mainView, this.mainString];
    	return array;
    }

    Login.prototype.showLogin = function() {
    	var self = this;

		this.mainView.add(this.getBackground());

		this.mainView.add(this.getInputSurfaces());

    }

    Login.prototype.getBackground = function() {
    	var self = this;

    	var surface = new Surface({
    		size: [400, 500],
    		classes: ['login-background']
    	});

    	return surface;
    }

    Login.prototype.getInputSurfaces = function() {
    	var self = this;

    	var items = [];

    	var inputLayout = new SequentialLayout({direction: 1, itemSpacing: 30});

    	inputLayout.sequenceFrom(items);

    	var facebookSurface = new Surface({
    		size: [274, 50],
    		content: 'Connect with Facebook',
    		classes: ['fb-button']
    	});

    	items.push(facebookSurface);

    	var orSurface = new Surface({
    		size: [274, 50],
    		content: 'OR',
    		classes: ['login-or']
    	});

    	items.push(orSurface);

	    this.user = new InputSurface({
	        size: [274, 50],
	        name: 'userSurface',
	        placeholder: 'Username here',
	        value: '',
	        type: 'text',
	        classes: ['input-surface']
	    });

	    items.push(this.user);

	    this.pass = new InputSurface({
	        size: [274, 50],
	        name: 'inputSurface',
	        placeholder: 'Password here',
	        value: '',
	        type: 'password',
	        classes: ['input-surface']
	    });

	    items.push(this.pass);

	    var submitCreateItems = [];

	    var submitCreate = new SequentialLayout({direction: 0, itemSpacing: 20});

	    submitCreate.sequenceFrom(submitCreateItems);

	    var submit = new Surface({
	    	size: [100, 50],
	    	content: 'Login',
	    	classes: ['button']
	    });

	    this.addListener(submit);

	    submitCreateItems.push(submit);

	    var createAccount = new Surface({
	    	size: [154, 50],
	    	content: 'Create Account',
	    	classes: ['button']
	    });

	    this.addListener(createAccount);

	    submitCreateItems.push(createAccount);

	    items.push(submitCreate);

	    return inputLayout;

    }

    Login.prototype.addListener = function(surface) {
    	var self = this;

	var array = "";

    	surface.on('mouseenter', function() {
    		surface.setProperties({cursor: 'pointer'});
    	});

    	surface.on('click', function() {
    	
		self.array;
	var self2 = self;
		    $.ajax({
			type: "POST",
			url: "~/../../app/src/Views/php/action.php",
			data: "whatImposting",
			async: false,
			dataType:'text',
			success: function(json_data) {
				self.mainString = json_data;
			}
		    });
    	
		    self.mainView._eventOutput.emit(surface.getContent());
			self.renderController.hide();
			console.log(self.mainString);
			var profile = new Profile(this.mainString);
			self.renderController.show(profile.getView());			
});

	this.mainString = array;

    }

    Login.prototype.doThis = function(data) {
	this.mainString = data;
	}

    Login.prototype.getString = function() {
	return this.mainString;
}

    module.exports = Login;
});

