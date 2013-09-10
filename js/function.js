function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function keyPress(e){
    var keyValue = e.charCode ? e.charCode : e.keyCode;

    switch(keyValue){
        case 37:	// left arrow
            frog.moveLeft();
            break;
        case 38:	// top arrow
            frog.moveUp();
            break;
        case 39:	// right arrow
            frog.moveRight();
            break;
        case 40:	// bottom arrow
            frog.moveDown();
            break;
        case 82:	// "r" reset the game
            startGame();
            break;
    }
}
