import {hangMan} from 'hangman.js';

// computer picks random word
hangMan.randomWord();
hangMan.line = hangMan.printHangmanLine();
console.log(hangMan.hangmanWord);
// user guesses
document.onkeydown = function(event){
    document.getElementById("currentGuess").textContent = event.key;
    hangMan.userGuess = document.getElementById("currentGuess").textContent;
    // debugger;
    var Check = hangMan.guessCheck();
    if(Check){
        hangMan.userGuessCompare(hangMan.userGuess);
        hangMan.numberOfGuesses();
        hangMan.recordGuesses(hangMan.userGuess);
    }else{
        hangMan.guesses.push(hangMan.userGuess);
        hangMan.guesses.pop();
    }
    
    var theCorrectWord = document.getElementById("line").textContent;
    if(theCorrectWord === hangMan.hangmanWord){
        hangMan.showBoxArt();
        hangMan.playThemeSong();
        hangMan.recordUserScore();
        hangMan.randomWord();
        hangMan.line = hangMan.printHangmanLine();
        hangMan.numberOfGuess = 21;
        hangMan.guesses =[" "];
        hangMan.recordGuesses();
        document.getElementById("numberOfGuess").textContent = 21;
        document.getElementById("currentGuess").textContent = "";
    }else if (hangMan.numberOfGuess === 0 && theCorrectWord !== hangMan.hangmanWord){
        hangMan.recordComputerScore();
        hangMan.randomWord();
        hangMan.line = hangMan.printHangmanLine();
        hangMan.numberOfGuess = 21;
        hangMan.guesses =[" "];
        hangMan.recordGuesses();
        document.getElementById("numberOfGuess").textContent = 0;
        document.getElementById("currentGuess").textContent = "";
    }  
}
