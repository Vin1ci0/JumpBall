//Variáveis do Jogo
var canvas, contexto, ALTURA, LARGURA, frames=0, maxPulos= 3, velocidade = 6, estadoAtual, recorde,

estados = {
    jogar:0,
    jogando: 1,
    perdeu: 2,
},

chao = {
    y: 550,
    altura: 50,
    cor: "#006400",

    desenha: function() {
        contexto.fillStyle = this.cor
        contexto.fillRect(0, this.y, LARGURA, this.altura)
    }
},

bloco = {
    x:50,
    y: 0,
    altura: 50,
    largura: 50,
    cor: "#ffff00",
    gravidade: 1.3,
    velocidade: 0,
    forcaDoPulo: 22,
    qntPulos: 0,
    score: 0,

    atualiza: function() {
        this.velocidade += this.gravidade
        this.y += this.velocidade        

        if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
            this.y = chao.y - this.altura
            this.qntPulos = 0
            this.velocidade = 0
        }
    },

    pula: function() {
        if (this.qntPulos < maxPulos) {
            this.velocidade = -this.forcaDoPulo
            this.qntPulos++
        }
    },

    reset: function() {
        this.velocidade = 0
        this.y = 0

        if (this.score > recorde) {
            localStorage.setItem("recorde", this.score)
            recorde = this.score
        }

        this.score = 0
    },

    desenha: function() {
        contexto.fillStyle = this.cor
        contexto.fillRect(this.x, this.y, this.largura, this.altura)    
    }
},

obstaculos = {
    objeto: [],
    cores: ["#800080", "#ff0000", "#deb887", "#ff8c00"],
    tempoInsere: 0,

    insere: function() {
        this.objeto.push({
            x: LARGURA,
            //largura: 30 + Math.floor( 21 * Math.random()),
            largura: 40,
            altura: 30 + Math.floor(120 * Math.random()),
            cor: this.cores[Math.floor(4 * Math.random())],
        })
        this.tempoInsere = 45 + Math.floor(20 * Math.random())
    },

    atualiza: function() {
        if(this.tempoInsere == 0)
        this.insere()

        else
            this.tempoInsere--

        for (var i = 0, tamanho = this.objeto.length; i < tamanho; i++) {
            var obs = this.objeto[i]

            obs.x -= velocidade

            if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= chao.y - obs.altura) {
                estadoAtual = estados.perdeu
            }

            else if (obs.x == 0) {
                bloco.score++
            }

            else if (obs.x <= -obs.largura) {
                this.objeto.splice(i, 1)
                tamanho--
                i--
            }
        }
    },

    limpa: function() {
        this.objeto = []
    },

    desenha: function() {
        for(var i = 0, tamanho = this.objeto.length; i < tamanho; i++ ) {
            var obs = this.objeto[i]
            contexto.fillStyle = obs.cor
            contexto.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura)
        }
    },

}

//Função para o clique 
function clique(evento) {
    if (estadoAtual == estados.jogando) {
        bloco.pula();
    }
    else if (estadoAtual == estados.jogar) {
        estadoAtual = estados.jogando
    }
    else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA) {
        estadoAtual = estados.jogar
        obstaculos.limpa()
        bloco.reset()
    }
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

    estadoAtual = estados.jogar
    recorde = localStorage.getItem("recorde")

    if (recorde == null) {
        recorde = 0
    }

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

    bloco.atualiza()

    if (estadoAtual == estados.jogando) {
    obstaculos.atualiza()
    }
}

//Função para desenhar o jogo
function desenha() {
    contexto.fillStyle = "#6495ed"
    contexto.fillRect(0, 0, LARGURA, ALTURA)

    contexto.fillStyle = "#fff"
    contexto.font = "50px Arial"
    contexto.fillText(bloco.score, 30, 68)

    if (estadoAtual == estados.jogar) {
        contexto.fillStyle = "green"
        contexto.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50 , 100, 100)
    }
    else if (estadoAtual == estados.perdeu) {
        contexto.fillStyle = "red"
        contexto.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50 , 100, 100)
    
        contexto.save()
        contexto.translate(LARGURA / 2, ALTURA / 2)
        contexto.fillStyle = "#fff"

        if (bloco.score < 10) {
            contexto.fillText(bloco.score, -13, 19)
        }
        else if (bloco.score >= 10 && bloco.score < 100) {
            contexto.fillText(bloco.score, -26, 19)
        }
        else {
            contexto.fillText(bloco.score, -39, 19)
        }
        contexto.restore()
    }    

    else if (estadoAtual == estados.jogando) {
        obstaculos.desenha()
    }
    
    chao.desenha()
    bloco.desenha()

}


//inicializa o jogo
main();