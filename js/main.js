window.onload = function() {
	var toggleSound = $('<button id="toggleSound"><i class="icon-play"></i></svg></button>');
	var tempoDisplay = $('<h2 id="tempo">120</h2>');
	var tempoText;
	var toggleSoundButton;
	var iconOfToggleSound;
	var slider = $('#slider');

	var defaultFontSize = parseFloat(getComputedStyle(document.body).fontSize);

	var intervalId;
	var tempo = 500;

	var marimba_1 = new Howl({
		src: ['sounds/marimba_1.mp3']
	});


	function playSound(sound) {
		sound.stop();
		sound.play();
	}

	var editElements = {
		centerInside: function(insideElement) {
			var outsideElement = insideElement.closest("div");
			insideElement.css("top", ((outsideElement.outerHeight() - insideElement.outerHeight()) / 2) + "px");
			insideElement.css("left", ((outsideElement.outerWidth() - insideElement.outerWidth()) / 2) + "px");
		},
		growText: function(element) {
			element.css("font-size", "20em");
		},
		shrinkText: function (element) {
			element.css("font-size", "2em");
		},
		bringDown: function (element) {
			element.css("top", "500px");
		},
		standby: function(element) {
			this.shrinkText(element);
			this.centerInside(element);
			this.bringDown(element);
		},
		bringToMain: function(element) {
			this.growText(element);
			this.centerInside(element);
		}
	}
	
	

	slider.roundSlider({
		max: 360,
		min: 20,
		value: 120,
		radius: 360,
		width: 35,
		handleShape: "square",
		handleSize: "20, 35",
		showTooltip: false,
		sliderType: "min-range",
		create: function () {
			var that = this;
		  	this.innerBlock.append(toggleSound);
		  	toggleSoundButton = $('#toggleSound');
		  	editElements.bringToMain(toggleSoundButton);
		  	iconOfToggleSound =  $('#toggleSound > i');
		  	this.innerBlock.append(tempoDisplay);
		  	tempoText = $('#tempo');
		  	editElements.standby(tempoText);
	  		toggleSound.on('click', function() {
	  	  		if(iconOfToggleSound.hasClass("icon-play")) {
	  					intervalId = setInterval(playSound, tempo, marimba_1);
	  	  		} else {
	  	  			clearInterval(intervalId);
	  	  		}
	  	  		iconOfToggleSound.toggleClass("icon-play icon-stop");
	  	  	});
		},
		start: function() {
			editElements.standby(toggleSoundButton);
			editElements.bringToMain(tempoText);
		},
		drag: function() {
			tempoText.text(("0" + this.getValue()).slice(-3));
		},
		change: function() {
			tempoText.text(("0" + this.getValue()).slice(-3));
			tempo = 1000 / (this.getValue() / 60);
			if(iconOfToggleSound.hasClass("icon-stop")) {
				clearInterval(intervalId);
				intervalId = setInterval(playSound, tempo, marimba_1);
			}
		},
		stop: function() {
			tempo = 1000 / (this.getValue() / 60);
			editElements.bringToMain(toggleSoundButton);
			editElements.standby(tempoText);
			editElements.centerInside(tempoText);
			editElements.bringDown(tempoText);
			if(iconOfToggleSound.hasClass("icon-stop")) {
				clearInterval(intervalId);
				intervalId = setInterval(playSound, tempo, marimba_1);
			}
		}
	});

}