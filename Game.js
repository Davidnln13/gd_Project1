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
                                    HIGHSCORE:3,
                                    EXIT:4
                                  }
    gameNamespace.gamestate = gameNamespace.GamestateEnum.MAIN;
    gameNamespace.mouseX = -100;
    gameNamespace.mouseY = -100;

    //different screens
    gameNamespace.mainMenu = new MainMenu();
    gameNamespace.gameMenu = new GameMenu();
    gameNamespace.optionsMenu = new OptionsMenu();
    gameNamespace.highscoreMenu = new HighscoreMenu();
    gameNamespace.exitMenu = new ExitMenu();

    //context
    gameNamespace.ctx;
    //initialise canvas
    this.initCanvas();

    console.log("Initialising Game World");

    //creates both background divs
    this.createDiv('<img src=./Resources/Images/background.png>',"backgroundOneDiv",0,0);
    this.createDiv('<img src=./Resources/Images/background.png>',"backgroundTwoDiv",0,0);

    //Text Divs
    this.createDiv('Space Runner',"MAIN",110,100);
    this.createDiv("PLAY","GAME",110,300);
    this.createDiv("OPTIONS","OPTIONS",110,350);
    this.createDiv("HIGHSCORE","HIGHSCORE",110,400);
    this.createDiv("EXIT","EXIT",110,450);

    //turn off mouse events
    document.getElementById("backgroundOneDiv").style.pointerEvents = "none";
    document.getElementById("backgroundTwoDiv").style.pointerEvents = "none";

    //font and font size of Divs
    gameNamespace.game.divFontColourSize("MAIN","impact","white","48");
    gameNamespace.game.divFontColourSize("GAME","impact","white","38");
    gameNamespace.game.divFontColourSize("OPTIONS","impact","white","38");
    gameNamespace.game.divFontColourSize("HIGHSCORE","impact","white","38");
    gameNamespace.game.divFontColourSize("EXIT","impact","white","38");

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
   if(gameNamespace.posOne > 880)
   {
     gameNamespace.posOne = 0-880;
   }
   if(gameNamespace.posTwo > 880)
   {
     gameNamespace.posTwo = -880;
   }

   gameNamespace.posOne++;
   document.getElementById("backgroundOneDiv").style.top = gameNamespace.posOne + 'px';

   gameNamespace.posTwo++;
   document.getElementById("backgroundTwoDiv").style.top = gameNamespace.posTwo + 'px';
   gameNamespace.game.draw();
   //update menus
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.MAIN)
   {
       gameNamespace.mainMenu.update();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.GAME)
   {
      gameNamespace.gameMenu.update();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.OPTIONS)
   {
       gameNamespace.optionsMenu.update();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.HIGHSCORE)
   {
       gameNamespace.highscoreMenu.update();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.EXIT)
   {
       gameNamespace.exitMenu.update();
   }
   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
 }
 /**
 * draw
 * @desc draws the sprites
 */

 draw()
 {

   gameNamespace.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

   // gameNamespace.ctx.fillStyle = '#FF0000';
   // gameNamespace.ctx.fillRect(gameNamespace.mouseX,gameNamespace.mouseY,5,5);
   // console.log(gameNamespace.mouseX,gameNamespace.mouseY);

   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.MAIN)
   {
     gameNamespace.mainMenu.draw();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.GAME)
   {
     gameNamespace.gameMenu.draw();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.OPTIONS)
   {
     gameNamespace.optionsMenu.draw();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.HIGHSCORE)
   {
     gameNamespace.highscoreMenu.draw();
   }
   if(gameNamespace.gamestate === gameNamespace.GamestateEnum.EXIT)
   {
     gameNamespace.exitMenu.draw();
   }
 }
 /**
* initCanvas
* @desc initialises the canvas
*/
initCanvas()
{
  gameNamespace.canvas = document.createElement("canvas");
  gameNamespace.canvas.id = "canvas";
  gameNamespace.canvas.width = window.innerWidth;
  gameNamespace.canvas.height = window.innerHeight;
  document.body.appendChild(gameNamespace.canvas);
  gameNamespace.ctx = gameNamespace.canvas.getContext("2d");

}
createDiv(divType,divID,divPosX,divPosY,clickable)
{
  var div = document.createElement("div");
  div.innerHTML = divType;
  div.id = divID;
  div.style.left=divPosX + 'px';
  div.style.top=divPosY+ 'px';
  div.style.position='absolute';
  //if(clickable === true)
    div.addEventListener("touchstart", gameNamespace.game.onTouchStart.bind(null,divID));
    div.addEventListener("touchend", gameNamespace.game.onTouchEnd.bind(null,divID));
  document.body.appendChild(div);
}
divFontColourSize(name,font,colour,size)
{
  document.getElementById(name).style.color = colour;
  document.getElementById(name).style.font = size + "px " + font;
}
/**
* ontouchstart
* @desc prints the starting position also saves that position and the time of the touch
*/
onTouchStart(id,e)
{
    e.preventDefault();
    var touches = e.touches;
    gameNamespace.gamestate = gameNamespace.GamestateEnum.id;

    //document.getElementById(id).style.visibility = "hidden";
    if(id === "GAME")
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.GAME;
    }
    if(id !== "MAIN")
      gameNamespace.game.divFontColourSize(id,"impact","yellow","38");
  //  gameNamespace.mouseX = touches[0].clientX;
  //  gameNamespace.mouseY = touches[0].clientY;
}
/**
* onTouchMove
* @desc clears the screen draws the line and saves the final position
*/
onTouchMove(e)
{

}
/**
* onTouchEnd
* @desc outputs the time difference, the length of the line also then decides if the line was a swipe based on its size and time if it is a swipe it writes to the screen swipe detected
*/
onTouchEnd(id,e)
{
  var touches = e.touches;
  //document.getElementById(id).style.visibility = "visible";

  if(id !== "MAIN")

    gameNamespace.game.divFontColourSize(id,"impact","white","38");
//  gameNamespace.mouseX = touches[0].clientX;
}
}
