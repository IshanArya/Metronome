window.onload = function() {
	var theRoundSlider;
	var toggleSound = $('<button id="toggleSound"><i class="icon-play"></i></svg></button>');
	var iconOfToggleSound;
	var tempoDisplay = $('<h2 id="tempo">120</h2>');
	var slider = $('#slider');
	var buttonGroup = $('div.btn-group');
	var groupButtons = $('.btn-group button');
	var soundsList = $('#sounds');
	var soundsOptions = $('#sounds option')

	var defaultFontSize = parseFloat(getComputedStyle(document.body).fontSize);

	var sounds = {
		khz1_pulse: {
			name: "1 Khz Pulse",
			sound: new Howl({
				src: ['sounds/1khz_pulse.mp3']
			})
		},
		marimba_1: {
			name: "Marimba 1",
			sound: new Howl({
				src: ['sounds/marimba_1.mp3']
			})
		}
	}

	var intervalId;
	var tempo = 500;
	var subdivision = 1;
	var sound = sounds.khz1_pulse.sound;


	function playSound() {
		sound.stop();
		sound.play();
	}
	function changeTempo() {
		tempo = 1000 / (theRoundSlider.getValue() / 60) / subdivision;
		if(iconOfToggleSound.hasClass("icon-stop")) {
			clearInterval(intervalId);
			intervalId = setInterval(playSound, tempo);
		}
	}

	var editElements = {
		centerInside: function(insideElement) {
			var outsideElement = insideElement.closest("div");
			insideElement.css("top", ((outsideElement.outerHeight() - insideElement.outerHeight()) / 2) + "px");
			insideElement.css("left", ((outsideElement.outerWidth() - insideElement.outerWidth()) / 2) + "px");
		},
		growText: function(element) {
			if(element === tempoDisplay) {
				element.css("font-size", "8em");
			} else {
				element.css("font-size", "10em");
			}
		},
		shrinkText: function (element) {
			element.css("font-size", "2em");
		},
		bringDown: function (element) {
			element.css("top", "220px");
		},
		standby: function(element) {
			this.shrinkText(element);
			this.centerInside(element);
			this.bringDown(element);
		},
		bringToMain: function(element) {
			this.growText(element);
			this.centerInside(element);
		},
		addSoundstoSoundList: function() {
			for (var beep in sounds) {
			   if (sounds.hasOwnProperty(beep)) {
			      var obj = sounds[beep];
			      soundsList.append($('<option>', {
			      	value: beep,
			      	text: obj.name
			      }));
			   }
			}
		}
	}
	

	editElements.addSoundstoSoundList();


	slider.roundSlider({
		max: 360,
		min: 20,
		value: 120,
		radius: 180,
		width: 35,
		handleShape: "square",
		handleSize: "20, 35",
		showTooltip: false,
		sliderType: "min-range",
		create: function () {
			theRoundSlider = this;
		  	this.innerBlock.append(toggleSound);
		  	editElements.bringToMain(toggleSound);
		  	iconOfToggleSound =  $('#toggleSound > i');
		  	this.innerBlock.append(tempoDisplay);
		  	editElements.standby(tempoDisplay);
	  		toggleSound.on('click', function() {
	  	  		if(iconOfToggleSound.hasClass("icon-play")) {
	  					intervalId = setInterval(playSound, tempo);
	  	  		} else {
	  	  			clearInterval(intervalId);
	  	  		}
	  	  		iconOfToggleSound.toggleClass("icon-play icon-stop");
	  	  	});
		},
		start: function() {
			editElements.standby(toggleSound);
			editElements.bringToMain(tempoDisplay);
		},
		drag: function() {
			tempoDisplay.text(("0" + this.getValue()).slice(-3));
			editElements.bringToMain(tempoDisplay);
		},
		change: function() {
			tempoDisplay.text(("0" + this.getValue()).slice(-3));
			changeTempo();
		},
		stop: function() {
			editElements.bringToMain(toggleSound);
			editElements.standby(tempoDisplay);
			changeTempo();
		}
	});

	buttonGroup.on('click', function(e) {
		var target = $(e.target);
		if(target.is('i')) {
			target = target.closest("button");
		}
		if(target.is('button')) {
			groupButtons.removeClass("subdivisionSelected");
			target.addClass("subdivisionSelected");
			subdivision = target.attr("id").slice(-1);
			changeTempo();
		}
	});
	soundsList.on('change', function() {
		sound = sounds[this.value].sound;
	});
	soundsList.on('mouseenter', 'option', function() {
		this.style.background = "red";
	});

}