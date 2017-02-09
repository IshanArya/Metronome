window.onload = function() {
	var toggleSound = $('<button id="toggleSound"><i class="icon-play"></i></svg></button>');
	var iconOfToggleSound = $('#toggleSound > i');
	var slider = $('#slider');

	var intervalId;

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
		create: function () {
		  	this.innerBlock.append(toggleSound);
	  		toggleSound.on('click', function() {
	  	  		if(iconOfToggleSound.hasClass("icon-play")) {
	  					intervalId = setInterval(playSound, 500, marimba_1);
	  	  		} else {
	  	  			clearInterval(intervalId);
	  	  		}
	  	  		iconOfToggleSound.toggleClass("icon-play icon-stop");
	  	  	});
		},
		start: function() {
			var that = this;
		  	var btn1 = $("<button id='sub'>-</button>");
		    var btn2 = $("<button id='add'>+</button>");
		  	this.innerBlock.append(btn1);
		    this.innerBlock.append(btn2);
		    btn1.click(function() {
		    	that.setValue(that.options.value - 1);
		    });
		    btn2.click(function() {
		    	that.setValue(that.options.value + 1);
		    });
		}
	});

}