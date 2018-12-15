//Declaro variables:
var name;
var score;
var empiezo;
var herohp;
var monshp;
var random;
var incombat;
var sta;

//Declaro funciones:
function random(){
  return (Math.floor(Math.random() * 9) + 1);
}

function avanzar(){
  if (incombat==1){
    document.getElementById("situacion").value="Huyes del combate. Pierder 50 puntos...";
    if (score<50){
      score=0;
      document.getElementById("score").value=score;
    }else{
      score= score-50;
      document.getElementById("score").value=score;
      incombat=0;
    }
    incombat=0;
    sta=sta-2;
    if (sta<1){
      gameover();
    }
    document.getElementById("stamina").value=sta;
  }else{
    score= score+10;
    document.getElementById("score").value=score;
    document.getElementById("situacion").value="Haz ganado 10 puntos por exploración.";
    sta=sta-1;
    if (sta<1){
      gameover();
    }
    document.getElementById("stamina").value=sta;
    //setTimeout(time(), 1000);
    //sleep(3000);
    combate();
  }
}

function combate(){
  if (random()<6){ //Hay combate?
    incombat=1;
    document.getElementById("situacion").value="Un monstruo se acerca!";
    if (random()<4){ //Quien empieza?
      document.getElementById("situacion").value="El monstruo te ataca!";
      monsatk();
    }
  }else{
    document.getElementById("situacion").value="La sala esta tranquila.";
  }
}


function monsatk(){
  if (random()<3){ //Monstruo, daña o falla?
    document.getElementById("situacion").value="La ciatura te daña!";
    herohp=herohp-1;
    if (herohp<1){
      herohp=0;
      document.getElementById("vidas").value=herohp;
      incombat=0;
      gameover();
    }else{
      document.getElementById("vidas").value=herohp;
    }
  }else{
    document.getElementById("situacion").value="La ciatura falla su ataque";
  }
}

function atacar(){
  if (incombat==1){
    if (random()<3){ //Heroe, daña o falla?
      document.getElementById("situacion").value="Dañas a la criatura!";
      monshp=monshp-1;
     if (monshp<1){
        document.getElementById("situacion").value="DAS MUERTE AL MONSTRUO! Haz ganado 60 puntos por tu victoria.";
        score=score+60;
        document.getElementById("score").value=score;
        incombat=0;
        monshp=3;
        sta=sta-3;
        if (sta<1){
          gameover();
        }
      document.getElementById("stamina").value=sta;
      }
    }else{
      document.getElementById("situacion").value="Fallas tu ataque";
      monsatk();
    }
  }else{
    document.getElementById("situacion").value="Abanicas tu espada al aire... ¡¿Que intentas hacer?!";
  }
}

function descansar(){
  if (incombat==0){
    document.getElementById("situacion").value="Te acurrucas en un rincon e intentas descansar";
    if (random()<7){
      document.getElementById("situacion").value="Te levantas mas descansado ..aunque con la espalda algo entuecida.";
      if (sta==12 && herohp<6){
        herohp=herohp+1;
        document.getElementById("vidas").value=herohp;
      }
      if (sta<12){
        sta=sta+5;
        if (sta>12){
          sta=12;
        }
      document.getElementById("stamina").value=sta;
      }
    }else{
      incombat=1;
      monsatk();
    }
  }else{
    document.getElementById("situacion").value="No puedes descansar ahora!";
  }
}

//Funcion copy/paste...
/*function sleep() {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > 1000){
      break;
    }
  }
}*/

function gameover(){
  document.getElementById("situacion").value="Tu vista se nubla y antes de entender la situacion, te ves enbuelto en una eterna caida.. tus sentidos se apasiguan, tu corazon se acelera y el tiempo parece detenerse... Pero oyes algo en medio de tu desorientacion. Algo que te marca el camino, una voz suena dentro de tu cabeza... o desde el corazon de la mazmorra... ya no puedes distinguirlo. Su mansage no usa palabras pero comprendes su significado con absoluta claridad, la vos dice; te esta diciendo... Bienvenido... "
    document.getElementById("av").disabled=true;
    document.getElementById("at").disabled=true;
    document.getElementById("de").disabled=true;
    document.getElementById("ngame").disabled=false;
}

function newgame(){
  score=0;
  herohp=6;
  monshp=3;
  incombat=0;
  sta=12;

  document.getElementById("ngame").disabled=true;
  document.getElementById("av").disabled=false;
  document.getElementById("at").disabled=false;
  document.getElementById("de").disabled=false;
  name=prompt("¡¿QUIEN OSA IRRUMPIR EN MIS DOMINIOS...?!");
  document.getElementById("name").value=name;
  document.getElementById("situacion").value="Cruzas el umbral y te sumerges en las penumbras de la mazmorra...";
  document.getElementById("score").value=0;
  document.getElementById("vidas").value=herohp;
  document.getElementById("stamina").value=sta;
}

//Inicializo variables:


//comienzo de ejecucion:

document.getElementById("av").disabled=true;
document.getElementById("at").disabled=true;
document.getElementById("de").disabled=true;

document.getElementById("stamina").disabled=true;
document.getElementById("score").disabled=true;
document.getElementById("situacion").disabled=true;
document.getElementById("name").disabled=true;
document.getElementById("vidas").disabled=true;

document.getElementById("situacion").value="Luego de días un arduo viaje, al fin haz llegado a la mitica Mazmorra de Ohregon. Su imponente portal esta erguido frente a ti inmutable... como si alguna extraña magia lo mantubiera indiferente al paso del tiempo. Afirmas tu mano en la empuñadura de tu espada, tomas coraje y avanzas con seguridad sobre umbral de piedra negra... sientes una extraña sensacion en tu mente que acrecienta conforme avanzas hacia tu destino... de pronto una imponente voz asalta tu mente reciminando con agresividad: (...)";
