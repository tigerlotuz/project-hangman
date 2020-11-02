const ord = [
    {ord: 'bacon', bokstäver: 'b' + 'a' + 'c' + 'o' + 'n'}, 
    {ord: 'chans', bokstäver: 'c' + 'h' + 'a' + 'n' + 's'}, 
    {ord: 'dator', bokstäver: 'd' + 'a' + 't' + 'o' + 'r'}, 
    {ord: 'fasad', bokstäver: 'f' + 'a' + 's' + 'a' + 'd'}, 
    {ord: 'glass', bokstäver: 'g' + 'l' + 'a' + 's' + 's'}, 
    {ord: 'hemsk', bokstäver: 'h' + 'e' + 'm' + 's' + 'k'}, 
    {ord: 'jycke', bokstäver: 'j' + 'y' + 'c' + 'k' + 'e'}, 
    {ord: 'kavel', bokstäver: 'k' + 'a' + 'v' + 'e' + 'l'}, 
    {ord: 'lilja', bokstäver: 'l' + 'i' + 'l' + 'j' + 'a'}, 
    {ord: 'melon', bokstäver: 'm' + 'e' + 'l' + 'o' + 'n'} 
];
const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp');
const alfabete = document.querySelectorAll('.alfabetet>button');
const ordetsBokstäver= [];
const valdaBokstäver = [];
const rättBokstäver = [];
const felBokstäver = [];



//FUNKTIONEN SOM STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD I ORD-LISTAN OCH SEDAN DELA UPP ORDET I BOKSTÄVER
//SEDAN PUSHAS VARJE BOKSTAV TILL ORDETSBOKSTÄVER-LISTAN 
let startaNyOmgång = () => {
    slumpaOrd = Math.floor(Math.random()*10);
    let nyttOrd=ord[slumpaOrd];
    console.log(nyttOrd);
    nyttOrd=nyttOrd.toLowerCase().split('');
    console.log(nyttOrd);
    nyttOrd.forEach((bokstav, index) => {
        ordetsBokstäver.push(bokstav);
       // console.log(bokstav, index)
    })
}

//FUNKTIONEN SOM GÖR OM DEN KNAPP/BOKSTAV SOM KLICKATS PÅ TILL LITEN BOKSTAV, SEDAN LOOPAR IGENOM ORDETS-BOKSTÄVER-LISTAN
// VARJE BOKSTAV I LISTAN JÄMFÖRS MED DEN VALDA BOKSTAVEN, OM DE MATCHAR LÄGGS BOKSTAVEN TILL I RÄTTBOKSTÄVER-LISTAN
//OM DE INTE MATCHAR LÄGGS BOKSTAVEN I FELBOKSTÄVER-LISTAN
let valdBokstav = (event)=> {
    let bokstav = event.target.innerText.toLowerCase()
    console.log('Vald bokstav är: ', bokstav)
     ordetsBokstäver.forEach((ordetsBokstav) => {
        if(ordetsBokstav==bokstav) {
            console.log('ja')
            rättBokstäver.forEach((rättBokstav))
            rättBokstäver.push(bokstav)
        } else {
            console.log('nej')
            felBokstäver.push(bokstav)
        }
    }) 
}

//STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD UR ORD-LISTAN
startaNyOmgångKnapp.addEventListener('click', startaNyOmgång);

//LÄGGER TILL EVENTLISTENER PÅ VARJE KNAPP (VARJE BOKSTAV I ALFABETET)
//VID KLICK STARTAR FUNKTIONEN "VALDBOKSTAV"
alfabete.forEach((bokstav) => {
    bokstav.addEventListener('click', valdBokstav);
    console.log(rättBokstäver)
    console.log(felBokstäver)
})