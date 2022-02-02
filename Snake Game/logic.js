const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');
WIDTH = 620;
HEIGHT = 500;
cvs.heigh = HEIGHT;
cvs.width = WIDTH;
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
}

let score = 0;

document.addEventListener("keydown" , direction);

let d;

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

function direction(event)
{
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }
    else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }
    else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }
    else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

function draw() {
    ctx.drawImage(ground,0,0);

    for(let i=0 ; i< snake.length ; i++){
        ctx.fillStyle = (i==0)?"red":"white";
        ctx.fillRect(snake[i].x , snake[i].y , box , box);

        ctx.strokeStyle = "green"; 
        ctx.strokeRect(snake[i].x , snake[i].y , box , box);
    }

    ctx.drawImage(foodImg , food.x , food.y);

    ctx.fillStyle = "white";
    ctx.font = "45px Verdana";
    ctx.fillText(score , 2.5*box , 1.6*box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d=="LEFT") snakeX -= box;
    if(d=="UP") snakeY -= box;
    if(d=="RIGHT") snakeX += box;
    if(d=="DOWN") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }


    if(snakeX == food.x && snakeY==food.y){
        score++;
        eat.play();

        food = { 
        x: Math.floor(Math.random()*17+1)*box,
        y: Math.floor(Math.random()*15+3)*box
        }
    }
    else{
        snake.pop();
    }

    window.addEventListener("keydown" , (e)=>{
        if(e.keyCode == 13){
            window.location.reload();
        }
    });

    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead , snake))
    {
        clearInterval(game);
        dead.play();
        var gradient = ctx.createLinearGradient(0,0,cvs.width,0);
        gradient.addColorStop("0" , "magenta");
        gradient.addColorStop("0.5" , "#0af0dd");
        gradient.addColorStop("1.0" , "red");
        ctx.font = "50px Verdana";
        ctx.fillStyle = gradient; 
        ctx.fillText("GAME OVER!"  , cvs.width / 4.5 , cvs.height / 1.8);
    }

    snake.unshift(newHead);
}

function collision(headd,aarray){
    for(let i = 0; i < aarray.length; i++){
        if(headd.x == aarray[i].x && headd.y == aarray[i].y){
            return true;
        }
    }
    return false;
}


let game = setInterval(draw,100);