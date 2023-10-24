const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bird = new Image();
const background = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/flappybird.png";
background.src = "images/flappybg.png";
fg.src = "images/flappyfg.png";
pipeNorth.src = "images/flappypipeNorth.png";
pipeSouth.src = "images/flappypipeSouth.png";

const gap = 85;
let constant;

let bX = 10;
let bY = 150;

const gravity = 1.8;


let score = 0;

document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);

function moveUp(){
    bY -= 30;
};

let pipe = [];

pipe[0] = {
    x:canvas.width,
    y:0
};

console.log('pipe', pipe);

function draw(){
    ctx.drawImage(background, 0, 0);

    for(let i = 0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--;

        if(pipe[i].x === 125){
            pipe.push({
                x:canvas.width,
                y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            })
        }

        // dectect collision
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  canvas.height - fg.height){
            location.reload(); // reload the page
        }


        if(pipe[i].x == 5){
            score++;
        }
    }

    ctx.drawImage(fg,0,canvas.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,canvas.height-20);
    
    requestAnimationFrame(draw);

};

draw();

// const ctx = canvas.getContext("2d");
// canvas.width = innerWidth-4;
// canvas.height = innerHeight-4;
// requestAnimationFrame(mainLoop); // starts the animation

// const gravity = {x: 0, y: 0.1};
// const ground = ctx.canvas.height;  // ground at bottom of canvas.
// const bounce = 0.9; // very bouncy
// const object = {
//     pos: {x: ctx.canvas.width / 2, y: 0}, // position halfway on canvas
//     vel: {x: 0, y: 0}, // velocity
//     size: {w: 10, h: 10},
//     update() {
//         this.vel.x += gravity.x;
//         this.vel.y += gravity.y;
//         this.pos.x += this.vel.x;
//         this.pos.y += this.vel.y;
//         const g = ground - this.size.h; // adjust for size
//         if(this.pos.y >= g) {
//             this.pos.y = g - (this.pos.y - g); // 
//             this.vel.y = -Math.abs(this.vel.y) * bounce;  
//             if (this.vel.y >= -gravity.y) {  // check for rest.
//                 this.vel.y = 0;
//                 this.pos.y = g - gravity.y;
//             }
//         }
//     },
//     draw() { ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h) },
//     reset() { this.pos.y = this.vel.y = this.vel.x = 0 },
// }
// function mainLoop() {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     object.update(); // move object
//     object.draw();
//     requestAnimationFrame(mainLoop);
// }
// canvas.addEventListener("click", object.reset.bind(object));

