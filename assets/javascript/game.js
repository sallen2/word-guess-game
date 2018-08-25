var gameNameArr = ["people", "people", "people"];
var userGuess;
var line;
var hangmanWord;
var numberOfGuess = 16;
var guesses = [];
var userScore = 0;
var computerScore = 0;
var hangMan = {}

function randomWord(){
    hangmanWord = gameNameArr[Math.floor(Math.random() * gameNameArr.length)]
}

function printHangmanLine(){
    var line = ['-'.repeat(hangmanWord.length)];
    line.toString();
    document.getElementById("line").innerHTML = line;
    return line;
}

function userGuessCompare (guess){
    for(var i = 0; i < hangmanWord.length; i++){
        if (guess === hangmanWord.charAt(i)) {
           updateHangmanLine(guess,i); 
        }
    }
}

function updateHangmanLine(guess, i){
    line[i] = guess;
    document.getElementById("line").innerHTML = line.join(""); 
}

function numberOfGuesses(){
    document.onkeypress = function(){
    numberOfGuess = numberOfGuess - 1;
    document.getElementById("numberOfGuess").textContent = numberOfGuess;
    return numberOfGuess;
    }
}

function recordGuesses(guess){
    guesses.push(guess);
    guesses.toString();
    document.getElementById("guess").textContent = guesses.join("");
}

function recordUserScore(){
        userScore+=1;
        document.getElementById("userScore").textContent = userScore;
}

function recordComputerScore(){
    computerScore+=1;
    document.getElementById("computerScore").textContent = computerScore;
}

// computer picks random word
randomWord();
line = printHangmanLine();
numberOfGuesses();

// user guesses
document.onkeydown = function(){
    document.getElementById("currentGuess").textContent = event.key;
    userGuess = document.getElementById("currentGuess").textContent;
        userGuessCompare(userGuess);
        recordGuesses(userGuess);
        var theCorrectWord = document.getElementById("line").textContent;
        if(theCorrectWord === hangmanWord){
            recordUserScore();
            randomWord();
            line = printHangmanLine();
            numberOfGuess = 16;
            guesses =[];
        }else if (numberOfGuess === 0 && theCorrectWord !== hangmanWord){
            recordComputerScore();
            randomWord();
            line = printHangmanLine();
            numberOfGuesses();
            numberOfGuess = 16;
            guesses =[];
        }  
}





 