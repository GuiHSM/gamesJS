<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Pong</title>
</head>

<body>
  <div id="campo">
    <div id="jogador"></div>
    <div id="inimigo"></div>
    <div id="bola"></div>
    <div id="linha"></div>
  </div>
  <div id="placarStyle"><label id="placarJogador" for=""></label>
    <div id="placarPlayers">
      <h2>PLAYER GUEST</h2>
    </div>
    <div id="placarResultadoPlayer">
      <h1>0</h1>
    </div>
    <div id="placarResultadoCpu">
      <h1>0</h1>
    </div>
  </div>
  <div id="menu">
    <div id="botaoJogar">
      <h1 id="jogar" onclick="game()">JOGAR</h1>
    </div>
    <div id="titulo">
      <h1>PONG</h1>
    </div>
  </div>
<script src="animacao.js"></script>

</body>

</html>