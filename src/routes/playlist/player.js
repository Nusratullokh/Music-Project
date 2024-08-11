const trackElements = document.getElementsByClassName('track__single');
for (let i = 0; i < trackElements.length; i++) {
    const trackElement = trackElements[i];
    const songTitleElement = trackElement.querySelector('.songTitle');
    const songImageElement = trackElement.querySelector('.songImage');
    const audioPlayer = trackElement.querySelector('.audioPlayer');
    const playButton = trackElement.querySelector('.playButton'); 
    songTitleElement.addEventListener('click', playPauseSong);
    songImageElement.addEventListener('click', playPauseSong);
    playButton.addEventListener('click', playPauseSong);

    function playPauseSong() {

        const allAudioPlayers = document.querySelectorAll('.audioPlayer');
        allAudioPlayers.forEach((audio) => {
            if (audio !== audioPlayer) {
                audio.pause();
            }
        });


        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }
}



