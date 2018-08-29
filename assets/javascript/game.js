var gameNameArr = ["mario", "sonic", "ryu", "castlevania", "contra", "crash bandicoot", "street fighter", "super mario world", "zelda", "mortal kombat", "doom", "super metroid", "tomb raider", "final fantasy", "tekken", "goldeneye", "killer instinct", "donkey kong country", "starcraft"];
var gameThemeArr = ["assets/sounds/Super Mario Bros - Main - SNES.mp3", "assets/sounds/Sonic 2 - Chemical Plant.mp3" , "assets/sounds/Hyper Street Fighter II - CPS1 - Ryu Stage.mp3" , "assets/sounds/Castlevania 2 - Simons Quest - Overworld.mp3", "assets/sounds/Contra - Base - NES.mp3", "assets/sounds/Crash Bandicoot - Cortex Power.mp3", "assets/sounds/Hyper Street Fighter II - CPS1 - Player Select.mp3", "assets/sounds/Super Mario World - Overworld.mp3", "assets/sounds/Legend of Zelda - NES - Overworld Theme.mp3", "assets/sounds/Mortal Kombat - Techno Syndrome.mp3", "assets/sounds/Doom 3 - 17 - Intro.mp3", "assets/sounds/Super Metroid - Boss Theme 1.mp3", "assets/sounds/Tomb Raider - Anniversary - Main Theme.mp3", "assets/sounds/Final Fantasy - Mystic Quest - Boss Fight.mp3", "assets/sounds/Tekken 1 - Opening Demo BGM.mp3", "assets/sounds/Goldeneye 007 - N64.mp3", "assets/sounds/Killer Instinct - Main Theme.mp3", "assets/sounds/Donkey Kong Country 1 - Aquatic Ambience.mp3", "assets/sounds/Starcraft.mp3"];
var gameThemePicArr = ["assets/images/71pfQTYz98L._SY679_.jpg", "assets/images/!!eBWBzQBWM_$(KGrHqV,!g8E0fWQq1!mBNQoeMwCV!___1.jpeg", "assets/images/JK62.gif", "assets/images/Castlevania_-_(NA)_-_01.jpg", "assets/images/220px-Contra_cover.jpg", "assets/images/maxresdefault.jpg", "assets/images/snes_street_fighter_ii_2_p_zov0x5.jpg", "assets/images/super-mario-world.jpg", "assets/images/18322front-7116.jpg", "assets/images/snes_mortal_kombat_2_p_n5pa9w.jpg", "assets/images/doom_box.jpg", "assets/images/220px-Smetroidbox.jpg", "assets/images/!!e!T3nwBWM_$(KGrHqUOKpwE0Vqn+umhBNP2dlkLzg___1.jpeg", "assets/images/snes_final_fantasy_2_p_xfzkj6.jpg", "assets/images/37669-tekken5bu5d-1-105391.jpg", "assets/images/n64-goldeneye-007-p-loywkt-1063545.jpg", "assets/images/snes_killer_instinct_p_8fbv6j.jpg", "assets/images/Donkey_Kong_Country_-_North_American_Boxart.png", "assets/images/1004004000003672.jpg"];
var userGuess;
var index;
var line = [];
var hangmanWord;
var themeSong;
var boxArt;
var numberOfGuess = 20;
var guesses = [" "];
var userScore = 0;
var computerScore = 0;
var themeSongArr = [];
var hangMan = {}

function randomWord(){
    index = Math.floor(Math.random() * gameNameArr.length);
    hangmanWord = gameNameArr[index];
    // hangmanWord = gameNameArr[Math.floor(Math.random() * gameNameArr.length)]
}

function printHangmanLine(){
    var kebab = "-";
    var line = [];
    for(var i = 0; i < hangmanWord.length; i++){
        if(hangmanWord.charAt(i) === " "){
            line[i] = " ";
        }else
        line[i] = kebab;
    }
    line.toString();
    document.getElementById("line").innerHTML = line.join("");
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
    numberOfGuess = numberOfGuess - 1;
    document.getElementById("numberOfGuess").textContent = numberOfGuess;
    return numberOfGuess;
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

function playThemeSong(){
    gameThemeSong = gameThemeArr[index];
    var themeSong = document.getElementById("gameThemeSong");
    themeSong.src = gameThemeSong;
    themeSong.play();
}

function showBoxArt() {
    boxArt = gameThemePicArr[index];
    var art = document.getElementById("imgInsert");
    art.src = boxArt;
    document.getElementById("songName").textContent = "Now playing ";
}

function guessCheck(){
    for(var i = 0; i < guesses.length; i++){
        if(userGuess === guesses[i]){
            return false;
        }
    }
    return true; 
}

// computer picks random word
randomWord();
line = printHangmanLine();
// user guesses
document.onkeydown = function(event){
    document.getElementById("currentGuess").textContent = event.key;
    userGuess = document.getElementById("currentGuess").textContent;
    // debugger;
    var Check = guessCheck();
    if(Check){
        userGuessCompare(userGuess);
        numberOfGuesses();
        recordGuesses(userGuess);
    }else{
        guesses.push(userGuess);
        guesses.pop();
    }
    
    var theCorrectWord = document.getElementById("line").textContent;
    if(theCorrectWord === hangmanWord){
        showBoxArt();
        playThemeSong();
        recordUserScore();
        randomWord();
        line = printHangmanLine();
        numberOfGuess = 21;
        guesses =[];
        recordGuesses();
        document.getElementById("numberOfGuess").textContent = 21;
        document.getElementById("currentGuess").textContent = "";
    }else if (numberOfGuess === 0 && theCorrectWord !== hangmanWord){
        recordComputerScore();
        randomWord();
        line = printHangmanLine();
        numberOfGuess = 21;
        guesses =[];
        recordGuesses();
        document.getElementById("numberOfGuess").textContent = 0;
        document.getElementById("currentGuess").textContent = "";
    }  
}
