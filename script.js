const utterance = new SpeechSynthesisUtterance();
let voices=[]
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

window.speechSynthesis.onvoiceschanged = function () {
    voices = speechSynthesis.getVoices();
    console.log(voices);
    let html = voices.map(elem => {
        return `
        <option value="${elem.name}">${elem.name}</option>
        `
    }).join('');
    voicesDropdown.innerHTML = html;
};



voicesDropdown.addEventListener('change',setVoice);

function setVoice(){
    console.log("inside voice change");
    console.log(this.value);
    utterance.voice=voices.find(voice=>voice.name===this.value);
    toggle();
}

function toggle(startover=true){
   speechSynthesis.cancel();
   if(startover)
   {
    speechSynthesis.speak(utterance);
   }
}

function setOption(){
    console.log(this.name,this.value);
    utterance[this.name]=this.value;
    toggle()
}

options.forEach(elem=>elem.addEventListener('change',setOption))
speakButton.addEventListener('click',toggle);
stopButton.addEventListener('click',()=>toggle(false))