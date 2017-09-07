
alert("Hello!");

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let startx = canvas.width/2;
let starty = canvas.height/2 - 100;
let count = 0;
let speed = 20;
let info = document.getElementById("info");

function drawGrid() {
let horizontalLines = canvas.height/20;
let verticalLines = canvas.width/20;

//Picks larger amount of lines to fill screen and make a grid
let iter =  horizontalLines > verticalLines ? horizontalLines : verticalLines;

    for(let i = 0; i < iter; i++) {
        ctx.beginPath();
        ctx.moveTo((i+1)*20,0);
        ctx.lineTo((i+1)*20,canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0,(i+1)*20);
        ctx.lineTo(canvas.width,(i+1)*20);
        ctx.stroke();
    }

}


let playBlock = new Block();
let blockList = [];
let leftSideCollision = function(){

    for(let i = 0; i < blockList.length; i++) { //TODO: rework to work better with vertical blocks
        let block = blockList[i];
        console.log("block X: " + block.middlex);
        console.log("playBlock X: " + playBlock.middlex);
        if (playBlock.middlex-block.middlex <= block.width &&
            playBlock.middlex-block.middlex >= 0 &&
            Math.abs(playBlock.middley-block.middley) <= block.width) {
                return true;
        }
    }
    return playBlock.middlex <= 0;
};

let rightSideCollision = function(){

    for(let i = 0; i < blockList.length; i++) { //TODO: rework to work better with vertical blocks
        let block = blockList[i];
        if (playBlock.middlex-block.middlex <= block.width &&
            playBlock.middlex-block.middlex <= 0 &&
            playBlock.middlex-block.middlex >= -block.width &&
            Math.abs(playBlock.middley-block.middley) <= block.width) {
                return true;
        }
    }

    return (playBlock.middlex + playBlock.width)>= canvas.width;
};


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(input.leftArrow || input.rightArrow) {
        if(input.leftArrow) {
            if(!leftSideCollision()) {
                playBlock.dx = -20;
                input.leftArrow = false
            }
        }
        if(input.rightArrow) {
            if(!rightSideCollision()) {
                playBlock.dx = 20;
                input.rightArrow = false
            }
        }
    }
    else {
        playBlock.dx = 0;
    }

    if(input.downArrow) {
        count = 19;
    }


    if(input.upArrow) {
        playBlock.rotate();
        input.upArrow = false;
    }

    if(input.restart) {
        blockList.splice(0,blockList.length);
        playBlock.setPos(startx,starty);
        playBlock.bottomy = starty;
        input.restart = false;
    }

    if(playBlock.stopped) {
        if(playBlock.middley === starty) {
            blockList.splice(0,blockList.length);
            playBlock = new Block();
        } else {
            blockList.push(playBlock);
            playBlock = new Block();
        }
    }
    drawGrid();
    playBlock.update();


    //Collision check with the play block and the placed blocks
    for(let i = 0; i < blockList.length; i++) {
            let block = blockList[i];
            block.update();


        if (playBlock.middlex < block.middlex + block.width &&
            playBlock.middlex + playBlock.width > block.middlex &&
            playBlock.middley + 20  < block.middley + block.height &&
            playBlock.height + playBlock.middley + 20  > block.middley) {


            playBlock.stopped = true;
            playBlock.dy = 0;
            break;
        }
    }




}






setInterval(draw, 10);