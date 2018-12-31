/*/////////////////////////////////////////////////////////////////////////
VARIABLES SIMPLES - HAY MAS VARIABLES DEFINIDAS EN LAS ULTIMAS LINEAS
/////////////////////////////////////////////////////////////////////////*/
var name,
    score,
    empiezo,
    herohp,
    monshp,
    random,
    incombat,
    sta,
    oro,
    pota,
    miam,
    magia,
    rmem,
    buyuse,
    botinf,
    botnew,
    mataMons,
    confiar,
    cuatroObjetos,
    explorado,
    exploradorCompleta;

/*/////////////////////////////////////////////////////////////////////////
                                RANDOM
/////////////////////////////////////////////////////////////////////////*/

function random(){
  rmem=(Math.floor(Math.random() * 9) + 1);
  return rmem;
}

/*/////////////////////////////////////////////////////////////////////////
                              ACCIONES
/////////////////////////////////////////////////////////////////////////*/

function avanzar(){
  document.getElementById("situacion").className=""
  buyuse=true;
  document.getElementById("racont").value=miam;
  document.getElementById("potcont").value=pota;
  document.getElementById("percont").value=magia;
  explorado=explorado+1;
  explorador(explorado);
  if (incombat==true){
    document.getElementById("situacion").value="Huyes del combate. Pierder 50 puntos...";
    if (score<50){
      score=0;
      document.getElementById("score").value=score;
    }else{
      score= score-50;
      document.getElementById("score").value=score;
      incombat=false;
    }
    incombat=false;
    sta=sta-2;
    if (sta<5){
      lowSta.className = "red";
      peligro.className="Blood";
    }
    if (sta<1){
      gameover();
    }
    document.getElementById("stamina").value=sta;
  }else{
    score= score+10;
    document.getElementById("score").value=score;
    document.getElementById("situacion").value="Haz ganado 10 puntos por exploración.";
    sta=sta-1;
    if (sta<5){
      lowSta.className = "red";
      peligro.className="Blood";
    }
    if (sta<1){
      gameover();
    }
  document.getElementById("stamina").value=sta;
  combate();
  }
}


function descansar(){
  document.getElementById("situacion").className=""
  if (incombat==false){
    document.getElementById("situacion").value="Te acurrucas en un rincon e intentas descansar";
    if (random()<7){
      document.getElementById("situacion").value="Te levantas mas descansado ..aunque con la espalda algo entumecida.";
      if (sta==12 && herohp<6){
        herohp=herohp+1;
        if(sta>4 && herohp>2){
          peligro.className="namescore";
          document.getElementById("vidas").className="";
        }
      document.getElementById("vidas").value=herohp;
      }
      if (sta<12){
        sta=sta+5;
        if (sta>12){
          sta=12;
        }
        if (sta>4){
          document.getElementById("stamina").className="";
        }
      }/**/
      if(sta>4 && herohp>2){
        peligro.className="namescore"
        document.getElementById("stamina").className="";
      }
      document.getElementById("stamina").value=sta;
    }else{
      incombat=true;
      monsatk();
    }
  }else{
    document.getElementById("situacion").value="No puedes descansar ahora!";
  }
}


function atacar(){

  if (incombat==true){
    if (random()<3){ //Heroe, daña o falla?
      ///////////////////////////////////////////
      setTimeout(pego(), 5000);
      //////////////////////////////////////////
      monshp=monshp-1;
     if (monshp<1){
        document.getElementById("situacion").className="textWhite"
        document.getElementById("situacion").value="DAS MUERTE AL MONSTRUO! Haz ganado 60pts por tu victoria.";
        score=score+60;
        oro=oro+Math.round(random()/2);
        document.getElementById("score").value=score;
        document.getElementById("orocont").value=oro;
        incombat=false;
        mataMons=mataMons+1;
        cazador(mataMons);
        //monshp=3;
        sta=sta-3;
        if (sta<5){
          lowSta.className = "red";
          peligro.className="Blood";
        }
        if (sta<1){
          gameover();
        }
      document.getElementById("stamina").value=sta;
      }
    }else{
      ///////////////////////////////////////////////////
      setTimeout(fallo(), 5000);
      //////////////////////////////////////////////////
      monsatk();
    }
  }else{
    document.getElementById("situacion").value="Abanicas tu espada al aire... ¡¿Que intentas hacer?!";
  }
}

/*/////////////////////////////////////////////////////////////////////////
                        ENCUENTROS CON PERSONAJES
/////////////////////////////////////////////////////////////////////////*/

function extraño(){
  herohp=6;
  sta=12;
  confiar=confiar+1;
  lowSta.className = "";
  lowPv.calssName = "textGreenYellow";
  peligro.className="namescore";
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
  document.getElementById("vidas").value=herohp;
  document.getElementById("stamina").value=sta;
  document.getElementById("situacion").value="Descansaste maravillosamente! incluso te sientes mas liviano..";
  document.getElementById("de").setAttribute("onClick", "descansar();");
  confiado(confiar);
}


function trasgo(){
  buyuse=false;
  document.getElementById("situacion").className="textViolet"
  document.getElementById("situacion").value="COMERCIANTE TRASGO: -Bienvenido aventurero! Tengo poderosos pergaminos por 30 monedas, pociones y raciones de viaje a solo 20. Una verdadera ganga!!! ...al menos si consideras tu situación jeje-";
  document.getElementById("percont").value=magia+"+1";
  document.getElementById("racont").value=miam+"+1";
  document.getElementById("potcont").value=pota+"+1";
  botinf.className = "luz";
  document.getElementById("inf").setAttribute("onClick", "infoShop();");
}

/*/////////////////////////////////////////////////////////////////////////
                                  COMBATE
/////////////////////////////////////////////////////////////////////////*/

function combate(){
  if (random()<6){ //Hay combate?
    incombat=true;
    monshp=3;
    //document.getElementById("situacion").value="Un monstruo se acerca!";
    setTimeout(viene(),5000);
    //
    if (random()<4){ //Quien empieza?
      //document.getElementById("situacion").value="El monstruo te ataca!";
      setTimeout(ataca(),5000);
      //
      monsatk();
    }
  }else{
    if (rmem==6){
      document.getElementById("de").setAttribute("onClick", "extraño();");
      document.getElementById("situacion").className="textViolet"
      document.getElementById("situacion").value="EXTRAÑO: -Luces exhausto, aquí es seguro. Porque no entras y descansas un poco-";
      botinf.className = "luz";
      document.getElementById("inf").setAttribute("onClick", "infoDesc();");
    }
    if (rmem==7){
      trasgo();
    }
    if (rmem>7){
      document.getElementById("situacion").value="La sala esta tranquila.";
    }
  }
}


function monsatk(){
  if (random()<3){ //Monstruo, daña o falla?
    ////////////////////////////
    setTimeout(pega(), 5000);
    ////////////////////////////
    herohp=herohp-1;
    if (herohp<3){
      lowPv.className = "red";
      peligro.className="Blood";
    }
    if (herohp<1){
      herohp=0;
      document.getElementById("vidas").value=herohp;
      incombat=false;
      gameover();
    }else{
      document.getElementById("vidas").value=herohp;
    }
  }else{
    ////////////////////////////
    setTimeout(falla(), 5000);
    ////////////////////////////
  }
}

/*/////////////////////////////////////////////////////////////////////////
                          USO Y VENTA DE OBJETOS
/////////////////////////////////////////////////////////////////////////*/

function usepot(){
  if (buyuse==true){
    if (pota>0){
      herohp=herohp+2;
      pota=pota-1;
      document.getElementById("potcont").value=pota;
      document.getElementById("situacion").className="textWhite";
      document.getElementById("situacion").value="Ingieres el contenido del frasco.. Tus heridas sanan frente a tus ojos.";
      if (herohp>6){
        herohp=6;
        document.getElementById("vidas").value=herohp;
      }
      if(sta>4 && herohp>2){
        peligro.className="namescore";
        document.getElementById("vidas").className="";
      }
      if(herohp>2 && herohp<6){ /*porque si sta>12 tambien es mayor a 4 //O es muy elevado o cualquiera...*/
        lowPv.className = "";
      }
        document.getElementById("vidas").value=herohp;
    }
  }else{
    if(oro>=20){
      oro=oro-20;
      pota=pota+1;
      document.getElementById("potcont").value=pota+"+1";
      document.getElementById("orocont").value=oro;
      cuatroObjetos=cuatroObjetos+1;
      materialista(cuatroObjetos);
    }else{
      document.getElementById("situacion").value="No me hagas perder el tiempo..";
    }
  }
}

function usera(){
  if(buyuse==true){
    if (miam>0){
      sta=sta+6;
      miam=miam-1;
      document.getElementById("racont").value=miam;
      document.getElementById("situacion").className="textWhite";
      document.getElementById("situacion").value="Miam.. engulles una ración borazmente...";
      if (sta>12){
        sta=12;
        document.getElementById("stamina").value=sta;
      }
      if(sta>4 && herohp>2){
        peligro.className="namescore";
        document.getElementById("vidas").className="";
      }
      if(sta>4 && sta<12){ /*porque si sta>12 tambien es mayor a 4*/
        lowSta.className = "";
      }
      document.getElementById("stamina").value=sta;
    }
  }else{
    if(oro>=20){
      oro=oro-20;
      miam=miam+1;
      document.getElementById("racont").value=miam+"+1";
      document.getElementById("orocont").value=oro;
      cuatroObjetos=cuatroObjetos+1;
      materialista(cuatroObjetos);
    }else{
      document.getElementById("situacion").value="No me hagas perder el tiempo..";
    }
  }
}

function useper(){
  if (buyuse==true){
    if (magia>0){
      if (incombat==true){
        magia=magia-1;
        document.getElementById("percont").value=magia;
        document.getElementById("situacion").className="textWhite";
        document.getElementById("situacion").value="Una cegadora llama blanca envuelve a la criatura reduciéndola a cenizas! Haz ganado 50pts por tu victoria!";
        score=score+50;
        oro=oro+Math.round(random()/2);
        document.getElementById("score").value=score;
        document.getElementById("orocont").value=oro;
        monshp=0;
        incombat=false;
        mataMons=mataMons+1;
        cazador(mataMons);
      }else{
      document.getElementById("situacion").value="No tiene sentido utilizar esto ahora..";
      }
    }
  }else{
    if(oro>=30){
      oro=oro-30;
      magia=magia+1;
      document.getElementById("percont").value=magia+"+1";
      document.getElementById("orocont").value=oro;
      cuatroObjetos=cuatroObjetos+1;
      materialista(cuatroObjetos);
    }else{
      document.getElementById("situacion").value="No me hagas perder el tiempo..";
    }
  }
}

/*/////////////////////////////////////////////////////////////////////////
                              SISTEMA DE LOGROS
/////////////////////////////////////////////////////////////////////////*/

function cazador(){
  if (mataMons==5){
    pota=pota+1;
    score=score+100;
    document.getElementById("cazador").className="completada";
    document.getElementById("potcont").value=pota;
    document.getElementById("score").value=score;
  }
}

function confiado(){
  if (confiar==2){
    oro=oro+30;
    score=score+45;
    document.getElementById("confiado").className="completada";
    document.getElementById("orocont").value=oro;
    document.getElementById("score").value=score;
  }

}

function materialista(){
  if (cuatroObjetos==4){
    score=score+450;
    document.getElementById("materialista").className="completada";
    document.getElementById("score").value=score;
    cuatroObjetos=cuatroObjetos+1;
  }
}

function explorador(){
  if (explorado==10){
    miam=miam+3;
    exploradorCompleta="<COMPLETADA>";
    document.getElementById("racont").value=miam;
    document.getElementById("explorador").className="completada";
  }
}

function exploradorEstado(){
  document.getElementById("situacion").className="textGreenYellow";
  document.getElementById("situacion").value="LOGRO \"Explorador\": Condicion: Explora 10 salas de la mazmorra | Recompenza: Racion(+3) | Estado: "+exploradorCompleta;
  /*document.getElementById("situacion").className="";*/
}

/*/////////////////////////////////////////////////////////////////////////
PRUEBAS MENSAGES COMBATE
/////////////////////////////////////////////////////////////////////////*/

function viene(){
  return  document.getElementById("situacion").value="Un monstruo se acerca!";
}

function ataca(){
  document.getElementById("situacion").className="textOrange";
  return document.getElementById("situacion").value="El monstruo te ataca!";
}

function ataco(){
}

function fallo(){
  document.getElementById("situacion").className="textblue";
  return document.getElementById("situacion").value="Fallas tu ataque";
}

function falla(){
  document.getElementById("situacion").className="textOrange";
  return document.getElementById("situacion").value="La ciatura falla su ataque";
}

function pego(){
  document.getElementById("situacion").className="textblue";
  return document.getElementById("situacion").value="Dañas a la criatura!";
}

function pega(){
  document.getElementById("situacion").className="textOrange";
  return document.getElementById("situacion").value="La ciatura te daña!";
}

/*/////////////////////////////////////////////////////////////////////////
                          ASISTENCIA AL USUARIO
/////////////////////////////////////////////////////////////////////////*/

function infoBienv(){
  alert("Bienvenido a Mini-DungeonJS! El objetivo del juego es sobrevivir tanto como puedas  intentando hacerte con la mayor cantidad de puntos que puedas. Solo da clic en COMENZAR para dar inicio a tu aventura. Recuerda chequear este icono cada ves que lo veas iluminado para obtener ayuda e indicaciones durante tu partida!");
  botinf.className = "";
}

function infoCtrl(){
  alert("Presta mucha atención a tus puntos de Estamina y Vitalidad, si alguno llegase a cero se dará por terminada la partida! Las acciones Atacar y Avanzar/Huir consumen estamina. Utiliza \"Atacar\" para combatir (un combate completo consume tres puntos de estamina). Usa \"Avanzar\" para moverte a través de la mazmorra, esta acción consume un punto de estamina más uno adicional si estas en medio de un combate (Huir). Por ultimo puedes usar \"Descansar\" para recobra 5puntos de estamina ò uno de vitalidad si tu estamina ya se encontraba completa.");
  botinf.className = "";
}

function infoShop(){
  alert("Te haz topado con Kublim! el trasgo mercader. Kublim se mueve por las penumbras de la mazmorra buscando aventureros desesperados, dispuestos a pagar sus desorbitantes precios... Si prestas atención a tu mochila veras que apareció un marcador \"+1\" junto a tus objetos. Mientras estés en esta sala cada vez que presiones un objeto se sumara una unidad del mismo a tu mochila, mientras puedas pagarlo claro..");
  botinf.className = "";
}

function infoDesc(){
  alert("Un extraño te ofrece un lugar seguro para descansar... no puedes saber sus intensiones pero ese fardo de paja y esa arpillera maltrecha son todo un lujo en esta situación. Para aceptar la propuesta del individuo utiliza \"Descansar\", si decides declinarla solo ignóralo y continua tu aventura.");
  botinf.className = "";
}

function infoDie(){
  alert("Haz muerto... pero no te preocupes, es parte del juego! Recuerda que el objetivo es conseguir puntos para ranquearte mejor en la tabla de posiciones y demostrarle tus habilidades al resto del mundo! Cierra esta ventana e inténtalo de nuevo. Seguro que esta vez lograras superar tu puntaje!");
  botinf.className = "";
}

/*/////////////////////////////////////////////////////////////////////////
                          NEW GAME - GAME OVER
/////////////////////////////////////////////////////////////////////////*/

function gameover(){

    document.getElementById("av").disabled=true;
    document.getElementById("at").disabled=true;
    document.getElementById("de").disabled=true;
    document.getElementById("ngame").disabled=false;
    movDes.className="deshabilitado";
    atDes.className="deshabilitado";
    desDes.className="deshabilitado";
    comDes.className="";

    document.getElementById("rabot").disabled=true;
    document.getElementById("potbot").disabled=true;
    document.getElementById("perbot").disabled=true;

    document.getElementById("situacion").value="Tu vista se nubla y antes de entender la situación, te ves envuelto en una eterna caída.. tus sentidos se apaciguan, tu corazón se acelera y el tiempo parece detenerse... Pero oyes algo en medio de tu desorientación. Algo que te marca el camino, una voz suena dentro de tu cabeza... o desde el corazón de la mazmorra... ya no puedes distinguirlo. Su mensaje no usa palabras pero comprendes su significado con absoluta claridad, la vos dice; te esta diciendo... Bienvenido... "

    document.getElementById("inf").setAttribute("onClick", "infoDie();");
    botinf.className = "blood";
}

function newgame(){
  score=0;
  herohp=6;
  monshp=3;
  incombat=false;
  sta=12;
  oro=999;
  pota=99;
  miam=99;
  magia=99;
  buyuse=true; //Define si los botones usan(true) o adquieren(false)los objetos.
  mataMons=0;
  confiar=0;
  cuatroObjetos=0;
  explorado=0;
  exploradorCompleta="<incompleta>";

  lowSta.className = "";
  lowPv.className = "";
  peligro.className="namescore";
  movDes.className="";
  atDes.className="";
  desDes.className="";
  comDes.className="deshabilitado";

  //elemento1= document.createElement("p");
  //padre= document.getElementById("situacion");

  document.getElementById("ngame").disabled=true;
  document.getElementById("av").disabled=false;
  document.getElementById("at").disabled=false;
  document.getElementById("de").disabled=false;

  document.getElementById("potbot").disabled=false;
  document.getElementById("rabot").disabled=false;
  document.getElementById("perbot").disabled=false;

  name=prompt("¡¿QUIEN OSA IRRUMPIR EN MIS DOMINIOS...?!");
  if (name.trim()==""){
    name="Aventurero";
  }
  document.getElementById("name").value=name;
  document.getElementById("situacion").value="Cruzas el umbral y te sumerges en las penumbras de la mazmorra...";
  document.getElementById("score").value=0;
  document.getElementById("vidas").value=herohp;
  document.getElementById("stamina").value=sta;
  document.getElementById("potcont").value=pota;
  document.getElementById("racont").value=miam;
  document.getElementById("percont").value=magia;
  document.getElementById("orocont").value=oro;

  botinf.className = "luz";
  document.getElementById("inf").setAttribute("onClick", "infoCtrl();");
}

/*/////////////////////////////////////////////////////////////////////////
                              CARGA INICIAL
/////////////////////////////////////////////////////////////////////////*/

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

document.getElementById("situacion").value="Luego de días un arduo viaje, al fin haz llegado a la mítica Mazmorra de Ohregon. Su imponente portal esta erguido frente a ti inmutable... como si alguna extraña magia lo mantuviera indiferente al paso del tiempo. Afirmas tu mano en la empuñadura de tu espada, tomas coraje y avanzas con seguridad sobre umbral de piedra negra... sientes una extraña sensación en tu mente que acrecienta conforme avanzas hacia tu destino... de pronto una imponente voz asalta tu mente recriminando con agresividad: (...)";

var movDes=document.getElementById("av");
var atDes=document.getElementById("at");
var desDes=document.getElementById("de");
var comDes=document.getElementById("ngame");

lowSta=document.getElementById("stamina");
lowPv=document.getElementById("vidas");
peligro=document.getElementById("barra");
/*contenedor=document.getElementById("contenedor");*/
botinf=document.getElementById("inf");
//botnew=document.getElementById("ngame");
movDes.className="deshabilitado";
atDes.className="deshabilitado";
desDes.className="deshabilitado";
botinf.className = "luz";
//botnew.className = "luz";
