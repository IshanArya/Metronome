window.onload = function() {
	var play = document.getElementById('play');

	var marimba_1 = new Howl({
		src: ['sounds/marimba_1.mp3']
	});

	function playSound(sound) {
		sound.play();
		console.log("hi");
	}

	play.addEventListener('click', function() {
		setInterval(playSound(marimba_1), 500);
	});
}