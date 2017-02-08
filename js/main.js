window.onload = function() {
	var toggleSound = document.getElementById('toggleSound');
	var iconOfToggleSound = document.querySelector('#toggleSound > svg > use');
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
		startAngle: 120,
		

	});
	toggleSound.addEventListener('click', function() {
		if(iconOfToggleSound.getAttribute("xlink:href") === "#play") {
			iconOfToggleSound.setAttribute("xlink:href", "#pause");
			intervalId = setInterval(playSound, 500, marimba_1);
		} else {
			iconOfToggleSound.setAttribute("xlink:href", "#play");
			clearInterval(intervalId);
		}
		
	});
}