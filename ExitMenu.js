class ExitMenu
{
  constructor()
  {

  }
  update()
  {
    //main
    if(gameNamespace.mouseX > 172 && gameNamespace.mouseY > 558 && gameNamespace.mouseX < 288 && gameNamespace.mouseY < 602)
    {
      gameNamespace.gamestate = gameNamespace.GamestateEnum.MAIN;
    }
  }
  draw()
  {
    gameNamespace.ctx.font = '48px impact';
    gameNamespace.ctx.fillStyle = '#FF0000';
    gameNamespace.ctx.fillText('EXIT',window.innerWidth/2-50,100);

    gameNamespace.ctx.font = '32 impact';
    gameNamespace.ctx.fillText('BACK',window.innerWidth/2-70,600);

  }
}
