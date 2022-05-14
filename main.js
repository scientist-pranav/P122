x = 0;
y = 0;

var screen_width = 0;
var screen_height = 0;

var speak_data = "";

var draw_apple = "";
let apple;
var to_number = ""; 

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload()
{
  apple = loadImage('apple.png');
  //apple = new Image();
  //apple.src = "apple.png"; 
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  console.log(event);

var content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    if(Number.isInteger(to_number))
    {
      draw_apple = "set";
    }
    else
    {
      draw_apple = "The speech has not recognized a number";
    }

 console.log(event); 

 content = event.results[0][0].transcript;
}

function setup() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;

    canvas = createCanvas(screen_width, screen_height-150);
    

}

function draw() {
  if(draw_apple == "set")
  {
    for (let i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      console.log("x = " + x);
      console.log("y = " + y);
      image(apple, x, y, 50, 50);
    }

    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + " Apples drawn";
    draw_apple = "";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis; 

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}