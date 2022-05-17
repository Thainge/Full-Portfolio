"use strict";

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing jokes to voice robot API
function tellMe(joke) {
// VoiceRSS Speech Parameters
    VoiceRSS.speech({
      key: '9f58e30400794c31946cacc8d2d852c9',
      src: joke,
      hl: 'en-us',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false,
    });
}

// Get jokes from jokes API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';
    try {
        // disable button
        toggleButton();
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text to speech
        tellMe(joke);
    } catch (error) {
        // Catch errors here
        console.log('whoops', error);
    }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);