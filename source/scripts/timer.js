const timerButton = document.getElementById('timer-button');
let timer = document.getElementById('timer');
    
const sessionTime =  25 + ":" + "0" + 0; //25 minutes
const sBreakTime = "0" + 5 + ":" + "0" + 0; //5 minutes
const lBreakTime = 25 + ":" + "0" + 0;  //15 minutes
let sWork = "Work";
let sBreak = "Break";
    
const title = document.title;   //variable to update title with current time left
let session = document.getElementById("session");
let currSession = session.innerHTML;    //starts with work 

var sessionsCompleted = 0;

timer.innerHTML = sessionTime;
document.title = sessionTime;

timerButton.addEventListener('click', function(){
    pomodoro();
});

function pomodoro(){
    if (timerButton.innerHTML = 'START'){
        timerButton.innerHTML = 'STOP';
        startCountdown();
    }
    else{
        timerButton.innerHTML = 'START';
        resetTimer();
        
    }
}

var timerName;
function startCountdown(){
    let presentTime = timer.innerHTML;
    let timeArray = presentTime.split(/[:]+/);
    let min = checkMinute(timeArray[0] - 0);
    let sec = checkSecond((timeArray[1] - 1));

    if(sec == 59){
        min = min - 1;
        if(min < 10){
            min = "0" + min;
        }
    }
              
    timer.innerHTML = min + ":" + sec;  //update html time
    document.title = timer.innerText;   //update tab title with current time

    timerName = setTimeout(startCountdown, 1000);   //set timeout for 1 second

    if(min == 0 && sec == 0){
        
        if(currSession == sWork){
            sessionsCompleted++;
            currSession = sBreak;
            session.innerHTML = sBreak;
        }
        else{
            currSession = sWork;
            session.innerHTML = sWork;
        }
        
        resetTimer();
    }
}

function resetTimer(){
    clearTimeout(timerName);

    if(currSession == sWork){
        presentTime = sessionTime
        timer.innerHTML = presentTime;
        pomodoro();
    }
    else{
        if(sessionsCompleted != 0 && sessionsCompleted % 4 == 0){
            presentTime = lBreakTime;
            timer.innerHTML = presentTime;
            pomodoro();

        }
        else{
            presentTime = sBreakTime;
            timer.innerHTML = presentTime;
            pomodoro();
        }
    }
    
}

function checkMinute(min){
    if( min <= 9 ){
        min = "0" + min;
    }
    return min;
}
        
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec
    };
    if (sec < 0) {
        sec = "59"
    };
    return sec;
}

/*
<!-- HTML ADDED IF NEEDED TO TEST CODE -->

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Pomodoro-Timer</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
<div id="wrapper">
	<div id="timer"></div>
	<button id="timer-button">START</button><br><br>
    <p id="session">Work</p>

</div>
<script src="timer.js"></script>
</body>
</html>

 */