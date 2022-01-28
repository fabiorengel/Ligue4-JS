let bolas = document.getElementsByClassName('bola')


let mT =    //matrix Tabuleiro = representa 7 colunas // 6 linhas de jogadas
[
    [0,0,0,0,0,0], // coluna 0 
    [0,0,0,0,0,0], // coluna 1 
    [0,0,0,0,0,0], // coluna 2 
    [0,0,0,0,0,0], // coluna 3 
    [0,0,0,0,0,0], // coluna 4 
    [0,0,0,0,0,0], // coluna 5 
    [0,0,0,0,0,0]  // coluna 6 
]

//console.log(mT)

function casaLivre(x,y) {
    console.log(x + y)

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
    console.log(x)
let cLivre = casaLivre(x,y) 
//console.log(cLivre[0],cLivre[1])    
    if (cLivre[0]) {
        let nMatrix = Number(x)+Number(cLivre[1])*7
        bolas[nMatrix].style.backgroundColor = 'yellow'
        mT[x][cLivre[1]] = player
    }
}    
//console.log(mT)


//return true

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

console.log(bolas)
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