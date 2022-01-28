let bolas = document.getElementsByClassName('bola')



let mT =    //matrix Tabuleiro = representa 7 colunas // 6 linhas de jogadas
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
        ]


function col(x, y, player) {
        console.log('teste1')
        let nMatrix = Number(x)*6+Number(y)
        bolas[nMatrix].style.backgroundColor = 'black'
}

/*function linhaDisponivel(Col,lin, player) {
    while (mT[col][lin] != 0 || linha >= 0 ){ 
        if (mT[col][lin] != 0) {
            mT[col][lin] = player
            console.log('teste12')
            
        }
        else {
            col-=7
        }
    } 
}

let n = 2


//for (let cont1 = 0; cont1 > 36; cont1++){
//}

let X = document.createElement('div')


function carregar() {
   // alert('teste' + bolas[2].innerHTML)
    //bolas[n].innerHTML = ''
    //X.document.body.appendChild('eu de novo')
    console.log("teste")
}

//X.innerHTML = 'eu de novo'
//let tab = document.getElementById('tabuleiro')
//let matTab = [[1,2][1,2]]*/