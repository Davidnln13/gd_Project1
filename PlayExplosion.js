class PlayExplosion{
  constructor()
  {
    this.image = new Image();
    this.image.src = "explosions.png";
    this.image.addEventListener("load", this.loadImage);
    this.x = 21;
    this.y = 19;
    this.w = 96 - 21;
    this.h = 97 - 19;
  }
  loadImage(e)
  {
  }
}
