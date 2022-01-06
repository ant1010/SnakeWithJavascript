let canvas = document.getElementById('canvas');

let ROWS = 30;
let COLS = 50;
let PIXEL = 20;
let gameStatus = "inactive";
let pixels = new Map();
let snakePositions = new Set();
let foodPosition;
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
            let position = i+ '_' + j;
            canvas.appendChild(pixel)
            pixels.set(position,pixel);
            

            
        }
    }
    foodPosition = makeFood();
}

function makeFood(){
    let foodLoc = Math.floor(Math.random() * ROWS) + '_' + Math.floor(Math.random() * COLS);
   
    let pixel = pixels.get(foodLoc);
    if(!snakePositions.has(foodLoc)){
        pixel.style.background = "purple";
    }
    return foodLoc;
   
}

function drawSnake(snake){
    snakePositions.clear();
    for(let [x,y] of snake){
        let position = x + '_' + y;
        snakePositions.add(position);
    }
    if(snakePositions.has(foodPosition)){                //food is eaten
        let pixel = pixels.get(foodPosition);
        pixel.style.background = "black";
        foodPosition = makeFood();
    }
    for(let i = 0 ; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            let position = i+ '_' + j;
            let pixel = pixels.get(position);
            
            if(snakePositions.has(position)  && foodPosition != position){
                pixel.style.background = 'black';
            }else if((!snakePositions.has(position) && !(position == foodPosition))  ){

                pixel.style.background = 'white';

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
     
     switch(e.key){
         case "ArrowDown":
         directionQueue.push(moveDown);
         break;
         case "ArrowUp":
         
         directionQueue.push(moveUp)
         break;
         case "ArrowLeft":
         directionQueue.push(moveLeft);
         break;
         case "ArrowRight":
         directionQueue.push(moveRight);
         break;
        case " ":
        gameController("start");
        break;
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
function gameController(command){
    
    if(command == "start" && gameStatus != "active"){
        gameStatus = "active";
         gameInterval = setInterval(()=>{
            step();
        },100);
    }
    if(command == "end"){
        canvas.style.borderColor  = 'red';
        clearInterval(gameInterval);
        location.reload();
    }
}



 