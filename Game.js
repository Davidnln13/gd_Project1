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
    gameNamespace.canvas.addEventListener("touchstart", this.onTouchStart.bind(this));
    console.log("Initialising Game World");
    //creates both divs
    this.createImageDiv("backgroundOneDiv");
    this.createImageDiv("backgroundTwoDiv");
    //turn off mouse events
    document.getElementById("backgroundOneDiv").style.pointerEvents = "none";
    document.getElementById("backgroundTwoDiv").style.pointerEvents = "none";

    gameNamespace.game.update();
    ///this.ctx.addEventListener("touchmove", this.onTouchMove.bind(this));
  ///  this.ctx.addEventListener("touchend", onTouchEnd);
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
   console.log(gameNamespace.posOne, gameNamespace.posTwo);
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
createImageDiv(divID)
{
  var div = document.createElement("div");
  div.innerHTML = '<img src=./Resources/Images/background.png>';
  div.id = divID;
  div.style.left=0;
  div.style.top=0;
  div.style.position='absolute';
  document.body.appendChild(div);
}
/**
* ontouchstart
* @desc prints the starting position also saves that position and the time of the touch
*/
onTouchStart(e)
{
    e.preventDefault();
    var touches = e.touches;
    gameNamespace.mouseX = touches[0].clientX;
    gameNamespace.mouseY = touches[0].clientY;
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
onTouchEnd(e)
{

}
}
