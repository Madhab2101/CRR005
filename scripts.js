document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const seekBar = document.getElementById("seekBar");
    const currentTime = document.getElementById("currentTime");
    const totalTime = document.getElementById("totalTime");
    const muteBtn = document.getElementById("muteBtn");
    const volumeBar = document.getElementById("volumeBar");
    const speedControl = document.getElementById("speedControl");
    const repeatBtn = document.getElementById("repeatBtn");

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
        currentTime.innerHTML = `${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;

        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    });

    audioPlayer.addEventListener("durationchange", function () {
        const minutes = Math.floor(audioPlayer.duration / 60);
        const seconds = Math.floor(audioPlayer.duration % 60);
        totalTime.innerHTML = `${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
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
        muteBtn.innerHTML = audioPlayer.volume === 0 ? "&#128263;" : "&#128266;";
    });

    speedControl.addEventListener("input", function () {
        audioPlayer.playbackRate = parseFloat(speedControl.value);
    });

    repeatBtn.addEventListener("click", function () {
        audioPlayer.loop = !audioPlayer.loop;
        repeatBtn.style.color = audioPlayer.loop ? "#4CAF50" : "#fff";
    });
});




<script src="https://apis.google.com/js/api.js"></script>
// Function to handle Google Drive API client library loading
function handleClientLoad() {
    gapi.load('client', initClient);
   }
   
   // Function to initialize the Google Drive API client
   function initClient() {
    gapi.client.init({
       apiKey: 'YOUR_API_KEY',
       clientId: 'YOUR_CLIENT_ID',
       scope: 'https://www.googleapis.com/auth/drive',
    }).then(function() {
       gapi.client.drive.files.list({
         'pageSize': 10,
         'fields': "nextPageToken, files(id, name)"
       }).then(function(response) {
         var files = response.result.files;
         if (files && files.length > 0) {
           for (var i = 0; i < files.length; i++) {
             var file = files[i];
             displayFile(file);
           }
         } else {
           console.log('No files found.');
         }
       });
    });
   }
   
   // Function to display a file on the webpage
   function displayFile(file) {
    var fileElement = document.createElement('div');
    fileElement.innerHTML = '<div><strong>' + file.name + '</strong></div>';
    document.getElementById('driveFiles').appendChild(fileElement);
   }
   <div id="driveFiles"></div>