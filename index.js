function start() {
// start is run when user click the new button
// before you can start a new game game must be stopped manually first
// therefore if a persone hits the new button, it checks if the flag has been set
// in the stop function which is called if someone clicked stopped
// if it wasnt clicked first a message shows, to tell them to first click stop before
// pressing the new button.
// however if this is a brand new game, then its will start even without the stop being pressed.
// it knows this is a new start by looking at the newstart flag



let homeScoreSum = 0;
let guestScoreSum = 0;
let homeScore = document.querySelector('.home-score-value');
let guestScore = document.querySelector('.guest-score-value');
let homeFouls = document.querySelector('.home-score-fouls');
let guestFouls = document.querySelector('.guest-score-fouls');
let countDown = document.querySelector('.count-down');
initializeForNewGame(); // resets the variables and score display vales
function initializeForNewGame() {
    
    
    homeScore.textContent = 0;
    guestScore.textContent = 0;
    homeFouls.textContent = 0;
    guestFouls.textContent = 0;
    homeScore.classList.remove("green");
    guestScore.classList.remove("green");
}

// gets hooks for the buttons and other values needed to be populated

let homeEmoji = document.querySelector('.home-side .emoji');
let guestEmoji = document.querySelector('.guest-side .emoji');
let happyEmoji  = ['😁','🥳','😂',' 😛 '];
let sadEmoji = ['😟','😡','😟','🥸'];
let homeOneBtn = document.querySelector('.home-side .one-point');
let homeTwoBtn = document.querySelector('.home-side .two-point');
let homeThreeBtn = document.querySelector('.home-side .three-point');
let guestOneBtn = document.querySelector('.guest-side .one-point');
let guestTwoBtn = document.querySelector('.guest-side .two-point');
let guestThreeBtn = document.querySelector('.guest-side .three-point');

let seconds = 60;
let minutes = 59;
let strMinutes, strSeconds;

homeOneBtn.addEventListener('click',function() {
    addScore(1,1);
});
homeTwoBtn.addEventListener('click',function() {
    addScore(1,2);
});
homeThreeBtn.addEventListener('click',function() {
    addScore(1,3);
});

guestOneBtn.addEventListener('click',function() {
    addScore(2,1);
});
guestTwoBtn.addEventListener('click',function() {
    addScore(2,2);
});
guestThreeBtn.addEventListener('click',function() {
    addScore(2,3);
});
let timeCaught;
let timerId;
// continueGame call by the continue button
function continueGame() {
    timerId = setInterval(function() {
        seconds--;
        if (seconds == 0) {
            minutes--;
            seconds = 59;
            
            
        } 
        if (minutes < 10)   
            strMinutes = '0' + minutes;
        else 
           strMinutes = minutes;
        if (seconds < 10) 
            strSeconds = '0' + seconds;
        else
           strSeconds = seconds; 
        
        if (minutes == 0 & seconds <= 1) { 
            clearInterval(timerId);
            countDown.textContent = 'END';
        } else {
            countDown.textContent = strMinutes + ':' + strSeconds;
        }
    },1000);
}
// called by the stop button
function stop() {
    
    clearInterval(timerId);
    timeCaught = countDown.textContent;
    minutes = parseInt(timeCaught.substring(0,2));
    seconds = parseInt(timeCaught.substring(3,5));
    gameStopped = true;
    
    
    
}  
// called by the continue button  
continueGame();
function addScore(team,val) {
    if (team == 1) {
        switch (val) {
            case 1: 
                homeScoreSum++;
                break;
            case 2: 
                homeScoreSum+=2;
                break;
            case 3: 
                homeScoreSum+=3;
            break;    
        }
        homeScore.textContent = homeScoreSum;
    } else if (team == 2) {
        switch (val) {
            case 1: 
                guestScoreSum++;
                break;
            case 2: 
                guestScoreSum+=2;
                break;
            case 3: 
                guestScoreSum+=3;
            break;    
        }
        guestScore.textContent = guestScoreSum;
    }
    if (homeScoreSum > guestScoreSum) {
        homeScore.classList.add("green");
        guestScore.classList.remove("green");
        homeEmoji.textContent = happyEmoji[Math.floor(Math.random()*4)];
        guestEmoji.textContent = sadEmoji[Math.floor(Math.random()*4)];

    } else if (homeScoreSum < guestScoreSum) {
        guestScore.classList.add("green");
        homeScore.classList.remove("green");
        homeEmoji.textContent = sadEmoji[Math.floor(Math.random()*4)];;
        guestEmoji.textContent = happyEmoji[Math.floor(Math.random()*4)];;
    } else if (homeScoreSum == guestScoreSum) {
        homeScore.classList.remove("green");
        guestScore.classList.remove("green");
        homeEmoji.textContent = happyEmoji[0];;
        guestEmoji.textContent = happyEmoji[0];

    }
    
}

let homeScoreFouls = 0;
let guestScoreFouls = 0;

let homeAddFouls = document.querySelector('.h-add');

let homeSubtractFouls = document.querySelector('.h-subtract');
let guestAddFouls = document.querySelector('.g-add');
let guestSubtractFouls = document.querySelector('.g-subtract');

homeAddFouls.addEventListener('click',function() {
    addFouls(1,1);
});
homeSubtractFouls.addEventListener('click',function() {
    addFouls(1,2);
});
guestAddFouls.addEventListener('click',function() {
    addFouls(2,1);
});
guestSubtractFouls.addEventListener('click',function() {
    addFouls(2,2);
});

function addFouls(team,val) {
    if (team == 1) {
        switch (val) {
            case 1: 
                homeScoreFouls++;
                break;
            case 2: 
                if (homeScoreFouls > 0) {
                    homeScoreFouls--;
                }
                break;
              
        }
        homeFouls.textContent = homeScoreFouls;
    } else if (team == 2) {
        switch (val) {
            case 1: 
                guestScoreFouls++;
                break;
            case 2: 
                if (guestScoreFouls > 0) {
                    guestScoreFouls--;
                }
                break;
                
              
        }
        guestFouls.textContent = guestScoreFouls;
    }
    
}
// new-game-buttons
let stopGamebtn = document.querySelector('.stop-game-btn');
let continueGamebtn = document.querySelector('.continue-game-btn')
stopGamebtn.addEventListener('click',stop);
continueGamebtn.addEventListener('click',continueGame);
// change countdown timer
let increaseMinBtn;
let decreaseMinBtn;
let increaseSecBtn;
let decreaseSecBtn;

increaseMinBtn = document.querySelector('.timer .m-add');
decreaseMinBtn = document.querySelector('.timer .m-subtract');
increaseSecBtn = document.querySelector('.timer .s-add');
decreaseSecBtn = document.querySelector('.timer .s-subtract');

increaseMinBtn.addEventListener('click',function() {
    changeTimer(1,1);
});
decreaseMinBtn.addEventListener('click',function() {
    changeTimer(1,2);
});
increaseSecBtn.addEventListener('click',function() {
    changeTimer(2,1);
});
decreaseSecBtn.addEventListener('click',function() {
    changeTimer(2,2);
});

function changeTimer(type,change) {
    // type 1 = minutes
    // type 2 = seconds
    // change 1 = increase by 1
    // change 2 = decrease by 1
    timeCaught = countDown.textContent;
    
    minutes = parseInt(timeCaught.substring(0,2));
    
    seconds = parseInt(timeCaught.substring(3,5));
    if (type == 1) { //minutes
      if (change == 1) // increase
        minutes++;
      else 
        minutes--;
    }
    if (minutes > 59) 
        minutes = 59;
    if (minutes < 0) 
        minutes = 0; 
            
    if (type == 2) { //seconds
        if (change == 1) // increase
          seconds++;
        else 
          seconds--;
    }
    if (seconds > 59) 
        seconds = 59;
    if (seconds < 0) 
        seconds = 0; 

    if (minutes < 10)   
        strMinutes = '0' + minutes;
    else 
       strMinutes = minutes;
    if (seconds < 10) 
        strSeconds = '0' + seconds;
    else
       strSeconds = seconds;   
    
    countDown.textContent = strMinutes + ':' + strSeconds;



    
    

}






function reset() {
    guestScoreFouls = 0;
    homeScoreFouls = 0;
    guestScoreSum = 0;
    homeScoreSum = 0;
    guestFouls.textContent = 0;
    homeFouls.textContent = 0;
    guestScore.textContent = 0;
    homeScore.textContent = 0;
    
    seconds = 60;
    minutes = 3;
    
    
    
    


}


} // end start()
let c = (...args) => console.log(...args);
let newGame = true;
let gameStopped = false;
let errorMessage = document.querySelector('.error-message');

let newGameBtn = document.querySelector('.new-game-btn');
newGameBtn.addEventListener('click',function() {
    
    if (gameStopped || newGame) {
        errorMessage.textContent = '';
        newGame = false;
        gameStopped = false;
        start();
    } else {
        
        // alert('Stop game first, before starting a new game');
        errorMessage.textContent = 'Press the stop button, then a new game !';
        
    }

});




