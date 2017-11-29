var gameNamespace = {};
/**
* Main
* @desc just defines a new game and initialises
*/
function main()
{
  //new game
  window.onload = function()
  {
      var body = document.querySelector('body');
      var x_pos = '0px';
      var y_pos = 0;
      setInterval(function(){body.style.backgroundPosition = x_pos+" " + y_pos + "px"; y_pos++; },20);
  }
  const g = new Game();
  gameNamespace.game = g;
  g.initWorld();


}
