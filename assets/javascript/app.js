
$(document).ready(function(){
//questionbank object stores all the questions with their corresponding answers.
//ques property has the question and ans has the answer
var questionBankObj = [
    {ques: "There are only 2 genders", ans: "t"}, 
    {ques: "Bananas are a fruit", ans: "t"},
    {ques: "There are 45inches in a foot", ans: "f"}, 
    {ques: "The earth is flat", ans: "f"}, 
    {ques: "The earth is covered more by water instead of land", ans: "t"},
    {ques: "Cookies are a vegetable", ans: "f"}, 
    {ques: "A fire-truck has wheels", ans:"t"},
    {ques: "An ant and an elephant are the same weight", ans: "f"}, 
    {ques: "Giraffes are taller than lions", ans: "t"},
    {ques: "Humans can live up to 1000 years", ans: "f"}
];

var images = ["assets/images/question1img.jpg","assets/images/question2img.jpg",
"assets/images/question3img.png","assets/images/question4img.jpeg",
"assets/images/question5img.jpg","assets/images/question6img.jpg","assets/images/question7img.jpg",
"assets/images/question8img.jpg","assets/images/question9img.jpg","assets/images/question10img.jpg"];

//variable to show instructions
var instructions = "Answer all the questions with true or false within the given time limit"
//variables for correct and incorrect numbers
var incorrectNum = 0;
var correctNum = 0;
//variable for question Number
var questionNum = 0;
//variable for time
var time = 10;
//variable for if the clock is running
var isRunning = false;
//variable for the interval id that we can clear
var intervalId;
//variable for a string for the answer is so we dont have to keep typing it
var answerIs = "The answer is: "

//we hide all the elements before the user starts the game
function hidebeginning(){
$("#truebutton").hide();
$("#falsebutton").hide();
$("#timer").hide();
$("#image").hide();
$("#startbutton").show();
$("#question").text(instructions);
}

//count time function decrement the time and set that to the timer text. if time<0, assume wrong answer
function countTime(){
    time--;
    $("#timer").text(time);
    if(time<0){
        nextQuestion("incorrect");
    } 
}
//start the timer
function start(){
    if(!isRunning){
        isRunning = true;
        $("#timer").text(10);
        intervalId = setInterval(countTime,1000);
    }

}
//stop the timer and clear interval
function stop(){
    isRunning = false;
    clearInterval(intervalId);
    time=10;
    $("#timer").text("");
}

//set up elements in beginning show all buttons we need for game. question text show. start timer
function startbeginning(){
    $("#truebutton").show();
    $("#falsebutton").show();
    $("#timer").show();
    $("#startbutton").hide();
    //get question method
    $("#question").text(questionBankObj[questionNum].ques);
    start();
}

//function to evaluate question answer, stop timer, go to next question.
function nextQuestion(str){
    if(str=="correct"){
        correctNum++;
    }else{
        incorrectNum++;
    }
    stop();
    $("#answer").text(answerIs +questionBankObj[questionNum].ans);
    $("#image").show();
    $("#image").attr("src",images[questionNum]);
    $("#truebutton").hide();
    $("#falsebutton").hide();
    questionNum++;
    //if we reach outside our last question, end the game with endgame function.
    if(questionNum>9){
        setTimeout(endGame,2000);
    }else{
    setTimeout(function(){
    $("#question").text(questionBankObj[questionNum].ques);
    start();
    $("#answer").text("");
    $("#image").attr("src","");
    $("#image").hide();
    $("#truebutton").show();
    $("#falsebutton").show();
    },2000);
}

}
//end game function will hide all elements besides question and play buttion
//reset all necessary variables and show correct and incorrect scores
//if user clicks start buttion, start buttion onclick will run again since its the same button showing.
function endGame(){
        hidebeginning();
        $("#question").text("Correct: " + correctNum+ "   Incorrect: " + incorrectNum);
        $("#answer").text("");
        $("#startbutton").text("Play Again?");
        questionNum = 0;
        time = 10;
        correctNum = 0;
        incorrectNum = 0;
}

//at start of game, hide beginning
hidebeginning();
$("#startbutton").click(function(){
    startbeginning();
});
//show beginning when we start

//check if answer to question is true or false. use appropriate parameter for next question function.
$(".answer").click(function(){
    if($(this).attr("value")==questionBankObj[questionNum].ans){
        //question correct
        //stop timer
        //show answer for a while
        //set time out before starting again and getting a new question
        nextQuestion("correct");
    }else{
        //question wrong
        nextQuestion("notcorrect");
    }
})
});


