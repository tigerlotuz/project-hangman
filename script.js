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

const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp');
const alfabete = document.querySelectorAll('.alfabetet>button');
const alfabetetSection = document.querySelector('.alfabetet');
const ordetsBokstäver= [];
const valdaBokstäver = [];
const rättBokstäver = [];
const felBokstäver = [];
const rättGissadeBokstäverSynas = document.querySelector('.ratt-gissade-bokstaver');
const rättGissadBokstäverBoxLista = document.querySelectorAll('.ratt-gissade-bokstaver>article');
const felGissadeBokstäverSynas = document.querySelector('.anvanda-bokstaver');

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

/*   
let slutAnimation= anime({
    targets: '.staggering-grid-demo .el',
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},
      {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    delay: anime.stagger(200, {grid: [6, 5], from: 'center'})
  }); */


function displayRättBokstäver(bokstav) {
    rättGissadeBokstäverSynas.innerHTML = linjer;
    console.log(`Rätt bokstäver är: ${ordetsBokstäver}, rätt gissade bokstäver är: ${rättBokstäver}`);
    let korrektaIndex = getAllIndexes(ordetsBokstäver, bokstav);
    console.log(`Index av rätt gissad bokstav ${bokstav.toUpperCase()} i detta varv är är ${korrektaIndex}, det är alltså DETTA/DESSA INDEX vi vill byta ut mot ${bokstav.toUpperCase()}.`);

    //SPLICE PÅ FÖRSTA AV VARJE BOKSTAV
    linjer.splice(korrektaIndex[0], 1, bokstav);
    //OM FLER AV SAMMA BOKSTÄVER, SPLICE PÅ ANDRA
    if (korrektaIndex[1]) {
        linjer.splice(korrektaIndex[1], 1, bokstav);
    }
    //TAR BORT DE FULA KOMMATECKNEN MELLAN BOKSTÄVERNA
    rättGissadeBokstäverSynas.innerHTML = linjer.join(' ');
    console.log(linjer);

    //KOLLA OM DET SAKNAS BOKSTÄVER ELLER OM ALLA BOKSTÄVER ÄR PÅ PLATS => VUNNIT
    if (linjer.includes('__')) {
        console.log('_fortsätt_');
    } else {
        console.log('färdig');
        
    //ANAMERING- TAR BORT BOKSTÄVER EFTER ATT SPELAREN VUNNIT    
      animering();
    }
}

 animering= ()=> {
     anime({
        targets: '.alfabetet>button',
        scale: [
          {value: .0, easing: 'easeOutSine', duration: 400},
        ],
        delay: anime.stagger(200, {grid: [6, 5], from: 'center'})
      });    
      setTimeout(() => {
        alfabetetSection.innerHTML='<h1>Du vann!</h1>'
      }, 2000);
}


let displayFelBokstäver = () => {
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
        sorteradeBokstäver.push(bokstav)
    })
}

let sorteradeBokstäver= [];



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
    event.target.removeEventListener('click', valdBokstav)
}


//STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD UR ORD-LISTAN
startaNyOmgångKnapp.addEventListener('click', startaNyOmgång);

//LÄGGER TILL EVENTLISTENER PÅ VARJE KNAPP (VARJE BOKSTAV I ALFABETET)
//VID KLICK STARTAR FUNKTIONEN "VALDBOKSTAV"
alfabete.forEach((bokstav) => {
    bokstav.addEventListener('click', valdBokstav);
})







  //  kollaDubbletter();
/*  //KOLLAR IGENOM BOKSTÄVERNA I ORDET OCH RÄKNAR IFALL DET FINNS FLER ÄN 1, OM FLER ÄN 1: BOKSTAVSRÄKAREN == 1
let kollaDubbletter=()=> {
    sorteradeBokstäver.sort();
    console.log(sorteradeBokstäver)
  //  console.log(nyaSorteradeBokstäver.sort((a,b)=>a-b))
    let bokstavsRäknare= 0;
   sorteradeBokstäver.forEach((bokstav, index) => {
    if(bokstav==sorteradeBokstäver[index+1]) {
        bokstavsRäknare++;    
    }
    console.log(bokstavsRäknare)
   })
   return bokstavsRäknare;
}  */