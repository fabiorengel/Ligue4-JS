const alteraStatus = (s) => {
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
        statusJogo.innerHTML = 'Sua vez de jogar... <br><p>Clique no botão da coluna que deseja jogar!'
    }
}

export default alteraStatus;