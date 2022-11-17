tabuleiro ={};
tabuleiro.ids={
    jogador:document.getElementById("jogador").style,
    guest:document.getElementById("guest").style,
    bola:document.getElementById("bola").style,
    campo:document.getElementById("campo").style
}
tabuleiro.css={
    jogador:getComputedStyle(document.querySelector('#jogador')),
    guest:getComputedStyle(document.querySelector('#guest')),
    bola:getComputedStyle(document.querySelector('#bola')),
    campo:getComputedStyle(document.querySelector('#campo'))
}
tabuleiro.placar ={jogador:0,inimigo:0}
tabuleiro.bola = {velocidadeX:1, velocidadeY:1};
tabuleiro.jogador={velocidadeY:0};
tabuleiro.inimigo={velocidadeY:0};
tabuleiro.estagnacao=2;
tabuleiro.indice=1;
tabuleiro.tamanhoBola=14;
tabuleiro.erro=3;
function gol(){
    if(parseInt(tabuleiro.ids.bola.left)<parseInt(tabuleiro.ids.jogador.left)){
        return 1;
    }
    if(parseInt(tabuleiro.ids.bola.left)>parseInt(tabuleiro.ids.guest.left)+parseInt(tabuleiro.ids.guest.width)){
        return 2;
    }
    return 0;
}
function defendeu(){
    if((tabuleiro.bola.velocidadeX<0&&
        parseInt(tabuleiro.ids.bola.left)-tabuleiro.erro<
        parseInt(tabuleiro.ids.jogador.left)+
        parseInt(tabuleiro.ids.jogador.width)&&
        parseInt(tabuleiro.ids.bola.left)+tabuleiro.erro<
        parseInt(tabuleiro.ids.jogador.left)+
        parseInt(tabuleiro.ids.jogador.width))&&
        parseInt(tabuleiro.ids.bola.top)+tabuleiro.tamanhoBola>
        parseInt(tabuleiro.ids.jogador.top)&&
        parseInt(tabuleiro.ids.bola.top)<
        parseInt(tabuleiro.ids.jogador.top)+
        parseInt(tabuleiro.ids.jogador.height)){
            return true;
        }
    
    if((tabuleiro.bola.velocidadeX>0&&
        parseInt(tabuleiro.ids.bola.left)+
        parseInt(tabuleiro.ids.bola.height)-tabuleiro.erro<
        parseInt(tabuleiro.ids.guest.left)&&
        parseInt(tabuleiro.ids.bola.left)+
        parseInt(tabuleiro.ids.bola.height)+tabuleiro.erro>
        parseInt(tabuleiro.ids.guest.left))&&
        parseInt(tabuleiro.ids.bola.top)+tabuleiro.tamanhoBola>
        parseInt(tabuleiro.ids.guest.top)&&
        parseInt(tabuleiro.ids.bola.top)<
        parseInt(tabuleiro.ids.guest.top)+
        parseInt(tabuleiro.ids.guest.height)){
            return true;
        }
    return false;
}
function inverterY(){
    tabuleiro.bola.velocidadeY-=2*tabuleiro.bola.velocidadeY;
}
function inverterX(){
    tabuleiro.bola.velocidadeX-=2*tabuleiro.bola.velocidadeX;
}
function getVelocidade(){
    if(parseInt(tabuleiro.ids.bola.left)>100){
        return tabuleiro.inimigo.velocidadeY;
    }
    return tabuleiro.jogador.velocidadeY;
}
function errouPouco(){
    players=["jogador","guest"];
    players.forEach(player => {
        if((parseInt(tabuleiro.ids.bola.top)+tabuleiro.erro>
        parseInt(tabuleiro.ids[player].top)+
        parseInt(tabuleiro.ids[player].height)&&
        parseInt(tabuleiro.ids.bola.top)-tabuleiro.erro<
        parseInt(tabuleiro.ids[player].top)+
        parseInt(tabuleiro.ids[player].height))&&
        parseInt(tabuleiro.ids.bola.left)>
        parseInt(tabuleiro.ids[player].left)&&
        parseInt(tabuleiro.ids.bola.left)<
        parseInt(tabuleiro.ids[player].left)+
        parseInt(tabuleiro.ids[player].width)){
            return true;
        }
        
        if((parseInt(tabuleiro.ids.bola.top)+
        tabuleiro.tamanhoBola+tabuleiro.erro>
        parseInt(tabuleiro.ids[player].top)&&
        parseInt(tabuleiro.ids.bola.top)+
        tabuleiro.tamanhoBola-tabuleiro.erro>
        parseInt(tabuleiro.ids[player].top))&&
        parseInt(tabuleiro.ids.bola.left)>
        parseInt(tabuleiro.ids[player].left)&&
        parseInt(tabuleiro.ids.bola.left)<
        parseInt(tabuleiro.ids[player].left)+
        parseInt(tabuleiro.ids[player].width)){
            return true;
        }
    });
    
    return false;
}
function aceleracao(velo){
    tabuleiro.bola.velocidadeY+=getVelocidade()*velo/tabuleiro.bola.velocidadeX;
    tabuleiro.bola.velocidadeX=Math.sqrt(tabuleiro.estagnacao-tabuleiro.bola.velocidadeY*tabuleiro.bola.velocidadeY);
}
function colidiuTabuleiro(){
    if(parseInt(tabuleiro.ids.bola.top)<tabuleiro.erro
    ||(parseInt(tabuleiro.ids.bola.top)>
    parseInt(tabuleiro.ids.campo.height)-tabuleiro.erro)){
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
function init(){
    linhas=["jogador","campo","guest","bola"]
    linhas.forEach(linha=>{
        console.log(linha);
        tabuleiro.ids[linha].top=tabuleiro.css[linha].top;
        tabuleiro.ids[linha].left=tabuleiro.css[linha].left;
        tabuleiro.ids[linha].height=tabuleiro.css[linha].height;
        tabuleiro.ids[linha].width=tabuleiro.css[linha].width;
    })
}
function moveGuest(){
    debugger;
    if(parseInt(tabuleiro.ids.bola.top)+
    parseInt(tabuleiro.ids.bola.height)<
    parseInt(tabuleiro.ids.guest.top)){
        tabuleiro.ids.guest.top=(parseInt(tabuleiro.ids.guest.top)-1)+"px";
        return;
    }
    if(parseInt(tabuleiro.ids.bola.top)>
    parseInt(tabuleiro.ids.guest.top)+
    parseInt(tabuleiro.ids.guest.height)){
        tabuleiro.ids.guest.top=(parseInt(tabuleiro.ids.guest.top)+1)+"px";
    }
}
function moveJogador(){
    debugger;
    if(parseInt(tabuleiro.ids.bola.top)+
    parseInt(tabuleiro.ids.bola.height)<
    parseInt(tabuleiro.ids.jogador.top)+20){
        tabuleiro.ids.jogador.top=(parseInt(tabuleiro.ids.jogador.top)-1)+"px";
        return;
    }
    if(parseInt(tabuleiro.ids.bola.top)>
    parseInt(tabuleiro.ids.jogador.top)+
    parseInt(tabuleiro.ids.jogador.height)-20){
        tabuleiro.ids.jogador.top=(parseInt(tabuleiro.ids.jogador.top)+1)+"px";
    }
}
function game(){
    tabuleiro.ids.campo.display="block";
    document.getElementById("menu").style.display="none";
    let id= null;
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
            document.getElementById("placarResultadoGuest").value="<h1>tabuleiro.placar.inimigo</h1>";
            reiniciar()
            tabuleiro.ids.bola.top = (tabuleiro.inicial.topBola) + 'px';
            tabuleiro.ids.bola.left = (ini) + 'px';
        } else {
            invercao();
            moveGuest();
            moveJogador();
            tabuleiro.ids.bola.top = (parseInt(tabuleiro.ids.bola.top)+ Math.round(tabuleiro.bola.velocidadeY)) + 'px';
            tabuleiro.ids.bola.left = (parseInt(tabuleiro.ids.bola.left)+ Math.round(tabuleiro.bola.velocidadeX)) + 'px';
        }
    }
}
init();