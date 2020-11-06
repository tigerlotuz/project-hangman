

// Orden som datorn kan välja 
let ord = ['bacon', 'chans', 'dator', 'fasad', 'glass', 'hemsk', 'jycke', 
    'kavel', 'lilja', 'melon', 'alarm', 'alibi', 'altan', 'fabel', 'fikon', 
    'godis', 'grill', 'hagel', 'hobby', 'mamma', 'miljö', 'mixer', 'banan', 
    'bagge', 'bambu', 'chips', 'cider', 'clown', 'demon', 'drake', 'enkel', 
    'episk', 'enzym', 'nylon', 'näpen', 'nalle', 'idyll', 'ironi', 'index', 
    'juvel', 'jänta', 'kaffe', 'kakao', 'kanel', 'labil', 'lasso', 'tablå', 
    'tiger', 'uggla', 'utdöd', 'utopi', 'odjur', 'odåga', 'ogräs', 'pappa', 
    'pirat', 'pudel', 'robot', 'rispa', 'rouge', 'safir', 'sjyst', 'skata', 
    'trött', 'vinyl', 'vante', 'vajer', 'yppig', 'yngel', 'ytlig', 'åbäke', 
    'ånger', 'åskar', 'äpple', 'ärlig', 'ärtig', 'ökänd', 'öppen', 'öland',
];
console.log(ord)
// linjer där bokstäverna hamnar
let linjer = [
    '__',
    '__',
    '__',
    '__',
    '__'

];

alfabeteBokstäver = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä','Ö'];



]
/* Jquery function till startknappen
$(document).ready(function(){
/* när knappen klickas på så startar funktionen
    $(".button2").click(function(){
        /* visar eller döljer ".dold_text1"
         $(".dold_text1").toggle();
    });
});*/

startText = () => {
    document.getElementById("dold_text1").innerHTML = "Välj bokstäver ur alfabetet.";
  }
  document.getElementById("start").addEventListener("click", startText);

const main = document.querySelector('main');
const body = document.querySelector('body');
const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp'); 
let resetKnapp = document.querySelector('#reset'); 
const startKnapp = document.querySelector('#start');
const alfabete = document.querySelectorAll('.alfabetet>button');
const alfabetetSection = document.querySelector('.alfabetet');
let ordetsBokstäver= [];
let valdaBokstäver = [];
let rättBokstäver = [];
let felBokstäver = [];
const rättGissadeBokstäverSynas = document.querySelector('.ordbox');
const rättGissadBokstäverBoxLista = document.querySelectorAll('.ordbox>article');
const felGissadeBokstäverSynas = document.querySelector('.anvanda-bokstaver');
const poängräknare = document.querySelector('#poangraknare');
const hangmanBackground = document.querySelector('.hangman');






//SVG-BILD-DELAR
const ground = document.getElementById('ground');
const head = document.getElementById('head');
const hangmanBody = document.getElementById('body');
const arms = document.getElementById('arms'); 
const legs = document.getElementById('legs');
const scaffold = document.getElementById('scaffold');
const svgHelaBilden = document.querySelectorAll('.svg-hela>.barn');
const svgBakgrund = document.querySelector('.svg-hela');

//COUNTDOWN TIMER
const visaCountdownKnapp = document.querySelector('#visa-countdown');
const nedräkning = document.querySelector('.nedräkning');
const nedräkningsKnappar = document.querySelector('.nedräknings-knappar')
const femMinKnapp = document.querySelector('#fem-min');
const treMinKnapp = document.querySelector('#tre-min');
const minutesDisplay = document.querySelector('.minutes-display');
const secondsDisplay = document.querySelector('.seconds-display');

let rättGissatOrd;

//POÄNG-RÄKNARE OCH OMGÅNGS-RÄKNARE BÖRJAR FRÅN 0
poängräknareCount=0;
antalspelOmgångar=0;


//RÄKNAR ANTAL FEL-GISSNINGAR
let antalFel=0;

 getAllIndexes = (ordetsBokstäver, bokstav) => {
    let indexes = [], i;
    for (i=0; i < ordetsBokstäver.length; i++) 
        if (ordetsBokstäver[i]==bokstav)
            indexes.push(i);
            return indexes;
}
        
 //TAR BORT HÄNGA-GUBBE-SVG:N
taBortSvg = () => {
    setTimeout (() => {
        for (del of svgHelaBilden) {
           if (del.classList.contains('synlig')) {
               del.classList.remove('synlig')
           }  
       }; 
    }, 2000);
}
       
//NOLLSTÄLLNINGSFUNKTION, NOLLSTÄLLER SPELPLAN EFTER VUNNEN/FÖRLORAD OMGÅNG
nollställOmgång = () => {
    //NOLLSTÄLL BOKSTAVS-ARRAYS OCH LINJE-ARRAY
    ordetsBokstäver=[];
    valdaBokstäver = [];
    rättBokstäver = [];
    felBokstäver = [];
  
    linjer= [];
    linjer.push('__','__','__','__','__')

    //EFTER 1 SEKUND NOLLSTÄLLS BOKSTÄVER TILL LINJER IGEN
    setTimeout (() => rättGissadeBokstäverSynas.innerHTML = linjer.join(' '), 1000);
    //TAR BORT KLICKAD-CLASS SÅ ATT DET GÅR ATT KLICKA PÅ BOKSTÄVERNA I NÄSTA SPELOMGÅNG
    for (bokstav of alfabete) {
        bokstav.classList.remove('klickad');
    }
    //TAR BORT GAME-OVER-CLASS PÅ SVG:N (BAKGRUNDSFÄRG OCH GAME-OVER-TEXT)
    setTimeout (() => hangmanBackground.classList.remove('game-over'), 5000);
    setTimeout (() => rättGissadeBokstäverSynas.classList.remove('game-over-top'), 5000);
    setTimeout(() => main.style.backgroundColor='var(--main_color)', (500));
      //TA BORT COUNTDOWN-SIFFROR
    setTimeout(() => {
        secondsDisplay.style.opacity='0';
        minutesDisplay.style.opacity='0';
    }, 500);
    //TAR BORT SJÄLVA SVG-BILDEN
    taBortSvg();
    for (bokstav of alfabete) {
        bokstav.innerText=' ';
    }

};

displayRättBokstäver = (bokstav) => {
    rättGissadeBokstäverSynas.innerHTML = linjer;               // console.log(`Rätt bokstäver är: ${ordetsBokstäver}, rätt gissade bokstäver är: ${rättBokstäver}`);
    let korrektaIndex = getAllIndexes(ordetsBokstäver, bokstav);        // console.log(`Index av rätt gissad bokstav ${bokstav.toUpperCase()} i detta varv är är ${korrektaIndex}, det är alltså DETTA/DESSA INDEX vi vill byta ut mot ${bokstav.toUpperCase()}.`);

    //SPLICE PÅ FÖRSTA AV VARJE BOKSTAV + TAR BORT DE FULA KOMMATECKNEN
    linjer.splice(korrektaIndex[0], 1, bokstav).join(' ');
    //OM FLER AV SAMMA BOKSTÄVER, SPLICE PÅ ANDRA + TAR BORT DE FULA KOMMATECKNEN
    if (korrektaIndex[1]) {
        linjer.splice(korrektaIndex[1], 1, bokstav).join(' ');
    }
    //TAR BORT DE FULA KOMMATECKNEN MELLAN BOKSTÄVERNA
    rättGissadeBokstäverSynas.innerHTML = linjer.join(' ');             
    //KOLLA OM DET SAKNAS BOKSTÄVER ELLER OM ALLA BOKSTÄVER ÄR PÅ PLATS => VUNNIT
    if (linjer.includes('__')) { 
        rättGissatOrd=false;                      
    } else {            
        rättGissatOrd=true;                                
        poängräknareCount++;
        antalspelOmgångar++;    
        poängräknare.innerHTML=`Poäng: ${poängräknareCount} / ${antalspelOmgångar}`
        //ANAMERING- TAR BORT BOKSTÄVER EFTER ATT SPELAREN VUNNIT    
        animering();  
        //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
        nollställOmgång();
    }
}

//SLUTANIMERING EFTER RÄTT GISSAT ORD
animering = () => {
     anime({
        targets: '.alfabetet>button',
        scale: [
          {value: .0, easing: 'easeOutSine', duration: 400},
          {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [6, 5], from: 'center'})
      });  
}


displayFelBokstäver = () => {
    //FÖR VARJE FEL BOKSTAV BLIR EN DEL AV SVG:N SYNLIG
    for (bokstav of felBokstäver) {
        svgHelaBilden.forEach((del, index) => {
            if (index == felBokstäver.indexOf(bokstav)){          
                del.classList.add('synlig')   
                //hangmanBackground.style.backgroundColor='rgba(147, 75, 107, 0.'+antalFel*1+')';
                main.style.backgroundColor='rgba(147, 75, 107, 0.'+antalFel+1+')';
                main.style.backgroundColor='rgba(107, 94, 165, 0.'+antalFel+2+')';
                main.style.backgroundColor='rgba(112, 56, 130, 0.'+antalFel+1+')'; 
           /*      body.style.backgroundColor='rgba(147, 75, 107, 0.'+antalFel+1+')';
                body.style.backgroundColor='rgba(107, 94, 165, 0.'+antalFel+2+')';
                body.style.backgroundColor='rgba(112, 56, 130, 0.'+antalFel+1+')'; */
                antalFel=index;                   
            } 

            
        })                                                      
    //OM ANTAL FEL ÄR 5 SÅ ÄR HELA SVG:N SYNLIG OCH GUBBEN ÄR HÄNGD => GAME OVER 
        if(antalFel==5) {
            //UPPDATERAR RÄKNAREN FÖR ANTAL SPELOMGÅNGAR
            antalspelOmgångar++;    
            poängräknare.innerHTML=`Poäng: ${poängräknareCount} / ${antalspelOmgångar}`
            //ÄNDRAR BAKGRUNDSFÄRG OCH LÄGGER TILL TEXTEN "GAME OVER!" NÄR GUBBEN ÄR HÄNGD
           setTimeout(() => {
            hangmanBackground.classList.add('game-over')
            rättGissadeBokstäverSynas.classList.add('game-over-top')
           }, 2000);

            //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
            nollställOmgång();
            animering();
        }
    }
    
}

alfabeteBokstäver = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä','Ö']

//STARTAR NY SPELOMGÅNG 
 let startaNyOmgång = () => {
    alfabete.forEach((bokstav, index)=> {
        bokstav.innerText=alfabeteBokstäver[index];
    }); 

    rättGissatOrd=false;
     //TA BORT COUNTDOWN-SIFFROR
    secondsDisplay.innerHTML='';
    minutesDisplay.innerHTML=''; 
    secondsDisplay.style.opacity='1';
    minutesDisplay.style.opacity='1';
    //TAR BORT STARTAD-CLASSEN FÖR ATT GÖRA SÅ ATT COUNTDOWN SÄTTER IGÅNG NÄSTA GÅNG MAN KLICKAR PÅ EN BOKSTAV
    nedräkning.classList.remove('startad')

    //NOLLSTÄLLER ANTALFEL EFTER EV FÖREGÅENDE SPELOMGÅNG 
    antalFel=0;
    //SLUMPAR FRAM ETT ORD I ORD-LISTAN
    slumpaOrd = Math.floor(Math.random()*80);
    console.log(Math.floor(Math.random()*80))
    let nyttOrd=ord[slumpaOrd];                             console.log(nyttOrd);
    //DELAR UPP ORDET I BOKSTÄVER                                 
    nyttOrd=nyttOrd.toLowerCase().split('');  
    //PUSHAR VARJE BOKSTAV TILL ORDETSBOKSTÄVER-LISTAN       
    ordetsBokstäver=nyttOrd.map(bokstav=>bokstav);    
}

//FUNKTIONEN SOM GÖR OM DEN KNAPP/BOKSTAV SOM KLICKATS PÅ TILL LITEN BOKSTAV, SEDAN LOOPAR IGENOM ORDETS-BOKSTÄVER-LISTAN
// VARJE BOKSTAV I LISTAN JÄMFÖRS MED DEN VALDA BOKSTAVEN, OM DE MATCHAR LÄGGS BOKSTAVEN TILL I RÄTTBOKSTÄVER-LISTAN
//OM DE INTE MATCHAR LÄGGS BOKSTAVEN I FELBOKSTÄVER-LISTAN
let valdBokstav = (event) => {
    let bokstav = event.target.innerText.toLowerCase();
    event.target.classList.add('klickad');            
    let bokstavsmätare=0;                               
    rättBokstäver=ordetsBokstäver.filter((ordetsBokstav)=>ordetsBokstav==bokstav)  
    
//KOLLAR OM DEN VALDA BOKSTAVEN FINNS I RÄTTBOKSTÄVER-LISTAN, OM DEN FINNS BLIR BOKSTAVSMÄTAREN 1, ANNARS ÄR DEN 0
    for (rättBokstav of rättBokstäver) {
        if(rättBokstav==bokstav){
            bokstavsmätare++;                            
            displayRättBokstäver(rättBokstav);
        }
    }

//OM BOKSTAVSMÄTAREN ÄR 0 PUSHAS VALDA BOKSTAVEN TILL FELBOKSTÄVER-LISTAN
    if(bokstavsmätare==0) {
        felBokstäver.push(bokstav)
    }
    displayFelBokstäver();
}

//STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD UR ORD-LISTAN
startKnapp.addEventListener('click', startaNyOmgång);

//LÄGGER TILL EVENTLISTENER PÅ VARJE KNAPP (VARJE BOKSTAV I ALFABETET)
//VID KLICK STARTAR FUNKTIONEN "VALDBOKSTAV"
for (bokstav of alfabete) {
    bokstav.addEventListener('click', valdBokstav);
    if (!bokstav.classList.contains('klickad')){
        bokstav.addEventListener('click', (e)=>{
            nedräkning.classList.add('synlig');
            
            if (!nedräkning.classList.contains('startad')&&poängräknareCount<5) {
                countDown(3);
                console.log('3min');
            } else if (!nedräkning.classList.contains('startad')&&poängräknareCount>=5) {
                countDown(2);
                console.log('3min');
            }
            nedräkning.classList.add('startad');
    
        })
    } else {
        console.log('klickad')
    }
}

//COUNTDOWN TIMER
function countDown(minuter){ 
    //MINUTER OMVANDLADE TILL SEKUNDER
    let totalStartTid=minuter*60;
    
    //FORMATERING AV HUR TIDEN VISAS INNAN NEDRÄKNINGEN BÖRJAR
    minutesDisplay.innerHTML = '0' + Math.floor(totalStartTid/60);
    secondsDisplay.innerHTML= '0' + Math.floor(totalStartTid)%60;
    
    //STÄLLER IN NEDRÄKNINGEN: RÄKNAR NER FRÅN TOTALSTARTTID, 1 SEKUND I TAGET
    let interval= setInterval(() => {    
        countDown.runnning=true;
        //CURRENT TIME-NEDRÄKNING
        let currentTime=totalStartTid--;

        //OM GISSAT RÄTT ORD 
        rättGissatOrd ? clearInterval(interval) : console.log(rättGissatOrd);
        //OM GUBBEN ÄR HÄNGD-STOPPAR NEDRÄKNING
        if (antalFel==5){
            clearInterval(interval);
        } 

        //ÄNDRAR FÄRGEN PÅ SIFFRORNA BEROENDE PÅ HUR LÅNG TID SOM ÄR KVAR
        färgNedräkning(currentTime, minuter);
        //Hur många hela minuter kvar:                   
        minutesDisplay.innerHTML = '0' + Math.floor(totalStartTid/60)%60;
        //Hur många sekunder kvar utöver hela minuter:
        secondsDisplay.innerHTML=Math.floor(totalStartTid)%60;
        if(secondsDisplay.innerHTML<10){
            secondsDisplay.innerHTML="0"+secondsDisplay.innerHTML
        }
            //NÄR TIDEN ÄR UTE
            tidenUte(currentTime, interval);
    },1000) 
    
    
} 

//NÄR TIDEN ÄR UTE
tidenUte = (currentTime, interval) => {
if (currentTime<1) {
    clearInterval(interval);
    nedräkning.innerHTML='<h2>Time\'s up!</h2>';

     //UPPDATERAR RÄKNAREN FÖR ANTAL SPELOMGÅNGAR
     antalspelOmgångar++;    
     poängräknare.innerHTML=`Poäng: ${poängräknareCount} / ${antalspelOmgångar}`
     //ÄNDRAR BAKGRUNDSFÄRG OCH LÄGGER TILL TEXTEN "GAME OVER!" NÄR GUBBEN ÄR HÄNGD
     hangmanBackground.classList.add('game-over')
     rättGissadeBokstäverSynas.classList.add('game-over-top')
     //ANAMERING- TAR BORT BOKSTÄVER EFTER ATT SPELAREN VUNNIT    
     animering();  
     //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
     nollställOmgång();
    }
}

//ÄNDRAR FÄRG PÅ SIFFRORNA 
färgNedräkning = (currentTime, minuter) => {
    if (currentTime > (minuter*60) * 0.75) {
        nedräkning.style.color = '#3D943F';
    } else if (currentTime > (minuter*60) * 0.5) {
        nedräkning.style.color = '#acac02';
    } else if (currentTime > (minuter*60) * 0.25) {
        nedräkning.style.color = 'orange';
    } else {
        nedräkning.style.color = 'rgb(141, 9, 9)';
    }    
}
// Reset på sidan
let reset = () => {
    location.reload();
}
resetKnapp.addEventListener('click', reset);