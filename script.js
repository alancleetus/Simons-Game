//variables
let level = 0;
let gamePattern = [];
let userChosenPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
const audios = {
    "red": new Audio("./sounds/red.mp3"),
    "blue": new Audio("./sounds/blue.mp3"),
    "green": new Audio("./sounds/green.mp3"),
    "yellow": new Audio("./sounds/yellow.mp3")
};

//random number generator 1-4
const nextSequence = () => { return Math.floor(Math.random() * 4) };
const playSound = (color) => audios[color].play();
const blink = (color) => $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);;
const animatePress = (color) => {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
};

function gameLoop() {
    // set level title
    level += 1;
    $("#level-title").text("Level " + level);
 
    //choose next color
    let randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);

    //animate button
    playSound(randomChosenColor);
    blink(randomChosenColor);
}

// start game by pressing A key
$(document).keypress((e) => {
    //console.log( e.which);
    if (e.which === 97 && level === 0)
        gameLoop()
});

// reset game
let restart = () => {

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    // reset values
    level = 0;
    gamePattern = [];
    userChosenPattern = [];
    gameLoop();
};

// continue game
let nextLevel = () => {
    userChosenPattern = [];
    gameLoop();
};

// button click functionality
$("div.btn").click((e) => {
    // keep track of pressed buttons
    const userChosenColor = e.target.id;
    userChosenPattern.push(userChosenColor);

    // animate pressed button
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // check if current solution is correct
    let flag = false;
    if (userChosenPattern.length <= gamePattern.length) {
        console.log("checking....")
        for (let index in userChosenPattern) {
            if (gamePattern[index] != userChosenPattern[index])
                flag = true;
        }
    }

    if (flag)
        restart();
    if (userChosenPattern.length === gamePattern.length)
        nextLevel();
});

