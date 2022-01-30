let bolas = document.getElementsByClassName('bola')
let statusJogo = document.getElementById('status')
let mT     
/*matrix Tabuleiro = representa 7 colunas // 6 linhas de jogadas - inicializada em reiniciarPartida*/
let currentStatus   

/*  currentStatus: Armazena o estado atual do jogo:
    0 = Vez no Player 1
    1 = Vez do NPC / Player 2
    2 = Partida Terminada = Player 1 Ganhou
    3 = Partida Terminada = NPC / Player 2 Ganhou 
    inicializada em reiniciarPartida
*/

    function alteraStatus(x) {
        currentStatus = x
        if (x==1) {
            statusJogo.innerText = 'Vez do computador jogar...'
            setTimeout(vaiComputador, 100) // chama o NPC
        }
        else if (x==2) {
            statusJogo.innerText = 'Quem diria? Você ganhou!'
        }
        else if (x==3) {
            statusJogo.innerText = 'Achou que podia me ganhar, né? Achou errado!'
        }
        else {
            statusJogo.innerText = 'jogue, abestado!'
        }
    }

    function casaLivre(x,y) {
        /* Dada a coluna de "lançamento", verifica a primeira linha, de baixo pra cima, disponivel para jogada, Se houver linha diponível, retorna true e a linha, senão, retorna false.   */
        while (mT[x][y] != 0 && y > 0) {
            y--
        } 
        if (mT[x][y] != 0) {
            return [false]
        }
        else {
            return [true, y]
        }
    }

    function col(x, y, player) { 
        // Função chamada pela jogada de Player1 - Button por enquanto
        if (currentStatus == 0) {
            let cLivre = casaLivre(x,y) 
            if (cLivre[0]) {
                // Daqui
                    let posVetor = Number(x)+Number(cLivre[1])*7 //
                    bolas[posVetor].style.backgroundColor = 'yellow'
                // até aqui, o código altera a cor da bola equivalente, trasformando a matriz 6x7 em um vetor de 42 posições. (div.bola 0a41)

                mT[x][cLivre[1]] = player //Salva na matriz a posição que a nova bola ocupa.
                zzzConfereGanhador(x, cLivre[1], player)
                if (currentStatus==0){                
                    alteraStatus(1) // Função que muda status do jogo (desde a vez de qual jogador até o termino da partida)
                }
            }
            else {
                alert('Jogada Inválida')
            }
        }
        else if (currentStatus == 1) {
            statusJogo.innerText = 'Espere a sua vez, parça'
        }
        else {
            statusJogo.innerText = 'O jogo acabou. Aperte Reiniciar'
        }
    }    

    function reiniciarPartida() {
        
        mT =    //matrix Tabuleiro = representa 7 colunas // 6 linhas de jogadas
        // Dá pra fazer por laço, mas não é interessante.
            [
            [0,0,0,0,0,0], // coluna 0 
            [0,0,0,0,0,0], // coluna 1 
            [0,0,0,0,0,0], // coluna 2 
            [0,0,0,0,0,0], // coluna 3 
            [0,0,0,0,0,0], // coluna 4 
            [0,0,0,0,0,0], // coluna 5 
            [0,0,0,0,0,0]  // coluna 6 
        ]
        currentStatus = 0  
    }

    function vaiComputador() {
        // Jogada do computador.
        let aux = true
        let aux2
        let x = 0

        while  (x < 7 && aux) { 
        /*Procura e todo tabuleiro, a partir da coluna 0 (primeira à esquerda), uma casa livre para jogar. */
            aux2 = casaLivre(x,5) 
            if (aux2[0]) {
                aux=false
            }
            else {
                x++   
            }      
        }

        if (!aux) 
        // if termporario para parar o programa quando a matriz estiver cheia. No futuro não será necessário
            { 
                //Daqui
                let posVetor = Number(x)+Number(aux2[1])*7 
                bolas[posVetor].style.backgroundColor = 'red'
                // até aqui, o código altera a cor da bola equivalente, trasformando a matriz 6x7 em um vetor de 42 posições. (div.bola 0a41)
                mT[x][aux2[1]] = 'npc'
                
                zzzConfereGanhador(x,aux2[1],'npc')
         
                if (currentStatus == 1){ 
                    alteraStatus(0)
                }
            }
        }
        
        function confVerticalPraBaixo(x,y) { 
            let contSeguidas = 1
            auxBreak = true
            while (y < 6 && auxBreak==true) {
                if (mT[x][y] == mT[x][y+1]) { 
                    contSeguidas++
                    y++
                }
                else{
                    auxBreak=false
                }
            }
            return contSeguidas
        }
        function zzzConfereGanhador (posX, posY, player) {
            let Ganhou = confVerticalPraBaixo(posX,posY)

            if (Ganhou >= 4 ) {
                if  (player =='npc') {
                       alteraStatus(3)
                }
                else {
                    alteraStatus(2)
                }
                setTimeout(alert, 1000, 'Outra Partida?')
            }
        }
        
        /*console.log(mT)
        console.log(x,aux2[1],'npc')*/