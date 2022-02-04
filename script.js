let quadrados = document.getElementsByClassName('quadrado');
let bolas = document.getElementsByClassName('bola');
/* Class que ao mudar seu background-color simula uma bola de seu jogador na casa apropriada */
let statusJogo = document.getElementById('status');
/* Elemento que mostra o Status do jogo (de quem é a vez, quem ganhou, etc.)*/
let mT;
/* Matriz tabuleiro = representa 7 colunas x 6 linhas de jogadas - inicializada em reiniciarPartida */
let vetorGanhador = 0;
/*Vetor para destacar sequencia vitoriosa*/
let currentStatus; 
/*  currentStatus: Variável global que armazena o estado atual do jogo:
    0 = Vez no Player 1
    1 = Vez do NPC / Player 2
    2 = Partida Terminada = Player 1 Ganhou
    3 = Partida Terminada = NPC / Player 2 Ganhou 
    esta variável é inicializada em reiniciarPartida
*/
    function alteraStatus(s) {
        currentStatus = s
        if (s==1) {
            statusJogo.innerText = 'É a vez do computador jogar...'
            setTimeout(inteligenciaComputador, 1000) // chama o NPC após X milisegundos
        }
        else if (s==2) {
            statusJogo.innerHTML = 'Parabéns, você ganhou!';
            for (let cont = vetorGanhador.length-1; cont >=0; cont--) {
                quadrados[vetorGanhador[cont]].classList.add('testeP1');
            }
        }
        else if (s==3) {
            statusJogo.innerHTML = 'O computador ganhou. Mais sorte na próxima vez!';
            for (let cont = vetorGanhador.length-1; cont >=0; cont--) {
                quadrados[vetorGanhador[cont]].classList.add('testeNPC');
            }
        } 
        else if (s==4) {
            statusJogo.innerHTML = 'O jogo acabou sem vencedores!'
        }    
        else {
            statusJogo.innerText = 'Sua vez de jogar...'
        }
    }
    function casaLivreColunaJ(j) { /* Função na versão final*/
        /* Dada a coluna de "lançamento" j e uma linha default (normalmente a ultima (5)), verifica de baixo pra cima a primeira linha disponivel para jogada. Se houver linha diponível, retorna true e a linha, senão, retorna false.   */
        j=Number(j);
        let i = 5;
        while (mT[j][i] != 0 && i > 0) { 
            i--; 
            // Enquanto a casa não estiver vazia e ainda houver linha: suba uma casa
        } 
        if (mT[j][i] != 0) { 
            return [false, -1];
            // Se: Acabaram-se as linhas sem casa disponível , retorne falso!
        }
        else { 
            return [true, i];
            // Senão: significa que o while parou por haver casa disponvel, retorne [verdade e a linha]
        }
    }
    function jogadaPlayer1(j, player) { 
        j = Number(j); 
        // Função chamada pela jogada de Player1 - Button por enquanto
        if (currentStatus == 0) { // confere se é a vez do jogador
            let cLivre = casaLivreColunaJ(j);
            /* Se houver casa disponivel na coluna J, cLivre recebe [true ; e a primeira casa (de baixo pra cima)]; senão recebe false */
            if (cLivre[0]) { 
                /* confere se havia casa disponivel para proceder com a jogada */ 
                    efetuaJogada(j, cLivre[1], player);
                if (currentStatus == 0) {                
                    alteraStatus(1);
                    /* Formalidade que checa se houve mudança de status no jogo, o que aconteceria se a ultima jogada tiver gerado vencedor. Não tendo havido mudança, procede para passar a vez ao computador.*/ 
                }
            }
            else {
                alert('Jogada Inválida - Coluna sem casas livres');
                /* Acontece se o Player 1 tentar jogar numa coluna completa */
            }
        }
        else if (currentStatus == 1) {
            statusJogo.innerHTML = `<strong> É a vez do computador. Espere!</strong>`;
            /* Este else acontecerá caso o Player 1 tente jogar na vez do computador */
        }        
    } 
    function reiniciarPartida(quemComeca) {
        
        mT =    
        /*matrix Tabuleiro = representa 7 colunas // 6 linhas de jogadas */
            [
            [0,0,0,0,0,0], // coluna 0 
            [0,0,0,0,0,0], // coluna 1 
            [0,0,0,0,0,0], // coluna 2 
            [0,0,0,0,0,0], // coluna 3 
            [0,0,0,0,0,0], // coluna 4 
            [0,0,0,0,0,0], // coluna 5 
            [0,0,0,0,0,0]  // coluna 6 
        ];
        for (var cont = 0; cont < 42; cont++ ) {
            /* Laço que inicia, ou reinicia, o visual do tabuleiro */
            quadrados[cont].classList.remove('testeNPC');
            quadrados[cont].classList.remove('testeP1');
            bolas[cont].classList.remove('corNPC');
            bolas[cont].classList.remove('corP1');
            bolas[cont].classList.add('cor1'); 
        }
        if (quemComeca != 1) {
        /* O perdedor começa jogando na próxima partida!!! */
            alteraStatus(0);
        }
        else {
            alteraStatus(1); 
        } 
    }
    function efetuaJogada(j, i, player) { 
        j=Number(j); /*preciosismo*/
        i=Number(i); /*preciosismo*/
        let posVetor = [j+i*7];
        let naoAcabou = false; 
        /* poseVetor: usa a coluna ('j' de 0 a 6) e a linha ('i' de 0 a 5) recebidas por parâmetro calcula a posição equivalente no div.bolas, que é um vetor de 0 a 41 */
        mT[j][i] = player; 
        /* salva o responsavel pela joga (p1 ou npc) na posição da matriz usada como (tabuleiro)*/
        if (player == 'npc') {
            /*  Manipula a class do elemento div.bolas trocando a padrão pela class do Computador (o que na pratica muda a cor equivalente a jogada no browser*/
            bolas[posVetor].classList.remove('cor1'); 
            bolas[posVetor].classList.add('corNPC');
            if (currentStatus == 1) { 
                alteraStatus(0);
            }
        }
        else {
            /*  Manipula a class do elemento div.bolas trocando a padrão pela class do Player1 (o que na pratica muda a cor equivalente a jogada no browser */
                bolas[posVetor].classList.remove('cor1'); 
                bolas[posVetor].classList.add('corP1');
        }
        confereSeTeveGanhadorNaJogada(j, i, player);
        /* Função responsável por verificar se houve vencedor nesta jogada */
        if (currentStatus < 2) { 
            /* Se não houve vencedor, verificar se ainda há espaço no tabuleiro */
            for (let contJ = 0; contJ < 7; contJ++){
                if (mT[contJ][0]==0) {
                    /* Se achar uma casa disponivel na primeira linha de qq coluna, segue o jogo */
                    naoAcabou=true;
                    break;
                }
            }
            if (!naoAcabou) {
                alteraStatus(4);
            }
        }
    }
    function confVerticalPraBaixo(j, i, player) { 
        let contSeguidas = 1;
        j=Number(j); /* Preciosismo */
        i=Number(i); /* Preciosismo */
        vetorGanhador = [j+i*7];
        while (i < 6) {
            if (mT[j][i+1] == player) { 
                contSeguidas++;
                i++;
                vetorGanhador.push([j+i*7]);
            }
            else{
                break; //Caso não haja 4 bolas iguais seguidas, sai do laço
            }
        }
        return contSeguidas;
    }
    function confHorizontal(j,i, player) { 
        j = Number(j); /* Preciosismo */
        i = Number(i); /* Preciosismo */
        let contSeguidas = 1;
        let auxEsq = j;
        let auxDir = j;
        vetorGanhador = [j+i*7];
        while (auxEsq > 0) {
            if (mT[auxEsq-1][i] ==  player) { 
                contSeguidas++;
                auxEsq--;
                vetorGanhador.push([auxEsq+i*7]);
            }
            else {
                break;
                //auxEsq = 0 // quebra o laço se não houver mais seguidas a esquerda;
            }
        }
        while (auxDir < 6) {
            if (mT[auxDir+1][i] == player) { 
                contSeguidas++;
                auxDir++;
                vetorGanhador.push([auxDir+i*7])
            }
            else {
                break; /* quebra o laço se não houver mais seguidas a direita; */
            }
        }
        return contSeguidas;
    }
    function confDiagonalDecrescente(j, i, player) { 
        j = Number(j); /* Preciosismo */
        i = Number(i); /* Preciosismo */
        let contSeguidas = 1;
        let auxEsqCimaJ = j;
        let auxEsqCimaI = i;
        let auxDirBaixoJ = j;
        let auxDirBaixoI = i;
        vetorGanhador = [j+i*7]; 
        while (auxEsqCimaJ > 0 && auxEsqCimaI > 0) {
        /* Verficia se há tabuleiro na diagonal esquerda superior */    
            if (mT[auxEsqCimaJ-1][auxEsqCimaI-1] == player) { 
                /* Verifica se o conteúdo adjacente na diagonal esquerda superior é igual a casa recebida por parametro. Se for verdade, muda parametros para verificar a casa subsequente */
                contSeguidas++;
                auxEsqCimaJ--;
                auxEsqCimaI--;
                vetorGanhador.push([auxEsqCimaJ+auxEsqCimaI*7]);
            }
            else {
                break; // quebra o laço se não houver mais seguidas na diagona esquerda superior
            }
        }
        
        while (auxDirBaixoJ < 6 && auxDirBaixoI < 5  ) {
        /* Verficia se há tabuleiro na diagonal direita inferior */
            if (mT[auxDirBaixoJ+1][auxDirBaixoI+1] == player) { 
            /* Verifica se o conteúdo adjacente na diagonal direita inferior é igual a casa recebida por parametro. Se for verdade, muda parametros para verificar a casa subsequente */    
                contSeguidas++;
                auxDirBaixoJ++;
                auxDirBaixoI++;
                vetorGanhador.push([auxDirBaixoJ+auxDirBaixoI*7]);
            }
            else {
                break; // quebra o laço se não houver mais seguidas na diagonal direita inferior
            }
        }
        return contSeguidas;
    }
    function confDiagonalCrescente(j, i, player) { 
        j = Number(j); /* Preciosismo */
        i = Number(i); /* Preciosismo */
        let contSeguidas = 1;
        let auxEsqBaixoJ = j;
        let auxEsqBaixoI = i;
        let auxDirAltoJ = j;
        let auxDirAltoI = i;
        vetorGanhador = [j+i*7];
        
        while (auxEsqBaixoJ > 0 && auxEsqBaixoI < 5) {
        /* Verficia se há tabuleiro na diagonal esquerda inferior */
            if (mT[auxEsqBaixoJ-1][auxEsqBaixoI+1] == player) { 
            /* Verifica se o conteúdo adjacente na diagonal esquerda inferior é igual a casa recebida por parametro. Se for verdade, muda parametros para verificar a casa subsequente */
                contSeguidas++;
                auxEsqBaixoJ--;
                auxEsqBaixoI++;
                vetorGanhador.push([auxEsqBaixoJ+auxEsqBaixoI*7]);
            }
            else {
                break;  /*quebra o laço se não houver mais seguidas na esquerda inferior*/
            }
        }
        
        while (auxDirAltoJ < 6 && auxDirAltoI > 0) {
            /* Verficia se há tabuleiro na diagonal direita superior */
            if (mT[auxDirAltoJ+1][auxDirAltoI-1] == player) { 
            /* Verifica se o conteúdo adjacente na diagonal direita superior é igual a casa recebida por parametro. Se for verdade, muda parametros para verificar a casa subsequente */
                contSeguidas++;
                auxDirAltoJ++;
                auxDirAltoI--;
                vetorGanhador.push([Number(auxDirAltoJ+auxDirAltoI*7)]);
            }
            else {
                break;  /*quebra o laço se não houver mais seguidas na diagonal direita superior.*/
            }
        }
        return contSeguidas;
    }
    function teveVencedor(player) {
        if  (player =='npc') {
            alteraStatus(3);
        }
        else {
            alteraStatus(2);
        }
    }
    function confereSeTeveGanhadorNaJogada (posJ, posI, player) {
        posJ = Number(posJ);
        posI = Number(posI);
        if (confVerticalPraBaixo(posJ, posI, player) >= 4 ) {
            teveVencedor(player);
        }
        else if (confHorizontal(posJ, posI, player) >= 4 ) {
            teveVencedor(player);
        }
        else if (confDiagonalDecrescente(posJ, posI, player) >=4 )  {
            teveVencedor(player);
        } 
        else if (confDiagonalCrescente(posJ, posI, player) >=4 )  {
            teveVencedor(player);
        } 
    }
    function jogadaQueGanha() { 
        let jGanha = 0;
        let jogadaJ = 0;
        let jogadaI = 0;
        let aux = false;
        while (jGanha < 7 ) { 
        /* Este while verifica se o computador ganha com alguma jogada nesta rodada, se sim, retorna [verdade, culuna a jogar] */
            let recebeCasaLivre = casaLivreColunaJ(jGanha);
            if (recebeCasaLivre[0]) {
                let recebePonderarJogada = ponderarJogada(jGanha, recebeCasaLivre[1], 'npc');
                if (recebePonderarJogada) {
                    aux = true;
                    jogadaJ = Number(jGanha);
                    jogadaI = Number(recebeCasaLivre[1]);
                    break; /* Força saída do laço pois achou jogada ganhadora */
                }
            }
            jGanha++;
        }
        return [aux, jogadaJ, jogadaI]
    }
    function impedeSequenciaP1() { 
    /* Função em que o computador verifica se deve ocupar alguma casa que permitiria o adversário ganhar na próxima jogada escolhendo a primeira disponível e retornando [verdade, culuna a jogar] */
        let jogadaJ = 0;
        let jogadaI = 0;
        let aux = false;
        let auxJ = 0;
        while (auxJ < 7) { 
            let recebeCasaLivre = casaLivreColunaJ(auxJ)
            if (recebeCasaLivre[0]) {
                let recebePonderarJogada = ponderarJogada(auxJ, recebeCasaLivre[1], 'p1');
                    if (recebePonderarJogada) {
                        aux = true;
                        jogadaJ = Number(auxJ);
                        jogadaI = Number(recebeCasaLivre[1]);
                        auxJ = 7; /* Força saída do laço pois achou jogada que o oponente ganharia */
                    }
            }
            auxJ++;
        }
        return [aux, jogadaJ, jogadaI]
    }
    function jogaNoMeio() {
        /* Função que visa escolher uma jogada numa das 3 colunas do meio para a inteligencia do NPC */
        let auxI2 = Number(casaLivreColunaJ(2)[1]);
        let auxI3 = Number(casaLivreColunaJ(3)[1]);
        let auxI4 = Number(casaLivreColunaJ(4)[1]);
        if (auxI4 > auxI3 && auxI4 > auxI2)  {
            return [4, auxI4]; 
        }
        else if (auxI3 > auxI2 && auxI3 >= auxI4) {
            return [3, auxI3];
        }
        else {
            return [2, auxI2];
        }          
    }
    function ponderarJogada(j, i, player) {
        j = Number(j);
        i = Number(i);
        /*função que dada a coluna "j" e o jogador "player", que pode ser "p1 ou npc", verifica se há ou haveria vitoria com a jogada. */
        if (confVerticalPraBaixo(j, i, player) >= 4) {
            return true;
        }
        else if (confHorizontal(j, i, player) >= 4) {
            return true;
        }
        else if (confDiagonalDecrescente(j, i, player) >=4)  {
            return true;
        } 
        else if (confDiagonalCrescente(j, i, player) >=4)  {
            return true;
        }
        else {
            return false;
        }
    }
    function inteligenciaComputador() {  /* Jogada do computador.*/
        let j;
        let i;
        let temJogada = jogadaQueGanha();

        if (temJogada[0]) {
            j = temJogada[1];
            i = temJogada[2];
        }
        else {
            temJogada = impedeSequenciaP1();
            if (temJogada[0]) {
                j = temJogada[1];
                i = temJogada[2];
            }
            else {
                temJogada = jogaNoMeio();
                if (temJogada[1] >= 0) {
                    j = temJogada[0];
                    i = temJogada[1];
                }
                else {
                    let auxJ = 0;
                    while  (auxJ < 7) { 
                    /*Procura e todo tabuleiro, a partir da coluna 0 (primeira à esquerda), uma casa livre para jogar. */
                    let auxI = casaLivreColunaJ(auxJ);
                        if (auxI[0]) {
                            i = Number(auxI[1]);
                            j = auxJ;
                            break; // quebra o 'while' quando achar a coluna disponivel
                        }
                    auxJ++;  
                    }
                }      
            }
        }
        efetuaJogada(j, i, 'npc');
    }

    const changeSkin = function() {
        const cuerpo = document.querySelector('body');
        cuerpo.classList.toggle('skin-1');
    }