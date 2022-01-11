function Sprite (x, y, largura, altura) {
    this.x = x
    this.y = y
    this.largura = largura
    this.altura = altura

    this.desenha = function(xCanvas, yCanvas) {
        contexto.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura)
    }
}

var fundo = new Sprite(0, 0, 600, 600),
spriteBoneco = new Sprite(618, 16, 87, 87),
perdeu = new  Sprite ( 656 ,  434 ,  471 ,  283 ),
jogar = new  Sprite ( 639 ,  162 ,  331 ,  180 ) ,
novo =  new  Sprite ( 23 ,  738 ,  117 ,  19 ) ,
spriteRecord = new  Sprite ( 25 ,  704 ,  182 ,  19 ) ,
spriteChao = new  Sprite ( 13 ,  617 ,  600 ,  50 ) ;



