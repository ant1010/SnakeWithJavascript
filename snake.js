let canvas = document.getElementById('canvas');

let ROWS = 30;
let COLS = 50;
let PIXEL = 20;

let pixels = new Map();

function initializeCanvas(){

    for(let i = 0; i < ROWS; i++){
        for( let j = 0; j < COLS; j++){
            let pixel = document.createElement('div');
            pixel.style.position = "absolute";
            pixel.style.border  = '1px solid grey'
            pixel.style.left = j * PIXEL + 'px';
            pixel.style.top = i * PIXEL + 'px';
            pixel.style.width = PIXEL + 'px';
            pixel.style.height = PIXEL + 'px';
            let position = i+ '_' + j;
            canvas.appendChild(pixel)
            pixels.set(position,pixel);
            

            
        }
    }
}
initializeCanvas();

drawSnake([
    [0,0],
    [0,1],
    [0,2],
    [0,4]
])

function drawSnake(snake){
    let snakePositions = new Set();
    for(let [x,y] of snake){
        let position = x + '_' + y;
        snakePositions.add(position);
    }
    for(let i = 0 ; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            let position = i+ '_' + j;
            let pixel = pixels.get(position);
            pixel.style.background = snakePositions.has(position)?
            'black':'white';
        }

    }
 }

 let currentSnake = [
     [0,0],
     [0,1],
     [0,2],
     [0,3]
 ]
 

 function step(){
     currentSnake.shift();
     let head = currentSnake[currentSnake.length-1]
     let nextHead = currentDirection(head);
     currentSnake.push(nextHead);
     
     drawSnake(currentSnake);

 }
 let moveRight = ([r,c]) => [r,c + 1]; 
 let moveLeft = ([r,c]) => [r,c - 1]; 
 let moveUp = ([r,c]) => [r - 1,c]; 
 let moveDown = ([r,c]) => [r + 1,c]; 
 let currentDirection = moveDown;

 window.addEventListener('keydown',(e) =>{
     switch(e.key){
         case "ArrowDown":
         currentDirection = moveDown;
         break;
         case "ArrowUp":
         currentDirection = moveUp;
         break;
         case "ArrowLeft":
         currentDirection = moveLeft;
         break;
         case "ArrowRight":
         currentDirection = moveRight;
         break;

     }

 })

 drawSnake(currentSnake);

 

setInterval(()=>{
    step();
},100);

 