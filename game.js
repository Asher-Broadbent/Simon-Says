var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("level "+level);
};

function checkAnswer(currentlevel) {
  var indexCheck = level - 1;
  if(userClickedPattern[indexCheck] === gamePattern[indexCheck]) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }else if(userClickedPattern.length === gamePattern.length){
    lose();
  }
};


// On Button Press
$(".btn").on("click", function() {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenColour);
});

// Game Starter
$("body").on("keypress", function() {
  if(level < 1) {
  nextSequence();
} else {
}
});
// Game Logic

function lose() {
  var loss = new Audio("sounds/wrong.mp3");
  loss.play();
  $("body").toggleClass("game-over");
  setTimeout(function() {
    $("body").toggleClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}


 // Sound Engine
function playSound(colour) {
  switch(colour) {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
  };
}



// Button Animation
function animatePress(colour) {
  $("#"+colour).toggleClass("pressed");
  setTimeout(function() {
    $("#"+colour).toggleClass("pressed");
  }, 100);
}
