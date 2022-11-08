console.log("hello world")
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const volumeSlider = document.getElementById('volumeSlider');
let audiopath = "audio/Unknown_Mortal_Orchestra_-_Hunnybee_(getmp3.pro).mp3"
let audiopath2 = "audio/Steve_Lacy_-_Playground_Official_V_(getmp3.pro).mp3"
let audiopath3 = "audio/Lauryn_Hill_-_Ex-Factor_Official_V_(getmp3.pro).mp3"
// const audio = new Audio("audio/Unknown_Mortal_Orchestra_-_Hunnybee_(getmp3.pro).mp3");
// const audio2 = new Audio("audio/Steve_Lacy_-_Playground_Official_V_(getmp3.pro).mp3");
// const audio3 = new Audio("audio/Lauryn_Hill_-_Ex-Factor_Official_V_(getmp3.pro).mp3");
const audio = new Audio()

let isSeeking = false;
playPauseButton.onclick = function(){
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
}
// AUDIO EVENT LISTENERS
// event triggered once audio loaded
audio.oncanplaythrough = function(){
    seekBar.disabled = false;
}
//event triggerd when audio plays
audio.onplay = function(){
    playPauseButton.src = "images/pause.svg"
}
// event triggered when audio pauses
audio.onpause = function(){
    playPauseButton.src = "images/play.svg"
}
//event triggered by meta data load
audio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(audio.duration);
    currentTime.innerHTML = formatTime(0);
    seekBar.max = Math.floor(audio.duration);
}
//event triggered when play time updates
audio.ontimeupdate = function(){
    currentTime.innerHTML = formatTime(audio.currentTime)
    if(!isSeeking){
        seekBar.value = Math.floor(audio.currentTime);
    }
}
// event triggered when audio ends
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    seekBar.value = 0;
    playPauseButton.src = "images/play.svg"
}

//SEEK BAR LISTENERS
//event triggered on interaction with seek bar
seekBar.oninput = function(){
    isSeeking = true;
}

//event triggered when seek bar changed manually
seekBar.onchange = function(){
    audio.currentTime = seekBar.value
    isSeeking = false;
}
//UTILITY  FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}
//CHANGE AUDIO
// when the defined button is clicked the audio will change to the next one
function changeAudio(){
    console.log("Unknown Mortal Orchestra")
    audio.src = audiopath
    title.innerHTML='Hunnybee'
    artist.innerHTML='Unknown Mortal Orchestra'
}
function changeAudio1(){
    console.log("Steve Lacy")
    audio.src = audiopath2
    title.innerHTML='Playground'
    artist.innerHTML='Steve Lacy'
}
function changeAudio2(){
    console.log("Lauryn Hill")
    audio.src = audiopath3
    title.innerHTML='Ex-Factor'
    artist.innerHTML='Lauryn Hill'
}



//VOLUME SLIDER
// addEventLsitener is listening to the input of the slider
volumeSlider.addEventListener('input', (e) =>{
    //inputs the value into the variable
    const value = e.target.value;
    //divides the value by 100 to make the slider between 0 and 100
    audio.volume = value/100;
})

// let audioPlayer = document.getElementById("container");
// let audioVolumeBar = document.getElementById("");
// let myVolumeBar = document.getElementById("");
// var audioVolume = audioPlayer.volume;

// console.log(audioVolume);

// function updateVolume(){
//     myVolumeBar.style.width = audioVolume * 100 + '%';
// }

// updateVolume();