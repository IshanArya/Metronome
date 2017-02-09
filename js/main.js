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
		  	this.innerBlock.append(tempoDisplay);
		  	toggleSoundButton = $('#toggleSound');
		  	iconOfToggleSound =  $('#toggleSound > i');
		  	tempoText = ('#tempo')
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
			
		},
		stop: function() {
			tempo = 1000 / (this.getValue() / 60);
			if(iconOfToggleSound.hasClass("icon-stop")) {
				clearInterval(intervalId);
				intervalId = setInterval(playSound, tempo, marimba_1);
			}
		}
	});

}