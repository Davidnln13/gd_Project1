//reviewed
class Game
{
  constructor()
  {

    gameNamespace.canvas = null;
  }
    /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    //starting positions of individual divs
    gameNamespace.posOne = 0;
    gameNamespace.posTwo = -880;
    //enum
    gameNamespace.GamestateEnum = {
                                    MAIN:0,
                                    GAME:1,
                                    OPTIONS:2,
                                    TUTORIAL:3,
                                    HIGHSCORE:4,
                                    EXIT:5
                                  }
    gameNamespace.PlayerPosEnum = {
                                  LEFT: 50,
                                  MID : 203,
                                  RIGHT : 350
    }
    gameNamespace.gamestate = gameNamespace.GamestateEnum.MAIN;
    //context
    gameNamespace.ctx;
    //initialise canvas
    this.initCanvas();
    console.log("Initialising Game World");
    //canvas touch events used for swipe detection
    gameNamespace.canvas.addEventListener("touchstart", gameNamespace.game.canvasStart);
    gameNamespace.canvas.addEventListener("touchmove", gameNamespace.game.canvasMove);
    gameNamespace.canvas.addEventListener("touchend", gameNamespace.game.canvasEnd);

    //creates both background divs
    this.createDiv('<img src=./Resources/Images/background.png>',"backgroundOneDiv",0,0,false);
    this.createDiv('<img src=./Resources/Images/background.png>',"backgroundTwoDiv",0,0,false);
    //Text Divs Main
    this.createDiv('Space Runner',"MAIN",110,100,true);
    this.createDiv("PLAY","GAME",110,300,true);
    this.createDiv("OPTIONS","OPTIONS",110,350,true);
    this.createDiv("TUTORIAL","TUTORIAL",110,400,true);
    this.createDiv("HIGHSCORE","HIGHSCORE",110,450,true);
    this.createDiv("EXIT","EXIT",110,500,true);
    //swipe detection
    gameNamespace.startingPosX = -100;
    gameNamespace.startingPosY = -100;

    gameNamespace.endingPosX = -100;
    gameNamespace.endingPosY = -100;

    gameNamespace.startingTime = 0;
    gameNamespace.endingTime = 0;

    gameNamespace.swipeLength = 0;
    //player movement
    gameNamespace.movingLeft = false;
    gameNamespace.movingRight = false;
    gameNamespace.moveSpeed = 10;
    //play
    gameNamespace.currentPosition = gameNamespace.PlayerPosEnum.MID;
    gameNamespace.score = 0;
    gameNamespace.currentPositionPixels = 203;
    gameNamespace.asteroidPosY = [-50,-350,-650];
    gameNamespace.asteroidMoveSpeed = 2;
    gameNamespace.explode = false;
    gameNamespace.alive = false;
    gameNamespace.startAnimation;
    gameNamespace.stopAnimation;
    gameNamespace.asteroidRotation = [gameNamespace.game.RandomPos(),gameNamespace.game.RandomPos(),gameNamespace.game.RandomPos()];
    this.createDiv("<img src=./Resources/Images/asteroid.png>", "ASTEROIDONE",gameNamespace.game.RandomPos(),-50,false);
    this.createDiv("<img src=./Resources/Images/asteroid.png>", "ASTEROIDTWO",gameNamespace.game.RandomPos(),-250,false);
    this.createDiv("<img src=./Resources/Images/asteroid.png>", "ASTEROIDTHREE",gameNamespace.game.RandomPos(),-450,false);
    this.createDiv("<img src=./Resources/Images/optionsSymbol.png>","optionsSymbol",440,10,true);
    gameNamespace.listOfExplosions = ["<img src=./Resources/Images/ExplosionOne.png>","<img src=./Resources/Images/ExplosionTwo.png>","<img src=./Resources/Images/ExplosionThree.png>","<img src=./Resources/Images/ExplosionFour.png>",
                                      "<img src=./Resources/Images/ExplosionFive.png>","<img src=./Resources/Images/ExplosionSix.png>","<img src=./Resources/Images/ExplosionSeven.png>","<img src=./Resources/Images/ExplosionEight.png>",
                                      "<img src=./Resources/Images/ExplosionNine.png>","<img src=./Resources/Images/ExplosionTen.png>"];
    gameNamespace.explosionCurrentIndex = 0;
    this.createDiv(gameNamespace.listOfExplosions[0],-250,-250,false);
    this.createDiv("<img src=./Resources/Images/Player.png>","PLAYER",gameNamespace.PlayerPosEnum.MID,720,true);
    this.createDiv("Score: 0", "PLAYSCORE",10,10,false);
    this.createDiv(gameNamespace.listOfExplosions[0],"EXPLOSION",-250,-250,false);
    gameNamespace.asteroids = ["ASTEROIDONE", "ASTEROIDTWO", "ASTEROIDTHREE"];
    for(var i = 0; i <3; i++)
    {
      document.getElementById(gameNamespace.asteroids[i]).style.width = 88 + "px";
      document.getElementById(gameNamespace.asteroids[i]).style.height = 96 + "px";
    }
    document.getElementById("PLAYER").style.width = 88 + "px";
    document.getElementById("PLAYER").style.height = 66 + "px";

    this.createDiv("GAME OVER", "GAMEOVER", 125,250,false);
    this.createDiv("Restart", "GAMERESTART",125,450,true);
    this.createDiv("Main Menu", "GAMEMAINMENU",125,500,true);
    //options
    this.createDiv("RESUME","optionsResume",165,450,true);
    this.createDiv("MAIN MENU","optionsMain",165,500,true);
    //list to hold text divs on main menu
    gameNamespace.mainMenuTextDivs = ["MAIN","GAME","OPTIONS","TUTORIAL","HIGHSCORE","EXIT"];
    gameNamespace.playGameDivs = ["optionsSymbol", "PLAYER", "PLAYSCORE", "ASTEROIDONE", "ASTEROIDTWO", "ASTEROIDTHREE","EXPLOSION"];
    gameNamespace.optionisDivs = ["optionsMain","optionsResume"];
    gameNamespace.gameOverDivs = ["GAMEOVER","GAMERESTART","GAMEMAINMENU"];
    //initialise visibility
    gameNamespace.flipOnce = false;
    gameNamespace.game.flipVisibility(gameNamespace.playGameDivs, false);
    gameNamespace.game.flipVisibility(gameNamespace.optionisDivs, false);
    gameNamespace.game.flipVisibility(gameNamespace.gameOverDivs, false);
    //font and font size of Divs main
    gameNamespace.game.divFontColourSize("MAIN","impact","white","48");
    gameNamespace.game.divFontColourSize("GAME","impact","white","38");
    gameNamespace.game.divFontColourSize("OPTIONS","impact","white","38");
    gameNamespace.game.divFontColourSize("TUTORIAL","impact","white","38");
    gameNamespace.game.divFontColourSize("HIGHSCORE","impact","white","38");
    gameNamespace.game.divFontColourSize("EXIT","impact","white","38");
    //options
    gameNamespace.game.divFontColourSize("optionsMain","impact","white","38");
    gameNamespace.game.divFontColourSize("optionsResume","impact","white","38");
    //player
    gameNamespace.game.divFontColourSize("PLAYSCORE","impact","white","38");
    gameNamespace.game.divFontColourSize("GAMEOVER","impact","white","52");
    gameNamespace.game.divFontColourSize("GAMERESTART","impact","white","38");
    gameNamespace.game.divFontColourSize("GAMEMAINMENU","impact","white","38");
    gameNamespace.game.update();
    ///this.ctx.addEventListener("touchmove", this.onTouchMove.bind(this));
    ///this.ctx.addEventListener("touchend", onTouchEnd);
  //  gameNamespace.canvas.addEventListener("touchstart", this.onTouchStart.bind(this));
    window.addEventListener("keydown", function(e)
      {
          // Space and arrow keys
          if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
          {
            //makes it so the keys defined above ignore their default command
            e.preventDefault();
          }
      }, false);
  }

 /**
 * update
 * @desc calls draw and itself recursively also updates animations
 */
 update()
 {
   //resets background
   if(gameNamespace.posOne > 880)
   {
     gameNamespace.posOne = 0-880;
   }
   if(gameNamespace.posTwo > 880)
   {
     gameNamespace.posTwo = -880;
   }
   //incrementing background
   gameNamespace.posOne++;
   document.getElementById("backgroundOneDiv").style.top = gameNamespace.posOne + 'px';

   gameNamespace.posTwo++;
   document.getElementById("backgroundTwoDiv").style.top = gameNamespace.posTwo + 'px';
   gameNamespace.game.draw();
   //update menus
   gameNamespace.game.UpdateMenus();
   //if were in the play gamestate
   if(gameNamespace.gamestate === 1)
   {
     if(gameNamespace.alive === false)
     {
       gameNamespace.game.flipVisibility(gameNamespace.gameOverDivs);
     }
     if(gameNamespace.explode === true)
     {
       if(document.getElementById("EXPLOSION").style.left === -250 + 'px')
       {
         gameNamespace.startAnimation = new Date();
       }
       gameNamespace.stopAnimation = new Date();
       var temp = gameNamespace.currentPosition + 'px';
       document.getElementById("EXPLOSION").style.left = temp;
       document.getElementById("EXPLOSION").style.top = 720 + 'px';
       if(gameNamespace.stopAnimation - gameNamespace.startAnimation > 40)
       {
         gameNamespace.startAnimation = new Date();
         gameNamespace.explosionCurrentIndex++;
       }
       document.getElementById("EXPLOSION").innerHTML = gameNamespace.listOfExplosions[gameNamespace.explosionCurrentIndex];
       if(gameNamespace.explosionCurrentIndex >= 10)
       {
         document.getElementById("EXPLOSION").style.left = -250 + 'px';
         document.getElementById("EXPLOSION").style.top = -250 + 'px';
         gameNamespace.explosionCurrentIndex = 0;
         gameNamespace.explode = false;
       }

     }
     gameNamespace.game.CheckCollisions();
     if(gameNamespace.score > 30 && gameNamespace.asteroidMoveSpeed < 3)
     {
       gameNamespace.asteroidMoveSpeed+=0.1;
     }
     gameNamespace.game.UpdateAsteroids();
     if(gameNamespace.alive === true)
        gameNamespace.score +=0.1;
     document.getElementById("PLAYSCORE").innerHTML = "Score: " + parseInt(gameNamespace.score);
    // console.log(document.getElementById("PLAYER").width());
     //if were moving left
     if(gameNamespace.movingLeft === true)
     {
          //if were already left
         if(gameNamespace.currentPosition === gameNamespace.PlayerPosEnum.LEFT)
         {
           gameNamespace.movingLeft = false;
         }
         //if were mid
         if(gameNamespace.currentPosition === gameNamespace.PlayerPosEnum.MID)
         {
           //move from mid to left
           gameNamespace.game.MoveLeft(gameNamespace.PlayerPosEnum.MID,gameNamespace.PlayerPosEnum.LEFT);
         }
         if(gameNamespace.currentPosition === gameNamespace.PlayerPosEnum.RIGHT)
         {
           //move from right to mid
           gameNamespace.game.MoveLeft(gameNamespace.PlayerPosEnum.RIGHT,gameNamespace.PlayerPosEnum.MID);
         }
     }
     //if were moving right
     if(gameNamespace.movingRight === true)
     {
          //if were left
         if(gameNamespace.currentPosition === gameNamespace.PlayerPosEnum.LEFT)
         {
           //move from left to MID
           gameNamespace.game.MoveRight(gameNamespace.PlayerPosEnum.LEFT,gameNamespace.PlayerPosEnum.MID);
         }
         //if were mid
         if(gameNamespace.currentPosition === gameNamespace.PlayerPosEnum.MID)
         {
           //move from mid to Right
           gameNamespace.game.MoveRight(gameNamespace.PlayerPosEnum.MID,gameNamespace.PlayerPosEnum.RIGHT);
         }
         //if were already right
         if(gameNamespace.currentPosition === gameNamespace.PlayerPosEnum.RIGHT)
         {
           gameNamespace.movingRight = false;
         }
   }
 }
   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
 }
 Reset()
 {
  gameNamespace.alive = false;
  gameNamespace.explode = false;
  gameNamespace.score = 0;
  gameNamespace.asteroidMoveSpeed = 2;
  document.getElementById("PLAYER").style.left = 203 + 'px';
  gameNamespace.currentPosition = gameNamespace.PlayerPosEnum.MID;
  gameNamespace.currentPositionPixels = 203;
  gameNamespace.game.SpawnAsteroid(gameNamespace.asteroids[0],0,true);
  gameNamespace.game.SpawnAsteroid(gameNamespace.asteroids[1],1,true);
  gameNamespace.game.SpawnAsteroid(gameNamespace.asteroids[2],2,true);
 }
 UpdateAsteroids()
 {
   for(var i = 0; i < gameNamespace.asteroids.length; i++)
   {
      gameNamespace.asteroidRotation[i] += 1;
      gameNamespace.asteroidPosY[i] += gameNamespace.asteroidMoveSpeed;
      document.getElementById(gameNamespace.asteroids[i]).style.transform = "rotate(" + gameNamespace.asteroidRotation[i] + "deg)";
      document.getElementById(gameNamespace.asteroids[i]).style.top = gameNamespace.asteroidPosY[i] + "px";
      if(gameNamespace.asteroidPosY[i] > 900)
      {
        gameNamespace.game.SpawnAsteroid(gameNamespace.asteroids[i],i,false);
      }
   }


 }
 CheckCollisions()
 {
   for(var i = 0; i < 3; i++)
   {
     var temp = gameNamespace.currentPosition + 'px';
     if(temp === document.getElementById(gameNamespace.asteroids[i]).style.left)
     {
       if(gameNamespace.asteroidPosY[i] >= 650 && gameNamespace.asteroidPosY[i] < 761)
       {
          if(gameNamespace.alive === true)
          {
            gameNamespace.alive = false;
           document.getElementById("PLAYER").style.visibility = "hidden";
           gameNamespace.explode = true;
          }
       }
     }
   }
 }

 SpawnAsteroid(id, index, fromStart)
 {
   gameNamespace.asteroidRotation[index] = gameNamespace.game.RandomPos();
   document.getElementById(id).style.visibility = "hidden";
   if(fromStart === false)
    gameNamespace.asteroidPosY[index] = -50;
  else
  {
    gameNamespace.asteroidPosY[0] = -50;
    gameNamespace.asteroidPosY[1] = -350;
    gameNamespace.asteroidPosY[2] = -650;
  }
   document.getElementById(id).style.left = gameNamespace.game.RandomPos() + "px";
   document.getElementById(id).style.visibility = "visible";
 }
 /**
 * draw
 * @desc draws the sprites
 */

 draw()
 {
   gameNamespace.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
 }
 /**
* initCanvas
* @desc initialises the canvas
*/
RandomPos()
{
  var pos = Math.floor(Math.random()*3)
  if(pos === 0)
    return 50;
  if(pos === 1)
    return 203;
  if(pos === 2)
    return 350;
}
MoveRight(currentSpot, desiredSpot)
{
  if(gameNamespace.movingRight === true)
  {
    //only called once per swipe
    if(gameNamespace.moveSpeed === 10)
    {
     document.getElementById("PLAYER").innerHTML = "<img src=./Resources/Images/PlayerRight.png>";
    }
    //move left by x pixels
     document.getElementById("PLAYER").style.left = currentSpot + gameNamespace.moveSpeed + 'px';
     gameNamespace.moveSpeed += 10;
     gameNamespace.currentPositionPixels+=10;
     if(gameNamespace.currentPositionPixels > desiredSpot)
     {
       gameNamespace.currentPositionPixels = desiredSpot;
     }
     if(gameNamespace.currentPositionPixels === desiredSpot)
     {
       document.getElementById("PLAYER").innerHTML = "<img src=./Resources/Images/Player.png>";
       document.getElementById("PLAYER").style.left = desiredSpot;
       gameNamespace.currentPosition = desiredSpot;
       gameNamespace.moveSpeed = 10;
       gameNamespace.movingRight = false;
     }
   }
}
MoveLeft(currentSpot,desiredSpot)
{
  if(gameNamespace.movingLeft === true)
  {
    //only called once per swipe
    if(gameNamespace.moveSpeed === 10)
    {
     document.getElementById("PLAYER").innerHTML = "<img src=./Resources/Images/PlayerLeft.png>";
    }
    //move left by x pixels
     document.getElementById("PLAYER").style.left = currentSpot - gameNamespace.moveSpeed + 'px';
     gameNamespace.moveSpeed += 10;
     gameNamespace.currentPositionPixels-=10;
     if(gameNamespace.currentPositionPixels < desiredSpot)
     {
       gameNamespace.currentPositionPixels = desiredSpot;
     }
     if(gameNamespace.currentPositionPixels === desiredSpot)
     {
       document.getElementById("PLAYER").innerHTML = "<img src=./Resources/Images/Player.png>";
       gameNamespace.currentPosition = desiredSpot;
        document.getElementById("PLAYER").style.left = desiredSpot;
       gameNamespace.moveSpeed = 10;
       gameNamespace.movingLeft = false;
     }
   }

}
initCanvas()
{
  gameNamespace.canvas = document.createElement("canvas");
  gameNamespace.canvas.id = "canvas";
  gameNamespace.canvas.width = window.innerWidth;
  gameNamespace.canvas.height = window.innerHeight;
  document.body.appendChild(gameNamespace.canvas);
  gameNamespace.ctx = gameNamespace.canvas.getContext("2d");

}
//flips the passed in divs visibilty
flipVisibility(divsToFlip, flipBool)
{
  for(var i = 0; i < divsToFlip.length; i++)
  {
    if(document.getElementById(divsToFlip[i]).style.visibility = "visible" && flipBool === false)
    {
      document.getElementById(divsToFlip[i]).style.visibility = "hidden";
    }
    else {
      document.getElementById(divsToFlip[i]).style.visibility = "visible";
    }

  }
}
//creates a div passing in the html the id its position and whether its clickable
createDiv(divType,divID,divPosX,divPosY,clickable)
{
  var div = document.createElement("div");
  div.innerHTML = divType;
  div.id = divID;
  div.style.left=divPosX + 'px';
  div.style.top=divPosY+ 'px';
  div.style.position='absolute';
  if(clickable === true)
  {
    div.addEventListener("touchstart", gameNamespace.game.onTouchStart.bind(null,divID));
  }
  else {
     div.style.pointerEvents = "none";
  }
  document.body.appendChild(div);
}
//changes font colour and size useful for clicking on divs
divFontColourSize(name,font,colour,size)
{
  document.getElementById(name).style.color = colour;
  document.getElementById(name).style.font = size + "px " + font;
}
//currently just prevents the screen from moving
canvasStart(e)
{
  e.preventDefault();
  if(gameNamespace.gamestate === 1)
  {
    var touches = e.touches;
    gameNamespace.startingPosX = touches[0].clientX;
    gameNamespace.startingPosY = touches[0].clientY;
    gameNamespace.startingTime = new Date();
  }
}
canvasMove(e)
{
  if(gameNamespace.gamestate === 1)
  {
    e.preventDefault();
    var touches = e.touches;
    gameNamespace.endingPosX = touches[0].clientX;
    gameNamespace.endingPosY = touches[0].clientY;
  }
}
canvasEnd(e)
{
  e.preventDefault();
  if(gameNamespace.gamestate === 1 && gameNamespace.endingPosX !== -100)
  {
    gameNamespace.endingTime = new Date();
    gameNamespace.swipeLength = Math.sqrt((
                                         (gameNamespace.endingPosX - gameNamespace.startingPosX)
                                         *(gameNamespace.endingPosX - gameNamespace.startingPosX)
                                         ) + ((gameNamespace.endingPosY - gameNamespace.startingPosY)
                                         *(gameNamespace.endingPosY - gameNamespace.startingPosY)));
    if(gameNamespace.swipeLength > 150)
    {
      if(gameNamespace.endingTime - gameNamespace.startingTime < 200)
      {
        if(gameNamespace.startingPosX < gameNamespace.endingPosX)
        {
           gameNamespace.movingRight = true;
        }
        if(gameNamespace.startingPosX > gameNamespace.endingPosX)
        {
          gameNamespace.movingLeft = true;
        }
      }
    }
  }
}
/**
* ontouchstart
* @desc prints the starting position also saves that position and the time of the touch
*/
UpdateMenus()
{
  //main
 if(gameNamespace.gamestate === 0)
 {
   if(gameNamespace.flipOnce === false)
   {
     gameNamespace.game.Reset();
     gameNamespace.flipOnce = true;
     gameNamespace.game.flipVisibility(gameNamespace.mainMenuTextDivs,true);
     gameNamespace.game.flipVisibility(gameNamespace.playGameDivs,false);
     gameNamespace.game.flipVisibility(gameNamespace.optionisDivs, false);
     gameNamespace.game.flipVisibility(gameNamespace.gameOverDivs,false);
   }
 }
 //play
 if(gameNamespace.gamestate === 1)
 {
   if(gameNamespace.flipOnce === false)
   {
     gameNamespace.alive = true;
     gameNamespace.flipOnce = true;
     gameNamespace.game.flipVisibility(gameNamespace.mainMenuTextDivs,false);
     gameNamespace.game.flipVisibility(gameNamespace.playGameDivs,true);
     gameNamespace.game.flipVisibility(gameNamespace.optionisDivs, false);
     gameNamespace.game.flipVisibility(gameNamespace.gameOverDivs,false);
   }
 }
 //options
 if(gameNamespace.gamestate === 2)
 {
   if(gameNamespace.flipOnce === false)
   {
     gameNamespace.flipOnce = true;
     gameNamespace.game.flipVisibility(gameNamespace.mainMenuTextDivs,false);
     gameNamespace.game.flipVisibility(gameNamespace.playGameDivs,false);
     gameNamespace.game.flipVisibility(gameNamespace.optionisDivs, true);
     gameNamespace.game.flipVisibility(gameNamespace.gameOverDivs,false);
   }
 }
}
onTouchStart(id,e)
{
    e.preventDefault();
    gameNamespace.flipOnce = false;
    var touches = e.touches;
    //mainMenu
    if("GAME" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.GAME;
    }
    if("OPTIONS" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.OPTIONS;
    }
    if("TUTORIAL" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.TUTORIAL;
    }
    if("HIGHSCORE" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.HIGHSCORE;
    }
    if("EXIT" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.EXIT;
    }
    //playscreen
    if("optionsSymbol" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.OPTIONS;
    }
    if("optionsMain" === id || "GAMEMAINMENU" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.MAIN;
    }
    if("optionsResume" === id)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.GAME;
    }
    if("GAMERESTART" === id)
    {
      gameNamespace.game.Reset();
    }
}
}
