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
tabuleiro.mouse={x:0,y:0}
tabuleiro.inicial={leftBola:0,topBola:0}
tabuleiro.placar ={jogador:0,inimigo:0}
tabuleiro.bola = {velocidadeX:1, velocidadeY:1,direcao:1};
tabuleiro.jogador={velocidadeY:0,pos:0};
tabuleiro.guest={velocidadeY:0,pos:0};
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
        return tabuleiro.guest.velocidadeY;
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
function calcularX(){
    tabuleiro.bola.velocidadeX=Math.max(0.7,tabuleiro.estagnacao-Math.abs(tabuleiro.bola.velocidadeY));
    if (isNaN(tabuleiro.bola.velocidadeX)){
        tabuleiro.bola.velocidadeX=0.7;
    }
    tabuleiro.bola.velocidadeX*=tabuleiro.bola.direcao
}
function aceleracao(velo){
    tabuleiro.bola.velocidadeY=Math.max(Math.min(tabuleiro.bola.velocidadeY+getVelocidade()+velo/Math.abs(tabuleiro.bola.velocidadeX),tabuleiro.estagnacao/10*8),-tabuleiro.estagnacao/10*8);
    
    calcularX();
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
        tabuleiro.bola.direcao-=2*tabuleiro.bola.direcao;
        aceleracao(velocidade);
    }
    if(errouPouco()){
        inverterY();
    }
}
function init(){
    linhas=["jogador","campo","guest","bola"];
    document.getElementById("menuDerrota").style.display="none";
    linhas.forEach(linha=>{
        tabuleiro.ids[linha].top=tabuleiro.css[linha].top;
        tabuleiro.ids[linha].left=tabuleiro.css[linha].left;
        tabuleiro.ids[linha].height=tabuleiro.css[linha].height;
        tabuleiro.ids[linha].width=tabuleiro.css[linha].width;
    });
    tabuleiro.inicial.leftBola=parseInt(tabuleiro.ids["bola"].left);
    tabuleiro.inicial.topBola=parseInt(tabuleiro.ids["bola"].top);
}
function moveGuest(){
    
    if(parseInt(tabuleiro.ids.bola.top)+
    parseInt(tabuleiro.ids.bola.height)<
    parseInt(tabuleiro.ids.guest.top)){
        tabuleiro.ids.guest.top=(parseInt(tabuleiro.ids.guest.top)-10)+"px";
        return;
    }
    if(parseInt(tabuleiro.ids.bola.top)>
    parseInt(tabuleiro.ids.guest.top)+
    parseInt(tabuleiro.ids.guest.height)){
        tabuleiro.ids.guest.top=(parseInt(tabuleiro.ids.guest.top)+10)+"px";
    }
}
function moveJogador(){
    
    if(tabuleiro.mouse.y<
    parseInt(tabuleiro.ids.jogador.top)+parseInt(tabuleiro.ids.jogador.height)/2){
        if(parseInt(tabuleiro.ids.jogador.top)<6){
            return;
        }
        tabuleiro.ids.jogador.top=(parseInt(tabuleiro.ids.jogador.top)-5)+"px";
        return;
    }else if (tabuleiro.mouse.y>
        parseInt(tabuleiro.ids.jogador.top)+parseInt(tabuleiro.ids.jogador.height)/2+10){
            if(parseInt(tabuleiro.ids.jogador.top)+parseInt(tabuleiro.ids.jogador.height)>-6+parseInt(tabuleiro.ids.campo.height)){
                return;
            }
    tabuleiro.ids.jogador.top=(parseInt(tabuleiro.ids.jogador.top)+5)+"px";
    }
    
}

function iniciarJogo(){
    tabuleiro.estagnacao=2;
    tabuleiro.bola.direcao=getRandomDirection();
    tabuleiro.bola.velocidadeY=1+Math.random();
    tabuleiro.ids.jogador.top=tabuleiro.css.jogador.top;
    tabuleiro.ids.jogador.left=tabuleiro.css.jogador.left;
    tabuleiro.ids.guest.top=tabuleiro.css.guest.top;
    tabuleiro.ids.guest.left=tabuleiro.css.guest.left;
    calcularX();
}
function getRandomDirection() {
    return Math.random()>0.5 ? -1:1;
  }
function calculaVelocidade(){
    tabuleiro.guest.velocidadeY=parseInt(tabuleiro.ids.guest.top)-tabuleiro.guest.pos;
    tabuleiro.guest.pos=parseInt(tabuleiro.ids.guest.top);
    tabuleiro.jogador.velocidadeY=parseInt(tabuleiro.ids.jogador.top)-tabuleiro.jogador.pos;
    tabuleiro.jogador.pos=parseInt(tabuleiro.ids.jogador.top);
}
function iniciar(){
    tabuleiro.placar.jogador=0;
    tabuleiro.placar.inimigo=0;
    document.getElementById("placarResultadoPlayer").innerHTML=`<h1>${tabuleiro.placar.jogador}</h1>`;
    document.getElementById("placarResultadoGuest").innerHTML=`<h1>${tabuleiro.placar.inimigo}</h1>`;
    tabuleiro.ids.campo.display="block";
    document.getElementById("placarStyle").style.display="block";
    document.getElementById("menu").style.display="none";
    let id= null;
    iniciarJogo();
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        fezGol=gol();
        console.log(`${tabuleiro.jogador.velocidadeY}+${tabuleiro.guest.velocidadeY}`);
        if (fezGol>0) {
            if(fezGol==1){
                tabuleiro.placar.inimigo+=1;
            }else{
                tabuleiro.placar.jogador+=1;
            }
            document.getElementById("placarResultadoPlayer").innerHTML=`<h1>${tabuleiro.placar.jogador}</h1>`;
            document.getElementById("placarResultadoGuest").innerHTML=`<h1>${tabuleiro.placar.inimigo}</h1>`;
            tabuleiro.ids.bola.top = (tabuleiro.inicial.topBola) + 'px';
            tabuleiro.ids.bola.left = (tabuleiro.inicial.leftBola) + 'px';
            if(Math.max(tabuleiro.placar.jogador,tabuleiro.placar.inimigo)>0){
                tabuleiro.ids.campo.display="none";
                document.getElementById("inicio").style.display="none";
                document.getElementById("menuDerrota").style.display="block";
                document.getElementById("menu").style.display="block"
                clearInterval(id);
            }
            iniciarJogo();
        } else {
            calculaVelocidade();
            invercao();
            moveGuest();
            moveJogador();
            tabuleiro.ids.bola.top = (parseInt(tabuleiro.ids.bola.top)+ Math.round(tabuleiro.bola.velocidadeY)) + 'px';
            tabuleiro.ids.bola.left = (parseInt(tabuleiro.ids.bola.left)+ Math.round(tabuleiro.bola.velocidadeX)) + 'px';
        }
    }
}
function comeco(){
    document.getElementById("inicio").style.display="block";
    document.getElementById("placarStyle").style.display="none";
    document.getElementById("menuDerrota").style.display="none";
}
init();
document.onmousemove = (event) => {
    tabuleiro.mouse.x = event.clientX-Math.floor(window.innerWidth*27.5/100);
    tabuleiro.mouse.y = event.clientY-Math.floor(window.innerHeight*13.5/100)-103;
}