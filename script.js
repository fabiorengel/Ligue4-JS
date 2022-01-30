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
          
       
    function confHorizontal(x,y) { 
        let contSeguidas = 1
        let auxBreakEsq = true
        let auxBreakDir = true
        let auxEsq = Number(x)
        let auxDir = Number(x)
        while (auxEsq > 0  && auxBreakEsq == true) {
            if (mT[auxEsq][y] == mT[auxEsq-1][y]) { 
                contSeguidas++
                auxEsq--
            }
            else {
                auxBreakEsq=false
            }
        }
        while (auxDir < 6  && auxBreakDir == true) {
            if (mT[auxDir][y] == mT[auxDir+1][y]) { 
                contSeguidas++
                auxDir++
            }
            else {
                auxBreakDir=false
            }
        }
        return contSeguidas
    }
 
    function confDiagonalDecrescente(x,y) { 
        let contSeguidas = 1
        let auxBreakEsqCima = true
        let auxBreakDirBaixo = true
        let auxEsqCimaX = Number(x)
        let auxEsqCimaY = Number(y)
        let auxDirBaixoX = Number(x)
        let auxDirAltoY = Number(y)

        while (auxEsqCimaX > 0 && auxEsqCimaY > 0  && auxBreakEsqCima == true) {
            if (mT[auxEsqCimaX][auxEsqCimaY] == mT[auxEsqCimaX-1][auxEsqCimaY-1]) { 
                contSeguidas++
                auxEsqCimaX--
                auxEsqCimaY--
            }
            else {
                auxBreakEsqCima=false
            }
        }

        while (auxDirBaixoX < 6 && auxDirAltoY < 5  && auxBreakDirBaixo == true) {
            if (mT[auxDirBaixoX][auxDirAltoY] == mT[auxDirBaixoX+1][auxDirAltoY+1]) { 
                contSeguidas++
                auxDirBaixoX++
                auxDirAltoY++
            }
            else {
                auxBreakDirBaixo = false
            }
        }
        return contSeguidas
    }
  
    function confDiagonalCrescente(x,y) { 
        let contSeguidas = 1
        let auxBreakEsq = true
        let auxBreakDir = true
        let auxEsqBaixoX = Number(x)
        let auxEsqAltoY = Number(y)
        let auxDirAltoX = Number(x)
        let auxDirAltoY = Number(y)

        while (auxEsqBaixoX > 0 && auxEsqAltoY < 5  && auxBreakEsq == true) {
            if (mT[auxEsqBaixoX][auxEsqAltoY] == mT[auxEsqBaixoX-1][auxEsqAltoY+1]) { 
                contSeguidas++
                auxEsqBaixoX--
                auxEsqAltoY++
            }
            else {
                auxBreakEsq=false
            }
        }

        while (auxDirAltoX < 5 && auxDirAltoY < 0  && auxBreakDir == true) {
            if (mT[auxDirAltoX][auxDirAltoY] == mT[auxDirAltoX+1][auxDirAltoY-1]) { 
                contSeguidas++
                auxDirAltoX++
                auxDirAltoY--
            }
            else {
                auxBreakDir = false
            }
        }
        return contSeguidas
    }




    function zzzConfereGanhador (posX, posY, player) {
        
        if (confVerticalPraBaixo(posX,posY) >= 4 ) {
            if  (player =='npc') {
                alteraStatus(3)
            }
            else {
                alteraStatus(2)
            }
            setTimeout(alert, 1000, 'Outra Partida?')
        }
        else if (confHorizontal(posX,posY) >= 4 ) {

            if  (player =='npc') {
                    alteraStatus(3)
            }
            else {
                alteraStatus(2)
            }
            setTimeout(alert, 1000, 'Outra Partida?')
            
        }
        else if (confDiagonalDecrescente(posX,posY) >=4 )  {
            if  (player =='npc') {
                alteraStatus(3)
            }
            else {
                alteraStatus(2)
            }
            setTimeout(alert, 1000, 'Outra Partida?')
        } 
        else if (confDiagonalCrescente(posX,posY) >=4 )  {
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