document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const seekBar = document.getElementById("seekBar");
    const currentTime = document.getElementById("currentTime");
    const totalTime = document.getElementById("totalTime");
    const muteBtn = document.getElementById("muteBtn");
    const volumeBar = document.getElementById("volumeBar");

    playPauseBtn.addEventListener("click", function () {
        if (audioPlayer.paused || audioPlayer.ended) {
            audioPlayer.play();
            playPauseBtn.innerHTML = "&#10074;&#10074;";
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = "&#9658;";
        }
    });

    audioPlayer.addEventListener("timeupdate", function () {
        const minutes = Math.floor(audioPlayer.currentTime / 60);
        const seconds = Math.floor(audioPlayer.currentTime % 60);
        currentTime.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    });

    audioPlayer.addEventListener("durationchange", function () {
        const minutes = Math.floor(audioPlayer.duration / 60);
        const seconds = Math.floor(audioPlayer.duration % 60);
        totalTime.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    });

    seekBar.addEventListener("input", function () {
        const seekTime = (audioPlayer.duration / 100) * seekBar.value;
        audioPlayer.currentTime = seekTime;
    });

    muteBtn.addEventListener("click", function () {
        if (audioPlayer.muted) {
            audioPlayer.muted = false;
            muteBtn.innerHTML = "&#128266;";
            volumeBar.value = 100;
        } else {
            audioPlayer.muted = true;
            muteBtn.innerHTML = "&#128263;";
            volumeBar.value = 0;
        }
    });

    volumeBar.addEventListener("input", function () {
        audioPlayer.volume = volumeBar.value / 100;
        if (audioPlayer.volume === 0) {
            muteBtn.innerHTML = "&#128263;";
        } else {
            muteBtn.innerHTML = "&#128266;";
        }
    });
});
