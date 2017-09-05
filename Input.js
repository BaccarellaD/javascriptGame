let input = [];
input.leftArrow = false;
input.rightArrow = false;
input.restart = false;
input.upArrow = false;
input.upArrowReturn = true;
input.downArrow = false;
input.downArrowReturn = true;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyUpHandler(e) {
    if(e.keyCode === 39) {
        input.rightArrow = false;
    }
    if(e.keyCode === 38) {
        input.upArrowReturn = true;
    }
    if(e.keyCode === 37) {
        input.leftArrow = false;
    }
    if(e.keyCode === 40) {
        input.downArrow = false;
        input.downArrowReturn = true;
    }

}

function keyDownHandler(e) {
    if(e.keyCode === 39) {
        input.rightArrow = true;
    }
    if(e.keyCode === 82) {
        input.restart = true;
    }
    if(e.keyCode === 38) {
        if(input.upArrowReturn) {
            input.upArrow = true;
            input.upArrowReturn = false;
        }
    }
    if(e.keyCode === 37) {
        input.leftArrow = true;
    }
    if(e.keyCode === 40) {
        if(input.downArrowReturn) {
            input.downArrow = true;
        }
    }
}

