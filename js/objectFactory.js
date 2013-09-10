var SPEED = 1;
var DIRECTION_LEFT = false;
var DIRECTION_RIGHT = true;
var HEIGHT = 450;
var WIDTH = 650;
var BLOC = 32;
var MARGIN_TOP = 30;
var SPEED_CAR1 = getRandomSpeed();
var SPEED_CAR2 = getRandomSpeed();
var SPEED_CAR3 = getRandomSpeed();
var SPEED_CAR4 = getRandomSpeed();
var SPEED_CAR5 = getRandomSpeed();
var SPEED_WOOD1 = getRandomSpeed();
var SPEED_WOOD2 = getRandomSpeed();
var SPEED_WOOD3 = getRandomSpeed();
var SPEED_TURTLE = getRandomSpeed();
var SPEED_TURTLE2 = getRandomSpeed();

function getRandomSpeed(){
    return (Math.floor(Math.random() * 90) + 100) / 200 ;
}

// table for move frog on platform
var speeds = [0, 0, 0, 0, 0,
    0, 0, -SPEED_WOOD1, SPEED_TURTLE, -SPEED_WOOD2,
    SPEED_WOOD3, -SPEED_TURTLE2];



function Objects(type, spacing){
    this.posX;
    this.posY;
    this.direction;
    this.picture;
    this.speed;
    this.width;
    this.typeCase = type;

//////// START INITIALISATION

    this.picture = new Image();
    switch(type){
        case 1:
            this.posY = 1;
            this.direction = false;
            this.picture.src = 'media/bigrig.png';
            this.speed = SPEED_CAR1;
            break;
        case 2:
            this.posY = 2;
            this.direction = true;
            this.picture.src = 'media/car.png';
            this.speed = SPEED_CAR2;
            break;
        case 3:
            Objects.apply(this);
            this.posY =  3;
            this.direction = false;
            this.picture.src = 'media/hotrod.png';
            this.speed = SPEED_CAR3;
            break;
        case 4:
            this.posY =  4;
            this.direction = true;
            this.picture.src = 'media/hotrod2.png';
            this.speed = SPEED_CAR4;
            break;
        case 5:
            this.posY =  5;
            this.direction = false;
            this.picture.src = 'media/tractor.png';
            this.speed = SPEED_CAR5;
            break;
        //wood medium
        case 6:
            this.posY =  7;
            this.direction = false;
            this.picture = new Image();
            this.picture.src = 'media/wood_medium.png';
            this.speed = SPEED_WOOD1;
            break;
        // turtle double
        case 7:
            this.posY =  8;
            this.direction = true;
            this.picture.src = 'media/turtles_double.png';
            this.speed = SPEED_TURTLE;
            break;
        // wood large
        case 8:
            this.posY =  9;
            this.direction = false;
            this.picture.src = 'media/wood_large.png';
            this.speed = SPEED_WOOD2;
            break;
        //wood small
        case 9:
            this.posY =  10;
            this.direction = true;
            this.picture.src = 'media/wood_small.png';
            this.speed = SPEED_WOOD3;
            break;

        //turtle triple
        case 10:
            this.posY =  11;
            this.direction = false;
            this.picture.src = 'media/turtles_triple.png';
            this.speed = SPEED_TURTLE2;
            break;
    }

    this.posX = (this.direction)? 0 - BLOC  + spacing :  WIDTH - spacing ;
    /////////// END INITIALISATION


    this.move = function(){
        var blocType;
        var floorBloc;
        if(this.posY < 6 ) { // if this is a car
            blocType =3;
            floorBloc = 0;
        }
        else{// if this is a platform
            blocType = 2;
            floorBloc = 5;
        }

        //remove the object on the map
        for(var i = Math.floor(this.posX); i< Math.floor(this.posX) + this.picture.width ; i++){
            if(i <649 && i > 1){
                map[this.posY][i] = floorBloc;
            }
        }

        //move the object
        if(this.direction){
            this.posX += this.speed;
            //console.log("++");
            if(this.posX > WIDTH){
                this.posX = - this.picture.width;
            }
        }
        else{
            this.posX -= this.speed;
            if(this.posX < - (this.picture.width) ){
                this.posX = WIDTH + this.picture.width;
            }
        }

        //place the object on the map
        for(var i = Math.floor(this.posX); i< Math.floor(this.posX) + this.picture.width ; i++){
            if(i <649 && i > 1){
                map[this.posY][i] = blocType;
            }
        }

        context.drawImage(this.picture, this.posX, MARGIN_TOP + BLOC * this.posY - BLOC);
    }




}

////////////OBJECTS initialisation
function initObject(){
    objects = [];
    // cars initialisation
    objects.push(new Objects(1, 0));
    objects.push(new Objects(1, getRandom(150, 320)));

    objects.push(new Objects(2, 0));
    objects.push(new Objects(2, getRandom(150, 320)));

    objects.push(new Objects(3, 0));
    spacing = getRandom(100, 250);
    objects.push(new Objects(3, spacing));
    objects.push(new Objects(3, spacing * 2));

    objects.push(new Objects(4, 0));
    spacing = getRandom(100, 250);
    objects.push(new Objects(4, spacing));
    objects.push(new Objects(4, spacing * 2));

    objects.push(new Objects(5, 0));
    spacing = getRandom(180, 220);
    objects.push(new Objects(5, spacing));
    objects.push(new Objects(5, spacing * 2));

//wood medium initialisation
    objects.push(new Objects(6, 0));
    spacing = getRandom(220, 300);
    objects.push(new Objects(6, spacing));
    objects.push(new Objects(6, spacing * 2));

//turtle double initialisation
    objects.push(new Objects(7, 0));
    spacing = getRandom(200, 300);
    objects.push(new Objects(7, spacing));
    objects.push(new Objects(7, spacing*2));

//wood large initialisation
    objects.push(new Objects(8, 0));
    spacing = getRandom(300, 400);
    objects.push(new Objects(8, spacing));

//wood small initialisation
    objects.push(new Objects(9, 0));
    spacing = getRandom(180, 250);
    objects.push(new Objects(9, spacing));
    objects.push(new Objects(9, spacing*2));

//turtle triple initialisation
    objects.push(new Objects(10, 0));
    spacing = getRandom(150, 250);
    objects.push(new Objects(10, spacing));
    objects.push(new Objects(10, spacing*2));
}






