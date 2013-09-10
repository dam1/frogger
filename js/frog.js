function Frog(){
    this.posX ;
    this.posY ;
    this.picture;
    this.state; // 0 alive,  1 death water, 2 death car, 3 win
    this.picture ;

    this.init = function(){
        this.posX = 320;
        this.posY = 12;
        this.picture;
        this.state = 0; // 0 alive,  1 death water, 2 death car, 3 win
        this.picture =  new Image();
        this.picture.src = 'media/frog.png';
    };

    this.moveLeft = function() {
        // if we are not on a wall
        if(map[this.posY][this.posX]!= 1 ){
            this.posX-= BLOC;
            this.move()
        }
    };

    this.moveUp = function() {
        if(map[this.posY -1][this.posX]!= 1 ){
            this.posY--;
            this.move()

        }
    };

    this.moveRight = function() {
        if(map[this.posY][this.posX + BLOC]!= 1 ){
            this.posX+= BLOC;
        }
        this.move();
    };

    this.moveDown = function() {
        if(map[this.posY + 1][this.posX]!= 1 ){
            this.posY++;
            this.move();
        }
    };

    this.draw = function(){
        if(this.state == 0){
            context.drawImage(this.picture, Math.floor(this.posX) , this.posY * BLOC );
        }
        else {
            context.drawImage(this.picture,
                Math.floor(this.posX) - ( this.picture.width /3 )   ,
                this.posY * BLOC - ( this.picture.width /3 ));
            context.fillStyle = "white";
            context.font = "bold 26px Arial";
            context.fillText("You Lose", WIDTH/2 -60, HEIGHT/2 - 40);
            context.fillText("Press 'R' to Restart", WIDTH/2 -70 , HEIGHT/2 );
        }
    };

    this.move = function(){
        if(this.state == 0){
            // do something in function of the case
            switch (map[this.posY][Math.floor(this.posX)]){

                case 0: // empty
                    // if a car crushed from the right
                    if(map[this.posY][Math.floor(this.posX)+BLOC -2 ] == 3){
                        this.deathByCar();
                    }
                    break;
                case 1://border
                    this.deathByDrowning();
                    break;
                case 2://platform
                    if(map[this.posY][Math.floor(this.posX)+BLOC - (BLOC /2) ] == 5){
                        this.deathByDrowning();
                    }
                    else{
                        this.moveOnPlatform();
                    }
                    break;
                case 3://deadzone
                    this.deathByCar();
                    break;

                case 4://win zone
                    var posx = this.posX;
//                    console.log('win'+this.posX);
                    context.fillStyle = "rgba(227, 25, 3, 0.4)";
                    context.fillRect(2*BLOC, 0   , BLOC , BLOC);

                    startGame();
                    //set the lilies to death
                    map[0][this.posX] = 3;

                    //find the zone number
                    var zoneNumber;
                    for(var i =0; i< 5; i++){
                        if(WIN_ZONE_X[i] == posx){
                            zoneNumber = i;
                        }
                    }

                    ZONE_WIN[zoneNumber] = true;
//                    console.log(zoneNumber+'_'+this.posX+'_'+ZONE_WIN.indexOf(this.posX) +' ' +ZONE_WIN.toString());

                    //if 5 are ok
                    if(ZONE_WIN[0] && ZONE_WIN[1] && ZONE_WIN[2]
                        && ZONE_WIN[3] && ZONE_WIN[3]){

                        frog.state = 3;

                        context.fillStyle = "white";
                        context.font = "bold 26px Arial";
                        context.fillText("You Win", WIDTH/2 -60, HEIGHT/2 - 40);
                        context.fillText("Press 'R' to Restart", WIDTH/2 -70 , HEIGHT/2 );

                        ZONE_WIN=[false, false, false, false, false ];
                        frog.init();


                    }
                    break;

                case 5://water zone
                    //if frog is on a platform from the right
                    if(map[this.posY][Math.floor(this.posX)+ (BLOC /2) ] == 2){
                        this.moveOnPlatform();
                    }
                    else{
                        this.deathByDrowning();
                    }
                    break;

                case 6: //safe zone
                    var x = Math.round(this.posX / BLOC )* BLOC;
                    this.posX = x;
                    break;

            }
        }

    };
    this.deathByCar = function(){
        this.state = 1;
        this.picture = new Image();
        this.picture.src='media/green_splat.png';
    };

    this.deathByDrowning = function(){
        this.state = 2;
        this.picture = new Image();
        this.picture.src='media/splash.png';

    };

    this.moveOnPlatform = function(){
        this.posX += speeds[this.posY];
    };

}
