

// Orden som datorn kan välja 
let ord = [
    'bacon',
    'chans',
    'dator',
    'fasad',
    'glass',
    'hemsk',
    'jycke',
    'kavel',
    'lilja',
    'melon'
];

let linjer = [
    '__',
    '__',
    '__',
    '__',
    '__'
]
/* Jquery function till knappen starta */
$(document).ready(function(){
/* när knappen klickas på så startar funktionen */
    $(".button1").click(function(){
        /* visar eller döljer ".dold_text1" */
         $(".dold_text1").toggle("fast");
    });
});

const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp');
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

//SVG-BILD-DELAR
const ground = document.getElementById('ground');
const head = document.getElementById('head');
const body = document.getElementById('body');
const arms = document.getElementById('arms'); 
const legs = document.getElementById('legs');
const scaffold = document.getElementById('scaffold');
const svgHelaBilden = document.querySelectorAll('.svg-hela>.barn');


function getAllIndexes(ordetsBokstäver, bokstav) {
    let indexes = [], i;
    for (i=0; i <ordetsBokstäver.length; i++) 
        if (ordetsBokstäver[i]==bokstav)
            indexes.push(i);
            console.log(indexes)
            return indexes
}

//POÄNG-RÄKNARE OCH OMGÅNGS-RÄKNARE BÖRJAR FRÅN 0
poängräknareCount=0;
antalspelOmgångar=0;


        
 //TAR BORT HÄNGA-GUBBE-SVG:N
 let taBortSvg = () => {
    setTimeout(() => {
       svgHelaBilden.forEach((del) => {
           if (del.classList.contains('synlig')){
               del.classList.remove('synlig')
           }  
       }); 
    }, 2000);
    }
       


//NOLLSTÄLLNINGSFUNKTION, NOLLSTÄLLER SPELPLAN EFTER VUNNEN/FÖRLORAD OMGÅNG

let nollställOmgång = () => {
    //NOLLSTÄLL BOKSTAVS-ARRAYS OCH LINJE-ARRAY
    ordetsBokstäver=[];
    valdaBokstäver = [];
    rättBokstäver = [];
    felBokstäver = [];
    linjer = [
        '__',
        '__',
        '__',
        '__',
        '__'
    ];
    //EFTER 1 SEKUND NOLLSTÄLLS BOKSTÄVER TILL LINJER IGEN
    setTimeout(() => {
    rättGissadeBokstäverSynas.innerHTML = linjer.join(' ');
    }, 1000);
    //TAR BORT KLICKAD-CLASS SÅ ATT DET GÅR ATT KLICKA PÅ BOKSTÄVERNA I NÄSTA SPELOMGÅNG
    alfabete.forEach((bokstav) => {
        bokstav.classList.remove('klickad');
    })
    //TAR BORT GAME-OVER-CLASS PÅ SVG:N (BAKGRUNDSFÄRG OCH GAME-OVER-TEXT)
    setTimeout(() => {
        felGissadeBokstäverSynas.classList.remove('game-over');
    }, 2500);
    //TAR BORT SJÄLVA SVG-BILDEN
    taBortSvg();
};



function displayRättBokstäver(bokstav) {
    rättGissadeBokstäverSynas.innerHTML = linjer;
    console.log(`Rätt bokstäver är: ${ordetsBokstäver}, rätt gissade bokstäver är: ${rättBokstäver}`);
    let korrektaIndex = getAllIndexes(ordetsBokstäver, bokstav);
    console.log(`Index av rätt gissad bokstav ${bokstav.toUpperCase()} i detta varv är är ${korrektaIndex}, det är alltså DETTA/DESSA INDEX vi vill byta ut mot ${bokstav.toUpperCase()}.`);

    //SPLICE PÅ FÖRSTA AV VARJE BOKSTAV + TAR BORT DE FULA KOMMATECKNEN
    linjer.splice(korrektaIndex[0], 1, bokstav).join(' ');
    //OM FLER AV SAMMA BOKSTÄVER, SPLICE PÅ ANDRA + TAR BORT DE FULA KOMMATECKNEN
    if (korrektaIndex[1]) {
        linjer.splice(korrektaIndex[1], 1, bokstav).join(' ');
    }
    //TAR BORT DE FULA KOMMATECKNEN MELLAN BOKSTÄVERNA
    rättGissadeBokstäverSynas.innerHTML = linjer.join(' ');
    console.log(linjer);

    //KOLLA OM DET SAKNAS BOKSTÄVER ELLER OM ALLA BOKSTÄVER ÄR PÅ PLATS => VUNNIT
    if (linjer.includes('__')) {
        console.log('_fortsätt_');
    } else {
        console.log('färdig');
        poängräknareCount++;
        antalspelOmgångar++;    
        poängräknare.innerHTML=`Poäng: ${poängräknareCount} / ${antalspelOmgångar}`
        //ANAMERING- TAR BORT BOKSTÄVER EFTER ATT SPELAREN VUNNIT    
        animering()  
        //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
        nollställOmgång()
        //VISAR RÄTT BOKSTÄVER I HTML:EN OCH TAR BORT KOMMATECKNEN MELLAN VARJE BOKSTAV
        rättGissadeBokstäverSynas.innerHTML = linjer.join(' ');
    }
}


//SLUTANIMERING EFTER RÄTT GISSAT ORD
 animering = ()=> {
     anime({
        targets: '.alfabetet>button',
        scale: [
          {value: .0, easing: 'easeOutSine', duration: 400},
          {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [6, 5], from: 'center'})
      });  
}


let displayFelBokstäver = () => {
    //RÄKNAR ANTAL FEL
    let antalFel=0;
    //FÖR VARJE FEL BOKSTAV BLIR EN DEL AV SVG:N SYNLIG
    felBokstäver.forEach((bokstav) => {
        svgHelaBilden.forEach((del, index) => {
            if (index == felBokstäver.indexOf(bokstav)){
                console.log('yes', index)
                del.classList.add('synlig')
                console.log(del.classList)
            } else {
                console.log('no', index);
            }
        })
    //FÖR VARJE FEL BOKSTAV RÄKNAS ANTALET FEL UPP
        svgHelaBilden.forEach((part, index)=>{
                if (part.classList.contains('synlig'))
                    antalFel=index;
                    console.log(antalFel)
        })
        console.log(`Antal fel: ${antalFel}`)

    //OM ANTAL FEL ÄR 5 SÅ ÄR HELA SVG:N SYNLIG OCH GUBBEN ÄR HÄNGD => GAME OVER 
        if(antalFel==5) {
            //UPPDATERAR RÄKNAREN FÖR ANTAL SPELOMGÅNGAR
            antalspelOmgångar++;    
            poängräknare.innerHTML=`Poäng: ${poängräknareCount} / ${antalspelOmgångar}`
            //ÄNDRAR BAKGRUNDSFÄRG OCH LÄGGER TILL TEXTEN "GAME OVER!" NÄR GUBBEN ÄR HÄNGD
            felGissadeBokstäverSynas.classList.add('game-over')
            //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
            nollställOmgång();
            animering();
            
        }
    })   
}

//FUNKTIONEN SOM STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD I ORD-LISTAN OCH SEDAN DELA UPP ORDET I BOKSTÄVER
//SEDAN PUSHAS VARJE BOKSTAV TILL ORDETSBOKSTÄVER-LISTAN 
let startaNyOmgång = () => {
    slumpaOrd = Math.floor(Math.random()*10);
    let nyttOrd=ord[slumpaOrd];
    console.log(nyttOrd);
    nyttOrd=nyttOrd.toLowerCase().split('');
    console.log(nyttOrd);
    nyttOrd.forEach((bokstav) => {
        ordetsBokstäver.push(bokstav);
    })
}

//FUNKTIONEN SOM GÖR OM DEN KNAPP/BOKSTAV SOM KLICKATS PÅ TILL LITEN BOKSTAV, SEDAN LOOPAR IGENOM ORDETS-BOKSTÄVER-LISTAN
// VARJE BOKSTAV I LISTAN JÄMFÖRS MED DEN VALDA BOKSTAVEN, OM DE MATCHAR LÄGGS BOKSTAVEN TILL I RÄTTBOKSTÄVER-LISTAN
//OM DE INTE MATCHAR LÄGGS BOKSTAVEN I FELBOKSTÄVER-LISTAN
let valdBokstav = (event) => {
    let bokstav = event.target.innerText.toLowerCase();
    event.target.classList.add('klickad');
    console.log(event.target.classList)
    let bokstavsmätare=0;
    console.log('Vald bokstav är: ', bokstav);
     ordetsBokstäver.forEach((ordetsBokstav) => {
        if(ordetsBokstav==bokstav) {
            console.log('ja')
            rättBokstäver.push(bokstav)
            console.log(rättBokstäver)
        } 
    });
//KOLLAR OM DEN VALDA BOKSTAVEN FINNS I RÄTTBOKSTÄVER-LISTAN, OM DEN FINNS BLIR BOKSTAVSMÄTAREN 1, ANNARS ÄR DEN 0
    rättBokstäver.forEach((rättBokstav)=>{
        if(rättBokstav==bokstav){
            bokstavsmätare++;
            console.log(bokstavsmätare, rättBokstav)
            displayRättBokstäver(rättBokstav);
        }
    });

//OM BOKSTAVSMÄTAREN ÄR 0 PUSHAS VALDA BOKSTAVEN TILL FELBOKSTÄVER-LISTAN
    if(bokstavsmätare==0) {
        felBokstäver.push(bokstav)
    }
    displayFelBokstäver();
}


//STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD UR ORD-LISTAN
startaNyOmgångKnapp.addEventListener('click', startaNyOmgång);

//LÄGGER TILL EVENTLISTENER PÅ VARJE KNAPP (VARJE BOKSTAV I ALFABETET)
//VID KLICK STARTAR FUNKTIONEN "VALDBOKSTAV"
alfabete.forEach((bokstav) => {
    bokstav.addEventListener('click', valdBokstav);
})

