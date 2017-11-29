class MainMenu
{
    constructor()
    {
        
    }
    update()
    {
      //switch to game
      if(gameNamespace.mouseX > 92 && gameNamespace.mouseY > 258 && gameNamespace.mouseX < 188 && gameNamespace.mouseY < 300)
      {
        gameNamespace.gamestate = gameNamespace.GamestateEnum.GAME;
      }
      //switch to options
      if(gameNamespace.mouseX > 92 && gameNamespace.mouseY > 310 && gameNamespace.mouseX < 259 && gameNamespace.mouseY < 350)
      {
        gameNamespace.gamestate = gameNamespace.GamestateEnum.OPTIONS;
      }
      //switch to highscore
      if(gameNamespace.mouseX > 92 && gameNamespace.mouseY > 358 && gameNamespace.mouseX < 316 && gameNamespace.mouseY < 399)
      {
        gameNamespace.gamestate = gameNamespace.GamestateEnum.HIGHSCORE;
      }
      //exit
      if(gameNamespace.mouseX > 92 && gameNamespace.mouseY > 407 && gameNamespace.mouseX < 179 && gameNamespace.mouseY < 451)
      {
        gameNamespace.gamestate = gameNamespace.GamestateEnum.EXIT;
      }
    }
    draw()
    {
      gameNamespace.ctx.font = '48px impact';
      gameNamespace.ctx.fillStyle = '#FF0000';
      gameNamespace.ctx.fillText('Space Runner',window.innerWidth/2-150,100);
      gameNamespace.ctx.font = '32 impact';
      gameNamespace.ctx.fillText('PLAY',window.innerWidth/2-150,300);
      gameNamespace.ctx.fillText('OPTIONS',window.innerWidth/2-150,350);
      gameNamespace.ctx.fillText('HIGHSCORE',window.innerWidth/2-150,400);
      gameNamespace.ctx.fillText('EXIT',window.innerWidth/2-150,450);

    }
}
