var hangMan = {
    gameNameArr: ["mario", "sonic", "ryu", "castlevania", "contra", "crash bandicoot", "street fighter", "super mario world", "zelda", "mortal kombat", "doom", "super metroid", "tomb raider", "final fantasy", "tekken", "goldeneye", "killer instinct", "donkey kong country", "starcraft"],
    gameThemeArr: ["assets/sounds/Super Mario Bros - Main - SNES.mp3", "assets/sounds/Sonic 2 - Chemical Plant.mp3" , "assets/sounds/Hyper Street Fighter II - CPS1 - Ryu Stage.mp3" , "assets/sounds/Castlevania 2 - Simons Quest - Overworld.mp3", "assets/sounds/Contra - Base - NES.mp3", "assets/sounds/Crash Bandicoot - Cortex Power.mp3", "assets/sounds/Hyper Street Fighter II - CPS1 - Player Select.mp3", "assets/sounds/Super Mario World - Overworld.mp3", "assets/sounds/Legend of Zelda - NES - Overworld Theme.mp3", "assets/sounds/Mortal Kombat - Techno Syndrome.mp3", "assets/sounds/Doom 3 - 17 - Intro.mp3", "assets/sounds/Super Metroid - Boss Theme 1.mp3", "assets/sounds/Tomb Raider - Anniversary - Main Theme.mp3", "assets/sounds/Final Fantasy - Mystic Quest - Boss Fight.mp3", "assets/sounds/Tekken 1 - Opening Demo BGM.mp3", "assets/sounds/Goldeneye 007 - N64.mp3", "assets/sounds/Killer Instinct - Main Theme.mp3", "assets/sounds/Donkey Kong Country 1 - Aquatic Ambience.mp3", "assets/sounds/Starcraft.mp3"],
    gameThemePicArr: ["assets/images/71pfQTYz98L._SY679_.jpg", "assets/images/!!eBWBzQBWM_$(KGrHqV,!g8E0fWQq1!mBNQoeMwCV!___1.jpeg", "assets/images/JK62.gif", "assets/images/Castlevania_-_(NA)_-_01.jpg", "assets/images/220px-Contra_cover.jpg", "assets/images/maxresdefault.jpg", "assets/images/snes_street_fighter_ii_2_p_zov0x5.jpg", "assets/images/super-mario-world.jpg", "assets/images/18322front-7116.jpg", "assets/images/snes_mortal_kombat_2_p_n5pa9w.jpg", "assets/images/doom_box.jpg", "assets/images/220px-Smetroidbox.jpg", "assets/images/!!e!T3nwBWM_$(KGrHqUOKpwE0Vqn+umhBNP2dlkLzg___1.jpeg", "assets/images/snes_final_fantasy_2_p_xfzkj6.jpg", "assets/images/37669-tekken5bu5d-1-105391.jpg", "assets/images/n64-goldeneye-007-p-loywkt-1063545.jpg", "assets/images/snes_killer_instinct_p_8fbv6j.jpg", "assets/images/Donkey_Kong_Country_-_North_American_Boxart.png", "assets/images/1004004000003672.jpg"], 
    line: [],
    numberOfGuess: 20,
    guesses: [" "],
    userScore: 0,
    computerScore: 0,
    themeSongArr: [], 
    randomWord: function(){
        hangMan.index = Math.floor(Math.random() * hangMan.gameNameArr.length);
        hangMan.hangmanWord = hangMan.gameNameArr[hangMan.index];
    },
    
    printHangmanLine: function(){
        var kebab = "-";
        var line = [];
        for(var i = 0; i < hangMan.hangmanWord.length; i++){
            if(hangMan.hangmanWord.charAt(i) === " "){
                line[i] = " ";
            }else
            line[i] = kebab;
        }
        line.toString();
        document.getElementById("line").innerHTML = line.join("");
        return line;
    },
    
    userGuessCompare: function (guess){
        for(var i = 0; i < hangMan.hangmanWord.length; i++){
            if (guess === hangMan.hangmanWord.charAt(i)) {
               hangMan.updateHangmanLine(guess,i); 
            }
        }
    },
    
    updateHangmanLine: function(guess, i){
        hangMan.line[i] = guess;
        document.getElementById("line").innerHTML = hangMan.line.join(""); 
    },
    
    numberOfGuesses: function(){
        hangMan.numberOfGuess = hangMan.numberOfGuess - 1;
        document.getElementById("numberOfGuess").textContent = hangMan.numberOfGuess;
        return hangMan.numberOfGuess;
    },
    
    recordGuesses: function(guess){
        hangMan.guesses.push(guess);
        hangMan.guesses.toString();
        document.getElementById("guess").textContent = hangMan.guesses.join("");
    },
    
    recordUserScore: function(){
        hangMan.userScore+=1;
        document.getElementById("userScore").textContent = hangMan.userScore;
    },
    
    recordComputerScore: function(){
        hangMan.computerScore+=1;
        document.getElementById("computerScore").textContent = hangMan.computerScore;
    },
    
    playThemeSong: function(){
        hangMan.gameThemeSong = hangMan.gameThemeArr[hangMan.index];
        var themeSong = document.getElementById("gameThemeSong");
        themeSong.src = hangMan.gameThemeSong;
        themeSong.play();
    },
    
    showBoxArt: function() {
        hangMan.boxArt = hangMan.gameThemePicArr[hangMan.index];
        var art = document.getElementById("imgInsert");
        art.src = hangMan.boxArt;
        document.getElementById("songName").textContent = "Now playing ";
    },
    
    guessCheck: function(){
        for(var i = 0; i < hangMan.guesses.length; i++){
            if(hangMan.userGuess === hangMan.guesses[i]){
                return false;
            }
        }
        return true; 
    }                 
}

// Hangman game logic

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
