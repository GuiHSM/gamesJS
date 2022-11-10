tabuleiro ={};
tabuleiro.placar ={jogador:0,inimigo:0}
tabuleiro.bola = {velocidadeX:1, velocidadeY:1};
tabuleiro.jogador={velocidadeY:0};
tabuleiro.inimigo={velocidadeY:0};
tabuleiro.estagnacao=2;
tabuleiro.indice=1;
tabuleiro.tamanhoBola=14;
tabuleiro.erro=3;
function gol(){
    if(parseInt(document.getElementById("bola").style.left)<parseInt(document.getElementById("jogador").style.left)){
        return 1;
    }
    if(parseInt(document.getElementById("bola").style.left)>parseInt(document.getElementById("inimigo").style.left)+parseInt(document.getElementById("inimigo").style.width)){
        return 2;
    }
    return 0;
}
function defendeu(){
    debugger;
    if((tabuleiro.bola.velocidadeX<0&&
        parseInt(document.getElementById("bola").style.left)-tabuleiro.erro<
        parseInt(document.getElementById("jogador").style.left)+
        parseInt(document.getElementById("jogador").style.width)&&
        parseInt(document.getElementById("bola").style.left)-tabuleiro.erro<
        parseInt(document.getElementById("jogador").style.left)+
        parseInt(document.getElementById("jogador").style.width))&&
        parseInt(document.getElementById("bola").style.top)+tabuleiro.tamanhoBola>
        parseInt(document.getElementById("jogador").style.top)&&
        parseInt(document.getElementById("bola").style.top)<
        parseInt(document.getElementById("jogador").style.top)+
        parseInt(document.getElementById("jogador").style.height)){
            return true;
        }
    
    if((tabuleiro.bola.velocidadeX>0&&
        parseInt(document.getElementById("bola").style.left)+
        tabuleiro.tamanhoBola-tabuleiro.erro<
        parseInt(document.getElementById("inimigo").style.left)&&
        parseInt(document.getElementById("bola").style.left)+
        tabuleiro.tamanhoBola+tabuleiro.erro>
        parseInt(document.getElementById("inimigo").style.left))&&
        parseInt(document.getElementById("bola").style.top)+tabuleiro.tamanhoBola>
        parseInt(document.getElementById("inimigo").style.top)&&
        parseInt(document.getElementById("bola").style.top)<
        parseInt(document.getElementById("inimigo").style.top)+
        parseInt(document.getElementById("inimigo").style.height)){
            return true;
        }
    return false;
}
function inverterY(){
    debugger;
    tabuleiro.bola.velocidadeY-=2*tabuleiro.bola.velocidadeY;
}
function inverterX(){
    debugger;
    tabuleiro.bola.velocidadeX-=2*tabuleiro.bola.velocidadeX;
}
function getVelocidade(){
    if(document.getElementById("bola").left>100){
        return tabuleiro.inimigo.velocidadeY;
    }
    return tabuleiro.jogador.velocidadeY;
}
function errouPouco(){
    players=["jogador","inimigo"];
    players.forEach(player => {
        if((parseInt(document.getElementById("bola").style.top)+tabuleiro.erro>
        parseInt(document.getElementById(player).style.top)+
        parseInt(document.getElementById(player).style.height)&&
        parseInt(document.getElementById("bola").style.top)+tabuleiro.erro<
        parseInt(document.getElementById(player).style.top)+
        parseInt(document.getElementById(player).style.height))&&
        parseInt(document.getElementById("bola").style.left)>
        parseInt(document.getElementById(player).style.left)&&
        parseInt(document.getElementById("bola").style.left)<
        parseInt(document.getElementById(player).style.left)+
        parseInt(document.getElementById(player).style.width)){
            return true;
        }
        
        if((parseInt(document.getElementById("bola").style.top)+
        tabuleiro.tamanhoBola+tabuleiro.erro>
        parseInt(document.getElementById(player).style.top)&&
        parseInt(document.getElementById("bola").style.top)+
        tabuleiro.tamanhoBola-tabuleiro.erro>
        parseInt(document.getElementById(player).style.top))&&
        parseInt(document.getElementById("bola").style.left)>
        parseInt(document.getElementById(player).style.left)&&
        parseInt(document.getElementById("bola").style.left)<
        parseInt(document.getElementById(player).style.left)+
        parseInt(document.getElementById(player).style.width)){
            return true;
        }
    });
    
    return false;
}
function aceleracao(velo){
    debugger;
    tabuleiro.bola.velocidadeY+=getVelocidade()*velo/tabuleiro.bola.velocidadeX;
    tabuleiro.bola.velocidadeX=Math.sqrt(tabuleiro.estagnacao-tabuleiro.bola.velocidadeY*tabuleiro.bola.velocidadeY);
}
function colidiuTabuleiro(){
    if(parseInt(document.getElementById("bola").style.top)<tabuleiro.erro
    ||(parseInt(document.getElementById("bola").style.top)>
    parseInt(document.getElementById("campo").style.height)-tabuleiro.erro)){
        return true;
    }
    return false;
}
function invercao(){
    if(colidiuTabuleiro()){
        inverterY();
    }
    if(defendeu()){
        tabuleiro.estagnacao+=tabuleiro.indice;
        let velocidade=tabuleiro.bola.velocidadeY;
        aceleracao(velocidade);
        inverterX();
    }
    if(errouPouco()){
        inverterY();
    }
}

function game(){
    document.getElementById("campo").style.display="block";
    document.getElementById("menu").style.display="none";
    let id= null;
    const bolaAnim = document.getElementById("bola");
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        fezGol=gol();
        if (fezGol>0) {
            if(fezGol==1){
                tabuleiro.placar.jogador+=1;
            }else{
                tabuleiro.placar.inimigo+=1;
            }
            document.getElementById("placarResultadoPlayer").value="<h1>tabuleiro.placar.jogador</h1>";
            document.getElementById("placarResultadoCPU").value="<h1>tabuleiro.placar.inimigo</h1>";
        } else {
            invercao();
            bolaAnim.style.top = (parseInt(bolaAnim.style.top)+ Math.round(tabuleiro.bola.velocidadeY)) + 'px';
            bolaAnim.style.left = (parseInt(bolaAnim.style.left)+ Math.round(tabuleiro.bola.velocidadeX)) + 'px';
        }
    }
}
function inic(){
    let element = document.querySelector('#bola');
    let style = getComputedStyle(element);
    document.getElementById("bola").style.top=style.top;
    document.getElementById("bola").style.left=style.left;
    let nomes=["campo","jogador","inimigo"];
    nomes.forEach(nome => {
        element = document.querySelector(`#${nome}`);
        style = getComputedStyle(element);
        document.getElementById(nome).style.top=style.top;
        document.getElementById(nome).style.left=style.left;
        document.getElementById(nome).style.height=style.height;
        document.getElementById(nome).style.width=style.width;
    });
}
inic()