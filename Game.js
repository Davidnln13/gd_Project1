//reviewed
class Game
{
  constructor()
  {
    this.canvas = null;
  }
  /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    //context
    this.ctx;
    //initialise canvas
    this.initCanvas();

    this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this));
    console.log("Initialising Game World");
    this.background();
    //this.ctx.addEventListener("touchmove", this.onTouchMove.bind(this));
  //  this.ctx.addEventListener("touchend", onTouchEnd);
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
   gameNamespace.game.draw();

   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
 }
 /**
 * draw
 * @desc draws the sprites
 */
 draw()
 {

 }
 /**
* initCanvas
* @desc initialises the canvas
*/
initCanvas()
{
  this.canvas = document.createElement("canvas");
  this.canvas.id = "canvas";
  this.canvas.width = window.innerwidth;
  this.canvas.height = window.innerheight;
  document.body.appendChild(this.canvas);
  this.ctx = this.canvas.getContext("2d");


}
background()
{
  var div = document.createElement("div");
  div.innerHTML='<img src=\'/Resources/Images/background.png\'>'
  div.style.left=0;
  div.style.top = 0;
  div.style.position = "absolute";
  document.body.appendChild(div);
}
/**
* ontouchstart
* @desc prints the starting position also saves that position and the time of the touch
*/
onTouchStart(e)
{
    e.preventDefault();
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
