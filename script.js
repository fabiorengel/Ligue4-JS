let bolas = document.getElementsByClassName('bola') // class que ao mudar seu background-color simula uma bola de sue jogador na casa apropriada
let statusJogo = document.getElementById('status') // elemento que mostra o Status do jogo (de quem é a vez, quem ganhou, etc.)
let mT     
/*matrix Tabuleiro = representa 7 colunas // 6 linhas de jogadas - inicializada em reiniciarPartida*/
let currentStatus   

/*  currentStatus: Variável que armazena o estado atual do jogo:
    0 = Vez no Player 1
    1 = Vez do NPC / Player 2
    2 = Partida Terminada = Player 1 Ganhou
    3 = Partida Terminada = NPC / Player 2 Ganhou 
    esta variável é inicializada em reiniciarPartida
*/

    function alteraStatus(s) {
        currentStatus = s
        if (s==1) {
            statusJogo.innerText = 'Vez do computador jogar...'
            setTimeout(vaiComputador, 1000) // chama o NPC após X milisegundos
        }
        else if (s==2) {
            statusJogo.innerText = 'Parabéns, você ganhou!'
        }
        else if (s==3) {
            statusJogo.innerText = 'O computador ganhou. Mais sorte na próxima vez!'
        }
        else {
            statusJogo.innerText = 'Sua vez...'
        }
    }

    function casaLivre(j,i) {
        /* Dada a coluna de "lançamento" j e uma linha default (normalmente a ultima (5)), verifica de baixo pra cima a primeira linha disponivel para jogada. Se houver linha diponível, retorna true e a linha, senão, retorna false.   */
        while (mT[j][i] != 0 && i > 0) { //enquanto a casa não estiver vazia e ainda houver linha: suba uma casa
            i-- 
        } 
        if (mT[j][i] != 0) { // Acabaram-se as linhas sme casa disponível , retorne falso!
            return [false]
        }
        else { // senão significa que o while parou por haver casa disponvel, retorne [verdade e a linha]
            return [true, i]
        }
    }

    function col(j, i, player) { 
        // Função chamada pela jogada de Player1 - Button por enquanto
        if (currentStatus == 0) { // confere se é a vez do jogador
            let cLivre = casaLivre(j, i) // Passa a coluna escolhida e a ultima linha (5) que são recebidos por parametro do HTML e retornam [true a primeira linha dispinivel] para jogada na mesma coluna. Caso não tenha, recebe false.
            if (cLivre[0]) { // Verifica tinha casa disponivel procede com a jogada
                // Daqui
                    efetuaJogada(j , cLivre[1], player)
                // até aqui, o código altera a cor da bola equivalente, trasformando a matriz 6x7 em um vetor de 42 posições. (div.bola 0a41)
                zzzConfereGanhador(j, cLivre[1], player)

                if (currentStatus == 0){                
                    alteraStatus(1) // Função que muda status do jogo (desde a vez de qual jogador até o termino da partida)
                }
            }
            else {
                alert('Jogada Inválida')
            }
        }
        else if (currentStatus == 1) {
            statusJogo.innerHTML = `<strong> É a vez do computador. Espere!</strong>`
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

    function seGanhasePerde() {
        let jGanha = 0
        let jogadaJ = 0
        let jogadaI = 0
        let aux = false
        while (jGanha < 7 ) { // Este while verifica se o computador ganha com alguma jogada nesta rodada = retornando [verdade, culuna a jogar]
            let recebeCasaLivre = casaLivre(jGanha,5)
            if (recebeCasaLivre[0]) {
                let recebePonderarJogada = ponderarJogada(jGanha, recebeCasaLivre[1], 'npc')
                if (recebePonderarJogada) {
                    aux = true
                    jogadaJ = Number(jGanha)
                    jogadaI = Number(recebeCasaLivre[1])
                    jGanha = 7
                }
            }
            jGanha++
        }
        if (!aux) { //não havendo jogadas de vitória nesta rodada, o computador verifica se deve ocupar alguma casa que permitiria o adversário ganhar na próxima jogada escolhendo a primeira disponível e retornando [verdade, culuna a jogar]
            let jNaoPerde = 0
            while (jNaoPerde < 7 ) { 
                let recebeCasaLivre = casaLivre(jNaoPerde,5)
                if (recebeCasaLivre[0]) {
                    let recebePonderarJogada = ponderarJogada(jNaoPerde, recebeCasaLivre[1], 'p1')
                    if (recebePonderarJogada) {
                        aux = true
                        jogadaJ = Number(jNaoPerde)
                        jogadaI = Number(recebeCasaLivre[1])
                        jNaoPerde = 7
                    }
                }
                jNaoPerde++
            }
        }
        return [aux, jogadaJ, jogadaI]
    }
    
    function ponderarJogada(j, i, player) {
        /*função que dada a coluna "j" e o jogador "player", que pode ser "p1 ou npc", verifica se há ou haveria vitoria com a jogada. */
        if (confVerticalPraBaixo(j, i, player) >= 4 ) {
            return true
        }
        else if (confHorizontal(j, i, player) >= 4 ) {
            return true
        }
        else if (confDiagonalDecrescente(j, i, player) >=4 )  {
            return true
        } 
        else if (confDiagonalCrescente(j, i, player) >=4 )  {
            return true
        }
        else {
            return false
        }
    }

    function efetuaJogada(j, i, player) { 
         
         let posVetor = Number(j)+Number(i)*7 
         mT[j][i] = player

         if (player == 'npc') {
            bolas[posVetor].style.backgroundColor = 'red'
            if (currentStatus == 1) { 
                alteraStatus(0)
           }
         }
         else {
            bolas[posVetor].style.backgroundColor = 'yellow'
         }
         // até aqui, o código altera a cor da bola equivalente, trasformando a matriz 6x7 em um vetor de 42 posições. (div.bola 0a41)

         
         zzzConfereGanhador(j, i, player)

         
    }


    function vaiComputador() {  // Jogada do computador.
        let j
        let i 
        let temJogada = seGanhasePerde()

        if (temJogada[0]) {
            j = temJogada[1]
            i = temJogada[2]
        }
        else {
            let auxJ = 0
            while  (auxJ < 7) { 
                /*Procura e todo tabuleiro, a partir da coluna 0 (primeira à esquerda), uma casa livre para jogar. */
                    let auxI = casaLivre(auxJ,5) 
                    if (auxI[0]) {
                        i = Number(auxI[1])
                        j = auxJ
                        auxJ = 7 // quebra o 'while' quando achar a coluna disponivel
                    }
                    else {
                        auxJ++   
                    }      
            }
        }
        efetuaJogada(j, i, 'npc')
    }
        
    function confVerticalPraBaixo(j, i, player) { 
        let contSeguidas = 1
        while (i < 6) {
            if (mT[j][i+1] == player) { 
                contSeguidas++
                i++
            }
            else{
                i = 6 //Caso não haja 4 bolas iguais seguidas, sai do laço
            }
        }
        return contSeguidas
    }
       
    function confHorizontal(j,i, player) { 
        let contSeguidas = 1
        let auxEsq = Number(j)
        let auxDir = Number(j)
        while (auxEsq > 0) {
            if (mT[auxEsq-1][i] ==  player) { 
                contSeguidas++
                auxEsq--
            }
            else {
                auxEsq = 0 // quebra o laço se não houver mais seguidas a esquerda;
            }
        }
        while (auxDir < 6) {
            if (mT[auxDir+1][i] == player) { 
                contSeguidas++
                auxDir++
            }
            else {
                auxDir = 6 // quebra o laço se não houver mais seguidas a direita;
            }
        }
        return contSeguidas
    }
 
    function confDiagonalDecrescente(j, i, player) { 
        let contSeguidas = 1
        let auxEsqCimaJ = Number(j)
        let auxEsqCimaI = Number(i)
        let auxDirBaixoJ = Number(j)
        let auxDirAltoI = Number(i)

        while (auxEsqCimaJ > 0 && auxEsqCimaI > 0) {
            if (mT[auxEsqCimaJ-1][auxEsqCimaI-1] == player) { 
                contSeguidas++
                auxEsqCimaJ--
                auxEsqCimaI--
            }
            else {
                auxEsqCimaJ = 0 // quebra o laço se não houver mais seguidas na diagona esquerda superior
            }
        }

        while (auxDirBaixoJ < 6 && auxDirAltoI < 5  ) {
            if (mT[auxDirBaixoJ+1][auxDirAltoI+1] == player) { 
                contSeguidas+
                auxDirBaixoJ++
                auxDirAltoI++
            }
            else {
                auxDirBaixoJ = 6 // quebra o laço se não houver mais seguidas na diagonal direita inferior
            }
        }
        return contSeguidas
    }
  
    function confDiagonalCrescente(j, i, player) { 
        let contSeguidas = 1
        let auxEsqBaixoJ = Number(j)
        let auxEsqAltoI = Number(i)
        let auxDirAltoJ = Number(j)
        let auxDirAltoI = Number(i)

        while (auxEsqBaixoJ > 0 && auxEsqAltoI < 5) {
            if (mT[auxEsqBaixoJ-1][auxEsqAltoI+1] == player) { 
                contSeguidas++
                auxEsqBaixoJ--
                auxEsqAltoI++
            }
            else {
                auxEsqBaixoJ = 0 // quebra o laço se não houver mais seguidas na esquerda inferior
            }
        }

        while (auxDirAltoJ < 5 && auxDirAltoI < 0) {
            if (mT[auxDirAltoJ+1][auxDirAltoI-1] == player) { 
                contSeguidas++
                auxDirAltoJ++
                auxDirAltoI--
            }
            else {
                auxDirAltoJ = 5 //quebra o laço se não houver mais seguidas na diagonal direita superior.
            }
        }
        return contSeguidas
    }

    function teveVencedor(player) {

        if  (player =='npc') {
            alteraStatus(3)
        }
        else {
            alteraStatus(2)
        }
        setTimeout(alert, 1000, 'Outra Partida?')
    }
    
    function zzzConfereGanhador (posJ, posI, player) {
        
        if (confVerticalPraBaixo(posJ, posI, player) >= 4 ) {
            teveVencedor(player)
        }
        else if (confHorizontal(posJ, posI, player) >= 4 ) {
            teveVencedor(player)
        }
        else if (confDiagonalDecrescente(posJ, posI, player) >=4 )  {
            teveVencedor(player)
        } 
        else if (confDiagonalCrescente(posJ, posI, player) >=4 )  {
            teveVencedor(player)
        } 
        
    }