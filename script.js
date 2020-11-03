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
    '_',
    '_',
    '_',
    '_',
    '_'
]

//linjer=linjer.join(' ')

const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp');
const alfabete = document.querySelectorAll('.alfabetet>button');
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




let displayRättBokstäver = (bokstav) => {
    rättGissadeBokstäverSynas.innerHTML = linjer;
    console.log(`Rätt bokstäver är: ${ordetsBokstäver}, rätt gissade bokstäver är: ${rättBokstäver}`)
    let korrektaIndex=getAllIndexes(ordetsBokstäver, bokstav)
    console.log(`Index av rätt gissad bokstav ${bokstav.toUpperCase()} i detta varv är är ${korrektaIndex}, det är alltså DETTA/DESSA INDEX vi vill byta ut mot ${bokstav.toUpperCase()}.`)
    linjer.splice(korrektaIndex, 1, bokstav)
    rättGissadeBokstäverSynas.innerHTML=linjer;
    console.log(linjer)
    /*  rättBokstäver.forEach((bokstav) => {
         let bokstavsIndex=ordetsBokstäver.indexOf(bokstav)
        console.log( bokstav, ordetsBokstäver.indexOf(bokstav))
        console.log(rättGissadBokstäverBoxLista[bokstavsIndex])
        rättGissadBokstäverBoxLista[bokstavsIndex].innerHTML=`${bokstav}`; 
        
       
    })  */

 /* 

    function getAllIndexes(arr, val) {
        var indexes = [], i;
        for(i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i);
        return indexes;
    } */
}
let displayFelBokstäver = () => {
    felBokstäver.forEach((bokstav, index) => {
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
    }
    )
  //  kollaDubbletter();

}


//KOLLAR IGENOM BOKSTÄVERNA I ORDET OCH RÄKNAR IFALL DET FINNS FLER ÄN 1, OM FLER ÄN 1: BOKSTAVSRÄKAREN == 1
let kollaDubbletter=()=> {
   let sorteradeBokstäver = ordetsBokstäver.sort();
    console.log(sorteradeBokstäver)
    let bokstavsRäknare= 0;
   sorteradeBokstäver.forEach((bokstav, index) => {
    if(bokstav==sorteradeBokstäver[index+1]) {
        bokstavsRäknare++;
            console.log(bokstavsRäknare)
    }
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
  /*   console.log(`Rätt bokstäver: ${rättBokstäver}`)
    console.log(`Fel bokstäver: ${felBokstäver}`) */
    
    displayFelBokstäver();
}


//STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD UR ORD-LISTAN
startaNyOmgångKnapp.addEventListener('click', startaNyOmgång);

//LÄGGER TILL EVENTLISTENER PÅ VARJE KNAPP (VARJE BOKSTAV I ALFABETET)
//VID KLICK STARTAR FUNKTIONEN "VALDBOKSTAV"
alfabete.forEach((bokstav) => {
    bokstav.addEventListener('click', valdBokstav);
})











/**
 * 
 * // Orden som datorn kan välja 
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


const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp');
const alfabete = document.querySelectorAll('.alfabetet>button');
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



let displayRättBokstäver = () => {
    console.log(rättBokstäver)

     rättBokstäver.forEach((bokstav) => {
        let bokstavsIndex=ordetsBokstäver.indexOf(bokstav)
        console.log( bokstav, ordetsBokstäver.indexOf(bokstav))
        console.log(rättGissadBokstäverBoxLista[bokstavsIndex])
        rättGissadBokstäverBoxLista[bokstavsIndex].innerHTML=`${bokstav}`;
    }) 
}
let displayFelBokstäver = () => {
    felBokstäver.forEach((bokstav, index) => {
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
    }
    )
  //  kollaDubbletter();

}


//KOLLAR IGENOM BOKSTÄVERNA I ORDET OCH RÄKNAR IFALL DET FINNS FLER ÄN 1, OM FLER ÄN 1: BOKSTAVSRÄKAREN == 1
let kollaDubbletter=()=> {
   let sorteradeBokstäver = ordetsBokstäver.sort();
    console.log(sorteradeBokstäver)
    let bokstavsRäknare= 0;
   sorteradeBokstäver.forEach((bokstav, index) => {
    if(bokstav==sorteradeBokstäver[index+1]) {
        bokstavsRäknare++;
            console.log(bokstavsRäknare)
    }
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
        }
    });
//OM BOKSTAVSMÄTAREN ÄR 0 PUSHAS VALDA BOKSTAVEN TILL FELBOKSTÄVER-LISTAN
    if(bokstavsmätare==0) {
        felBokstäver.push(bokstav)
    }
  /*   console.log(`Rätt bokstäver: ${rättBokstäver}`)
    console.log(`Fel bokstäver: ${felBokstäver}`) */
  //  displayRättBokstäver();
  //  displayFelBokstäver();
//}


//STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD UR ORD-LISTAN
//startaNyOmgångKnapp.addEventListener('click', startaNyOmgång);

//LÄGGER TILL EVENTLISTENER PÅ VARJE KNAPP (VARJE BOKSTAV I ALFABETET)
//VID KLICK STARTAR FUNKTIONEN "VALDBOKSTAV"
//alfabete.forEach((bokstav) => {
//    bokstav.addEventListener('click', valdBokstav);
//})






 
