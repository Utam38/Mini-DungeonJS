//Declaro variables:
var name;
var score;
var empiezo;
var herohp;
var monshp;
var random;
var incombat;
var sta;
var oro;
var pota;
var miam;
var magia;
var rmem;
var buyuse;
//var pergamino;
//var racion;

//Declaro funciones:
/*function random(){
  return (Math.floor(Math.random() * 9) + 1);
}*/

function random(){
  rmem=(Math.floor(Math.random() * 9) + 1);
  return rmem;
}

function avanzar(){
  document.getElementById("racont").value=miam;
  document.getElementById("potcont").value=pota;
  document.getElementById("percont").value=magia;
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
    combate();
  }
}

function combate(){
  if (random()<6){ //Hay combate?
    incombat=1;
    monshp=3;
    document.getElementById("situacion").value="Un monstruo se acerca!";
    if (random()<4){ //Quien empieza?
      document.getElementById("situacion").value="El monstruo te ataca!";
      monsatk();
    }
  }else{
    if (rmem==6){
      document.getElementById("de").setAttribute("onClick", "extraño();");
      document.getElementById("situacion").value="Extraño: Luces exausto, aqui es seguro. Porque no entras y descansas un poco.";
    }
    if (rmem==7){
      trasgo();
    }
    if (rmem>7){
      document.getElementById("situacion").value="La sala esta tranquila.";
    }
  }
}

function extraño(){
  herohp=6;
  sta=12;
  if (random()<6){
    magia=0;
    pota=0;
    miam=0;
    oro=0;
    document.getElementById("percont").value=magia;
    document.getElementById("potcont").value=pota;
    document.getElementById("racont").value=miam;
    document.getElementById("orocont").value=oro;
  }
  document.getElementById("situacion").value="Descansaste maravillosamente! incluso te sientes mas liviano..";
  document.getElementById("de").setAttribute("onClick", "descansar();");
}


function trasgo(){
  buyuse=0;
  document.getElementById("situacion").value="Trasgo comerciante: Bienvenido aventurero! Tengo poderosos pergaminos por 50 monedas, pociones y raciones de viaje a solo 30. Una verdadera ganga!!! ...al menos si consideras tu situacion jeje";
  document.getElementById("percont").value=magia+"+1";
  document.getElementById("racont").value=miam+"+1";
  document.getElementById("potcont").value=pota+"+1";
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
        document.getElementById("situacion").value="DAS MUERTE AL MONSTRUO! Haz ganado 60pts por tu victoria.";
        score=score+60;
        oro=oro+Math.round(random()/2);
        document.getElementById("score").value=score;
        document.getElementById("orocont").value=oro;
        incombat=0;
        //monshp=3;
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

function usepot(){
  if (buyuse==1){
    if (pota>0){
      herohp=herohp+2;
      pota=pota-1;
      document.getElementById("potcont").value=pota;
      document.getElementById("situacion").value="Ingieres el contenido del frasco.. Tus heridas sanan frente a tus ojos.";
      if (herohp>6){
        herohp=6;
        document.getElementById("vidas").value=herohp;
      }else{
        document.getElementById("vidas").value=herohp;
      }
    }
  }else{
    if(oro>=30){
      oro=oro-30;
      pota=pota+1;
      document.getElementById("potcont").value=pota+"+1";
      document.getElementById("orocont").value=oro;
    }else{
      document.getElementById("situacion").value="No me hagas perder el tiempo..";
    }
  }
}

function usera(){
  if(buyuse==1){
    if (miam>0){
      sta=sta+6;
      miam=miam-1;
      document.getElementById("racont").value=miam;
      document.getElementById("situacion").value="Miam.. enguyes una racion borazmente...";
      if (sta>12){
        sta=12;
        document.getElementById("stamina").value=sta;
      }else{
        document.getElementById("stamina").value=sta;
      }
    }
  }else{
    if(oro>=30){
      oro=oro-30;
      miam=miam+1;
      document.getElementById("racont").value=miam+"+1";
      document.getElementById("orocont").value=oro;
    }else{
      document.getElementById("situacion").value="No me hagas perder el tiempo..";
    }
  }
}

function useper(){
  if (buyuse==1){
    if (magia>0){
      if (incombat==1){
        magia=magia-1;
        document.getElementById("percont").value=magia;
        document.getElementById("situacion").value="Una cegadora llama blanca embuelve a la criatura reduciendola a cenizas!";
        document.getElementById("situacion").value="Haz ganado 50pts por tu victoria!";
        score=score+50;
        oro=oro+Math.round(random()/2);
        document.getElementById("score").value=score;
        document.getElementById("orocont").value=oro;
        monshp=0;
        incombat=0;
      }else{
      document.getElementById("situacion").value="No tiene sentido utilizar esto ahora..";
      }
    }
  }else{
    if(oro>=45){
      oro=oro-45;
      magia=magia+1;
      document.getElementById("percont").value=magia+"+1";
      document.getElementById("orocont").value=oro;
    }else{
      document.getElementById("situacion").value="No me hagas perder el tiempo..";
    }
  }
}

/*function trasgo(){
  if (random()<4);
    document.getElementById("situacion").value="Trasgo comerciante: Bienvenido aventurero! quizas algo de esto podria serte de utilidad...";
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
  incombat=0; //Define si estamos en batalla(1) o ne(0).
  sta=12;
  oro=1000;
  pota=10;
  miam=10;
  magia=10;
  buyuse=1; //Define si los botones usan(1) o adquieren(0)los objetos.

  document.getElementById("ngame").disabled=true;
  document.getElementById("av").disabled=false;
  document.getElementById("at").disabled=false;
  document.getElementById("de").disabled=false;

  document.getElementById("potbot").disabled=false;
  document.getElementById("rabot").disabled=false;
  document.getElementById("perbot").disabled=false;

  name=prompt("¡¿QUIEN OSA IRRUMPIR EN MIS DOMINIOS...?!");
  document.getElementById("name").value=name;
  document.getElementById("situacion").value="Cruzas el umbral y te sumerges en las penumbras de la mazmorra...";
  document.getElementById("score").value=0;
  document.getElementById("vidas").value=herohp;
  document.getElementById("stamina").value=sta;
  document.getElementById("potcont").value=pota;
  document.getElementById("racont").value=miam;
  document.getElementById("percont").value=magia;
  document.getElementById("orocont").value=oro;
}

document.getElementById("av").disabled=true;
document.getElementById("at").disabled=true;
document.getElementById("de").disabled=true;

document.getElementById("potcont").disabled=true;
document.getElementById("racont").disabled=true;
document.getElementById("percont").disabled=true;
document.getElementById("potbot").disabled=true;
document.getElementById("rabot").disabled=true;
document.getElementById("perbot").disabled=true;
document.getElementById("orocont").disabled=true;

document.getElementById("stamina").disabled=true;
document.getElementById("score").disabled=true;
document.getElementById("situacion").disabled=true;
document.getElementById("name").disabled=true;
document.getElementById("vidas").disabled=true;

document.getElementById("situacion").value="Luego de días un arduo viaje, al fin haz llegado a la mitica Mazmorra de Ohregon. Su imponente portal esta erguido frente a ti inmutable... como si alguna extraña magia lo mantubiera indiferente al paso del tiempo. Afirmas tu mano en la empuñadura de tu espada, tomas coraje y avanzas con seguridad sobre umbral de piedra negra... sientes una extraña sensacion en tu mente que acrecienta conforme avanzas hacia tu destino... de pronto una imponente voz asalta tu mente reciminando con agresividad: (...)";
