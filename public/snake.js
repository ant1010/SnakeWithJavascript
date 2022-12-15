let prev = "false";


let canvas,form1,w,h,ROWS,COLS,PIXEL,user,gameStatus,pixels,snakePositions,foodPositions,score,scoreboard,board,currentSnake;
let form;
let backgroundColor = "#F4D8CD";
let snakeColor = "#1E555C";
let foodColor = "#F15152";
initGlobalVariables();
initializeCanvas();
window.addEventListener( 'load', ()=>{
    user = sessionStorage.getItem('user')
    startScreen =  document.getElementById("start-modal");
   
    if(sessionStorage.getItem('user') != null && user != "null" ){
        console.log("user:" + user);
        prev = "true";
        console.log("does it work" + user);
                        tapStartText = document.getElementById("tapStartText");
                        tapStartText.style.display = "block";
    
    }else{
                        
                        startScreen.style.display = "block";

                        }
                        });
window.addEventListener( 'unload', ()=>{
    sessionStorage.setItem("player", "true");
    sessionStorage.setItem("user", user);
    
                        });

function touchStart(){
    gameController("start",150);
}


function initGlobalVariables(){
   
    canvas = document.getElementById('canvas');
    
    w = window.innerWidth;
     h = window.innerHeight;
     ROWS = ((h/20))-2//30;
     COLS = ((w/20))-2//50;
     PIXEL = 20;
    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    
    if(window.mobileCheck()){
        
        ROWS = ((h/20)/3)-2//30;
        COLS = ((w/20)/3)-1//50;
        PIXEL = 60;
    }
    
     user = "null";
     gameStatus = "inactive";
     pixels = new Map();
     snakePositions = new Set();
    
     foodPositions = new Map();
     score = 0;
     scoreboard = document.createTextNode(`${score}`);
    
     board = document.getElementById('score-corner');
     board.appendChild(scoreboard);
  
   
    console.log("score:" + score);
     currentSnake = [
                        
                        [0,2],
                        [1,2],
                        [2,2],
                        [3,2],
                        [4,2],
                        [5,2],
                        [6,2],
                        
                        ]
   
    
}
function gameController(command,speed){
    
    if(command == "start" && gameStatus != "active"){
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        let s = document.getElementById("start-modal");
        s.style.display = "none";
        drawSnake(currentSnake);
        gameStatus = "active";
        tapStartText = document.getElementById("tapStartText");
        tapStartText.style.display = "none";
        gameInterval = setInterval(()=>{
                                   if(score%5 == 0 && score != 0 && speed >=50){
                                   score++;
                                   gameStatus="inactive";
                                   clearInterval(gameInterval);
                                   speed-=10;
                                   
                                   gameController("start",speed)
                                   
                                   }
                                   step();
                                   },speed);
    }
    if(command == "end"){
       
        if(user == "null" || user == null){
            form1 = document.getElementById("prompt-form-container");
            form1.style.display = "inline-block";
            
        }
        
        if(user != null){
        console.log("user149:" + user);
        updateHighScore();
        getHighScore();
        }
        
        gameStatus = "inactive";
        canvas.style.borderColor  = 'red';
        clearInterval(gameInterval);
        gameOver();
        
    }
}
function detectMob() {
    
    return ( ( window.innerWidth <= 400 ) && ( window.innerHeight <= 300 ) );
}
function initializeCanvas(){
   

    for(let i = 0; i < ROWS; i++){
        for( let j = 0; j < COLS; j++){
            let pixel = document.createElement('div');
            pixel.style.position = "absolute";
            pixel.style.border  = '1px white'
            pixel.style.left = j * PIXEL + 'px';
            pixel.style.top = i * PIXEL + 'px';
            pixel.style.width = PIXEL + 'px';
            pixel.style.height = PIXEL + 'px';
            pixel.style.border = "black";
           
            
            let position = i+ '_' + j;
            canvas.appendChild(pixel)
            pixels.set(position,pixel);
            

            
        }
    }
    foodPosition = makeFood();
    foodPositions.set(foodPosition);
    
    
    
    
}




function gameOver(){
    window.removeEventListener('keydown',gameControls);
    document.removeEventListener('touchstart', handleTouchStart, false);
    document.removeEventListener('touchmove', handleTouchMove, false);
    
    console.log("user"+user);
    
    var modal = document.getElementById("myModal");
    
    var home = document.getElementById("home-restart");
    modal.style.display = "block";
    
    var scoreText = document.getElementById("modalText4");
    var finalScore = document.createTextNode(`${score}`);
    scoreText.appendChild(finalScore);
    
    
   
   }




async function updateHighScore(){
    if(user == "null" || user == "Anonymous"){
        console.log("user is " + user );
        return;
    }
    let prevscore = await hasPrevScore();
    console.log(prevscore);
    let update = true;
    //s.then((data) => {prevscore = data;console.log(prevscore)});
  
    if(prevscore != null){
        //if prevscore = true update score
        if(prevscore == true){
            console.log("updated new high score");
            
        }else{//if false no update
            console.log("high score not reached");
            return;
        }
    }else {
        console.log("added new player");
        update = false;
    }
    const data = {update,user,score};
    let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
    let response = await fetch('/api/a',options);
    let json = await response.json();
    

}
async function hasPrevScore(){
    if(user == "null" || user == "Anonymous"){
        return;
    }
    var youDied = document.getElementById("modalText0");
    youDied.style.color = "#B85128";
    var diedBanner = document.createTextNode(`${user}, you DIED.`);
    youDied.appendChild(diedBanner);
    
    let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    };
    console.log(user);
    let url = `/api/scores/${user}`;
    let json = await fetch(url).then((data) => data.json());
    console.log(json);
    if(json.length > 0){
        var currentTopScores = document.getElementById("modalText3");
        var currentTopScore = document.createTextNode(`${json[0].score}`);
        currentTopScores.appendChild(currentTopScore);
    }else{
        var currentTopScores = document.getElementById("modalText3");
        var currentTopScore = document.createTextNode(`${score}`);
        currentTopScores.appendChild(currentTopScore);
    }
    
    if(json == "undefined" || json.length == 0){
        console.log("check");
        return null;//null if user is not in the system
    }else if(score > json[0].score){
        return true;//true if score is higher than prev
    }
    
    return false;//false if user in system and new score not higher
    
}
async function getHighScore(){
    const data = {user,score};
    let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    };
 
    let response = await fetch('/api');
    let json = await response.json();
    console.log(json);
    let highest = 0;
    let scoreUser = "";
    for(let i in json){
        if(json[i].score > highest){
            highest = json[i].score;
            scoreUser = json[i].user;
        }
       
    }
    console.log(highest);
    //confirm("Highest score:" + highest);
    if(user != "null"){
    var topScores = document.getElementById("modalText2");
    var topScore = document.createTextNode(`${scoreUser}: ` + `${highest}`);
   
    topScores.appendChild(topScore);
    }
    return highest;
}

function updateScore(){
    score++;
    let scoreboardnew = document.createTextNode(`${score}`);
    
    board = document.getElementById('score-corner');
    board.replaceChild(scoreboardnew,scoreboard);
    scoreboard = scoreboardnew;
    
}
function makeFood(){
    
    let foodLoc = Math.floor(Math.random() * ROWS) + '_' + Math.floor(Math.random() * COLS);
    let pixel = pixels.get(foodLoc);
   
    if(!snakePositions.has(foodLoc) ){
        
        pixel.style.background = foodColor;
        pixel.style.borderRadius = "50px";
        pixel.style.animation = "pulse2 .5s ease-in 0s alternate 1 none running"
    }
    return foodLoc;
   
}

function notFoodPosition(position){
    for(let i of foodPositions){
        if(position != foodPositions[0]){
            return true;
        }
        
        
    }
    
   return false;
}
function drawSnake(snake){
    snakePositions.clear();
    for(let [x,y] of snake){
        let position = x + '_' + y;
        snakePositions.add(position);
    }
    if(snakePositions.has(foodPosition)){   //food is eaten
        updateScore();
        let pixel = pixels.get(foodPosition);
        pixel.style.background = snakeColor;
        pixel.style.borderRadius = "0px";
        foodPositions.delete(foodPosition);
        foodPosition = makeFood();
        foodPositions.set(foodPosition);
    }
    for(let i = 0 ; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            let position = i+ '_' + j;
            let pixel = pixels.get(position);
            let good = notFoodPosition(position);
            if(snakePositions.has(position) && !foodPositions.has(position)){
                pixel.style.background = snakeColor;
            }else if(!snakePositions.has(position)  && !foodPositions.has(position) ){

                pixel.style.background = backgroundColor;

            }else if(snakePositions.has(position) && foodPositions.has(position)){
                  pixel.style.background = snakeColor;
                  pixel.style.borderRadius = "0px";
                  foodPositions.delete(position);
                  updateScore();
            }
           

        }
        

    }
    
     }


 

 function step(){
     let  hint = document.getElementById('hint');
     if(score >= 5){
         hint.style.display = "block";
     } if(score >= 10){
         hint.style.display = "none";
     }
     currentSnake.shift();
    
     let head = currentSnake[currentSnake.length-1]
     let nextDirection = currentDirection;
     while(directionQueue.length > 0){
     let candidateDirection = directionQueue.shift();
     if(areOpposite(candidateDirection,currentDirection)){
        continue;
     }
     nextDirection = candidateDirection;
     break;
    }

     
     currentDirection = nextDirection;
     let nextHead = currentDirection(head);
     if(!isValidNext(snakePositions,nextHead)){
         gameController("end");
         return;
     }
     currentSnake.push(nextHead);
     

     drawSnake(currentSnake);
    

 }
function areOpposite(dir1,dir2){

    if(dir1 === moveLeft && dir2 === moveRight){
        return true;
    }
    if(dir1 === moveRight && dir2 === moveLeft){
        return true;
    }
    if(dir1 === moveUp && dir2 === moveDown){
        return true;
    }
    
    if(dir1 === moveDown && dir2 === moveUp){
        return true;
    }

        return false;
    

    
}
 let moveRight = ([r,c]) => [r,c + 1]; 
 let moveLeft = ([r,c]) => [r,c - 1]; 
 let moveUp = ([r,c]) => [r - 1,c]; 
 let moveDown = ([r,c]) => [r + 1,c]; 
 let currentDirection = moveRight;
 let directionQueue = [];


 
window.addEventListener('keydown',gameControls);
                         function gameControls(e){
                         if(gameStatus != "inactive" || e.key == " "){
                         switch(e.key){
                         case "ArrowDown":
                         directionQueue.push(moveDown);
                         break;
                         case "s":
                         directionQueue.push(moveDown);
                         break;
                         case "ArrowUp":
                         let food = makeFood();
                         foodPositions.set(food);
                         directionQueue.push(moveUp)
                         break;
                         case "w":
                         
                         directionQueue.push(moveUp)
                         break;
                         case "ArrowLeft":
                         directionQueue.push(moveLeft);
                         break;
                         case "a":
                         directionQueue.push(moveLeft);
                         break;
                         case "ArrowRight":
                         directionQueue.push(moveRight);
                         break;
                         case "d":
                         directionQueue.push(moveRight);
                         break;
                         case " ":
                         let speed = 100;
                         gameController("start",speed);
                         break;
                         }
                         }
                         
                      

}
    


function isValidNext(snakePosition,[row,col]){
    if(row < 0 || col < 0){
        return false;
    }
    if(row > ROWS || col > COLS){
        return false;
    }
    let position = row + "_" + col;
    if(snakePosition.has(position)){
        return false;
    }
    return true;
}


var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    let speed = 120;
    gameController("start",speed);
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
             /* left swipe */
            directionQueue.push(moveLeft);
        } else {
            /* right swipe */
             directionQueue.push(moveRight);
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
             directionQueue.push(moveUp);
            let food = makeFood();
            foodPositions.set(food);
        } else {
            /* down swipe */
             directionQueue.push(moveDown);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

function nameSubmitForm(){
    form = document.getElementById('prompt-form');
    const name = form.elements['text'];
    if(name.value.length > 0){
        user = name.value;
        console.log(user);
        event.preventDefault();
        updateHighScore();
        getHighScore();
        
    }else{
        user = "null";
        
    }
     console.log("form" + name.value);
    
     form1.style.display = "none";
}
function playAgainClick(){
    location.reload();
    console.log("playagain");
    startScreen =  document.getElementById("start-modal");
    startScreen.style.display = "none";
    
}
function homeResetClick(){
    
    user = "null";
    location.reload();
    
}

function startClick(){
    console.log("start");
    startScreen =  document.getElementById("start-modal");
    startScreen.style.display = "none";
    gameController("start",150);
    
}
