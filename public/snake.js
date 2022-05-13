

let canvas = document.getElementById('canvas');

let w = window.innerWidth;
let h = window.innerHeight;
console.log(w);
console.log(h);
let ROWS = (h/20)-2//30;
let COLS = (w/20)-2//50;
let PIXEL = 20.;
let gameStatus = "inactive";
let pixels = new Map();
let snakePositions = new Set();
let foodPosition;
let foodPositions = new Map();
let score = 0;

let scoreboard = document.createTextNode(`${score}`);

let board = document.getElementById('score-board');
board.appendChild(scoreboard);
initializeCanvas();
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
            pixel.style.border = "white";
            let position = i+ '_' + j;
            canvas.appendChild(pixel)
            pixels.set(position,pixel);
            

            
        }
    }
    foodPosition = makeFood();
    foodPositions.set(foodPosition);
    
    
    
    
}
function updateScore(){
    score++;
    let scoreboardnew = document.createTextNode(`${score}`);
    
    board = document.getElementById('score-board');
    board.replaceChild(scoreboardnew,scoreboard);
    scoreboard = scoreboardnew;
    
}
function makeFood(){
    
    let foodLoc = Math.floor(Math.random() * ROWS) + '_' + Math.floor(Math.random() * COLS);
    let pixel = pixels.get(foodLoc);
   
    if(!snakePositions.has(foodLoc) ){
        pixel.style.background = "red";
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
        pixel.style.background = "white";
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
                pixel.style.background = 'white';
            }else if(!snakePositions.has(position)  && !foodPositions.has(position) ){

                pixel.style.background = 'black';

            }else if(snakePositions.has(position) && foodPositions.has(position)){
                  pixel.style.background = 'white';
                pixel.style.borderRadius = "0px";
                 foodPositions.delete(position);
                  updateScore();
            }
           

        }
        

    }
    
     }

 let currentSnake = [
     [0,0],
     [0,1],
     [0,2],
     [0,3],
     [0,4],
     [0,5],
     [0,6],
     [0,7]
 ]
 

 function step(){
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
 
 
 window.addEventListener('keydown',(e) =>{
                        
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

 })

drawSnake(currentSnake);

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
function gameController(command,speed){
    
    if(command == "start" && gameStatus != "active"){
        gameStatus = "active";
         gameInterval = setInterval(()=>{
        if(score%5 == 0 && score != 0 && speed >=50){
            score++;
            gameStatus="inactive";
            clearInterval(gameInterval);
            speed-=20;
            gameController("start",speed)
           
            }
            step();
        },speed);
    }
    if(command == "end"){
        gameStatus = "inactive";
        canvas.style.borderColor  = 'red';
        clearInterval(gameInterval);
        initializeCanvas();
        location.reload();
    }
}
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    let speed = 100;
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
        } else {
            /* down swipe */
             directionQueue.push(moveDown);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

