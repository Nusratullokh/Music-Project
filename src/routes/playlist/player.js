



// Get all track elements
const trackElements = document.getElementsByClassName('track__single');

// Loop through each track element
for (let i = 0; i < trackElements.length; i++) {
    const trackElement = trackElements[i];
    const songTitleElement = trackElement.querySelector('.songTitle');
    const songImageElement = trackElement.querySelector('.songImage');
    const audioPlayer = trackElement.querySelector('.audioPlayer');
    const playButton = trackElement.querySelector('.playButton'); // Assuming you have a play button inside the track element

    // Add click event listeners to the song title and image
    songTitleElement.addEventListener('click', playPauseSong);
    songImageElement.addEventListener('click', playPauseSong);
    playButton.addEventListener('click', playPauseSong);

    function playPauseSong() {
        // Pause all other audio players
        const allAudioPlayers = document.querySelectorAll('.audioPlayer');
        allAudioPlayers.forEach((audio) => {
            if (audio !== audioPlayer) {
                audio.pause();
            }
        });

        // Play or pause the current song
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }
}



// document.addEventListener('DOMContentLoaded', () => {
//     const trackElements = document.getElementsByClassName('track__single');
//     let currentlyPlayingAudio = null; // To track the currently playing audio

//     for (let i = 0; i < trackElements.length; i++) {
//         const trackElement = trackElements[i];
//         const songTitleElement = trackElement.querySelector('.songTitle');
//         const songImageElement = trackElement.querySelector('.songImage');
//         const audioPlayer = trackElement.querySelector('.audioPlayer');

//         songTitleElement.addEventListener('click', () => togglePlayPause(audioPlayer));
//         songImageElement.addEventListener('click', () => togglePlayPause(audioPlayer));

//         async function togglePlayPause(player) {
//             if (currentlyPlayingAudio && currentlyPlayingAudio !== player) {
//                 await currentlyPlayingAudio.pause(); // Pause the currently playing audio
//                 currentlyPlayingAudio.currentTime = 0; // Reset the current time
//             }

//             if (player.paused) {
//                 try {
//                     await player.play(); // Play the selected audio
//                     currentlyPlayingAudio = player; // Set the new currently playing audio
//                 } catch (error) {
//                     console.error("Playback failed:", error);
//                 }
//             } else {
//                 player.pause();
//                 currentlyPlayingAudio = null; // Reset the currently playing audio
//             }
//         }
//     }
// });
