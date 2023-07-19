let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level=0;
$(document).ready(function(){
    $('.btn').click(function(e){
        let userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        let x = userClickedPattern.length-1;
        checkAnswer(x);
    });
});


function playSound(name){
        let audio = new Audio(`sounds/${name}.mp3`);
        audio.play();
}


function nextSequence()
{
    userClickedPattern=[];
    let randomNumber = Math.floor((Math.random()*4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).click(function(){
        $(this).fadeOut(100).fadeIn(100);
        let audio = new Audio(`sounds/${randomChosenColour}.mp3`);
        audio.play();
    }); 
    level++; 
}

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
    
});

function animatePress(currentColour)
{
    $(`#${currentColour}`).addClass(`pressed`);

    let self = $(`#${currentColour}`);
    setTimeout(function(){
        self.removeClass("pressed");
    }, 100);
    
}


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        console.log("wrong");
        playSound("wrong");
        $(document.body).addClass('game-over');
        setTimeout(function(){
            $(document.body).removeClass('game-over');
        },200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];

}