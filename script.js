//Variáveis do Jogo
var canvas, contexto, ALTURA, LARGURA, frames=0

//Função para o clique 
function clique(evento) {
    alert("clicou")
}

//Função principal
function main() {
    ALTURA = window.innerHeight
    LARGURA = window.innerWidth

    if (ALTURA >= 500) {
        ALTURA = 600
        LARGURA = 600
    }
    
    canvas = document.createElement("canvas")
    canvas.width = LARGURA
    canvas.height = ALTURA
    canvas.style.border = "1px solid #000"

    contexto = canvas.getContext("2d")
    document.body.appendChild(canvas)

    document.addEventListener("mousedown", clique)

    roda() 

}
    
//Função para rodar o jogo
function roda() {
    atualiza()
    desenha()

    window.requestAnimationFrame(roda)
}

//Função para atualizar o status do jogo
function atualiza() {
    frames++
}

//Função para desenhar o jogo
function desenha() {
    contexto.fillStyle = "#6495ed"
    contexto.fillRect(0, 0, LARGURA, ALTURA)
}


//inicializa o jogo
main();