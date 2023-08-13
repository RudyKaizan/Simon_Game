var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}) 


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}


$(document).keydown(function(){
    if(!started){ 
        $("#level-title").text("Level "+level)  
        nextSequence();
        started=true;
     }
    
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over")
        ,200});
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}