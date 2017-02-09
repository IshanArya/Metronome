window.onload = function() {
	var toggleSound = $('<button id="toggleSound"><i class="icon-play"></i></svg></button>');
	var tempoDisplay = $('<h2 id="tempo">120</h2>');
	var tempoText;
	var toggleSoundButton;
	var iconOfToggleSound;
	var slider = $('#slider');

	var intervalId;
	var tempo = 500;

	var marimba_1 = new Howl({
		src: ['sounds/marimba_1.mp3']
	});


	function playSound(sound) {
		sound.play();
	}

	function centerInside(outsideElement, insideElement) {
		insideElement.css("top", ((outsideElement.outerHeight() - insideElement.outerHeight()) / 2) + "px");
		insideElement.css("left", ((outsideElement.outerWidth() - insideElement.outerWidth()) / 2) + "px");
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
		  	this.innerBlock.append(toggleSound);
		  	toggleSoundButton = $('#toggleSound');
		  	centerInside(this.innerBlock, toggleSoundButton);
		  	iconOfToggleSound =  $('#toggleSound > i');
		  	this.innerBlock.append(tempoDisplay);
		  	tempoText = $('#tempo');
		  	centerInside(this.innerBlock, tempoText);
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
			toggleSoundButton.hide();
			tempoText.show();
		},
		drag: function() {
			tempoText.text(("0" + this.getValue()).slice(-3));
		},
		stop: function() {
			tempo = 1000 / (this.getValue() / 60);
			tempoText.hide();
			toggleSoundButton.show();
			if(iconOfToggleSound.hasClass("icon-stop")) {
				clearInterval(intervalId);
				intervalId = setInterval(playSound, tempo, marimba_1);
			}
		}
	});

}