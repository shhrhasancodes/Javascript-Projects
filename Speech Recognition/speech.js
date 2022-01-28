let btn = document.querySelector(".button"),
content = document.querySelector(".content");
const greetings = [
    'I am good , How are you',
    'Fine. What about you',
    'I am doing good'
];

const weather = [
    'Weather is pretty good',
    'Its a sunny day',
    'Slight chance of rain'
];

const askHelp = [
    'What happen , how can i help',
    'Are you fine?'
];

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();




recognition.onstart = function(){
    console.log("voice is activated , you can speek now!");
};

recognition.onresult = function(e){

    let current = e.resultIndex;
    let message = e.results[current][0].transcript;

    content.textContent = message;
    readOutLoud(message);

};

btn.addEventListener("click" , ()=>{
    recognition.start();
    content.textContent = "";
});

function readOutLoud(msg){
    const speech = new SpeechSynthesisUtterance();
    
    if(msg.includes('how are you')|| msg.includes('hello') ||msg.includes('how are you doing')){
        const finalResult = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalResult;
    }
    else if(msg.includes('tell me about the weather') || msg.includes('how is the weather today')){
        const finalResult = weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalResult;
    }
    else if(msg.includes('hey can you help me') || msg.includes('help')){
        const finalResult = askHelp[Math.floor(Math.random() * askHelp.length)];
        speech.text = finalResult;
    }
    else{
        speech.text = "I dont know what you said";
    }
    
    speech.volume=1;
    speech.rate=1;
    speech.pitch=1;

    window.speechSynthesis.speak(speech);
}

