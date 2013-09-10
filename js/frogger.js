var canvas;
var context;
var objects;
var map;
var frog = new Frog();
var background = new Image();
background.src = 'media/background.png';

var WIN_ZONE_X= [2*BLOC,6*BLOC,10*BLOC, 14*BLOC,18*BLOC];
var ZONE_WIN=[false, false, false, false, false ];
//var ZONE_WIN=[false, false, false, false, false ];

/*
 MAP :
 0 -> empty
 1 -> border
 2 -> platform
 3 -> dead zone
 4 -> win zone
 5 -> water zone
 6 -> safe zone


 i use a table/map 14*650
 */

window.onload = function() {
    canvas = document.querySelector('#canvas');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', keyPress, false);
    window.requestAnimFrame(function() { draw() });

    startGame();
    draw(0); // premier appel
};


function draw() {
    context.clearRect(0,0,WIDTH, HEIGHT);

    // draw background
    context.drawImage(background,0,-40);


    //win zone
    for(var i = 0; i<5;i++){
        if(!ZONE_WIN[i]){
            context.fillStyle = "rgba(18, 173, 3, 0.4)";
        }
        else{
            context.fillStyle = "rgba(227, 25, 3, 0.4)";
        }
        context.fillRect(WIN_ZONE_X[i], 0   , BLOC , BLOC);

    }

    for(var i = 0 ; i < objects.length; i++){
        objects[i].move();
    }
    frog.move();
    frog.draw();
    if(frog.state == 0){

        window.requestAnimFrame(function() { draw() });
    }
}


window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || // La forme standardisée
        window.webkitRequestAnimationFrame || // Pour Chrome et Safari
        window.mozRequestAnimationFrame    || // Pour Firefox
        window.oRequestAnimationFrame      || // Pour Opera
        window.msRequestAnimationFrame     || // Pour Internet Explorer
        function(callback){                   // Pour les élèves du dernier rang
            window.setTimeout(callback, 1000 );
        };
})();

function Create2DArray(rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
    }
    //initialize map to 0
    for(var i = 0; i< 650; i++){
        for(var j = 0; j< 14; j++){
            arr[j][i] = 0;
            arr[j][i] = 0;
        }
    }
    for(var i = 0; i< 650; i++){
        //border horizontal of map
        arr[13][i] = 1;
        arr[0][i] = 1 ;
        // safe zone
        if(i > 0 && i<649){
            arr[6][i] = 6;
            arr[12][i]= 6;
        }
    }

    //border vertical
    for(var i = 0; i< 13; i++){
        arr[i][0] = 1;
        arr[i][650] = 1;
    }
    //win zone
    arr[0][WIN_ZONE_X[0]] = 4;
    arr[0][WIN_ZONE_X[1]] = 4;
    arr[0][WIN_ZONE_X[2]] = 4;
    arr[0][WIN_ZONE_X[3]] = 4;
    arr[0][WIN_ZONE_X[4]] = 4;

    //water zone
    for(var i=1; i< 650; i++ ){
        for(var j = 7; j< 12; j++){
            arr[j][i] = 5;
        }
    }
    return arr;
}

function startGame(){
    if(frog.state != 0){
        window.requestAnimFrame(function() { draw() });
    }
    map = Create2DArray(14);
    initObject();
    frog.init();
}