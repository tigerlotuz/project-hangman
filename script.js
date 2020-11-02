const ord = ['bacon', 'chans', 'dator', 'fasad', 'glass', 'hemsk', 'jycke', 'kavel', 'lilja', 'melon']
const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp');
const alfabete = document.querySelectorAll('.alfabetet>button')
const ordetsBokstäver= [];
const valdaBokstäver = [];
const rättBokstäver = [];
const felBokstäver = [];
console.log(alfabete)

let startaNyOmgång = () => {
    slumpaOrd = Math.floor(Math.random()*10)
    let nyttOrd=ord[slumpaOrd];
    console.log(nyttOrd)
    nyttOrd=nyttOrd.toLowerCase().split('');
    console.log(nyttOrd)
    nyttOrd.forEach((bokstav, index) => {
        ordetsBokstäver.push(bokstav)
       // console.log(bokstav, index)
    })
}

let valdBokstav = (event)=> {
    let bokstav = event.target.innerText.toLowerCase()
    console.log('Vald bokstav är: ', bokstav)
    ordetsBokstäver.forEach((ordetsBokstav) => {
        if(ordetsBokstav==bokstav) {
            console.log('ja')
            rättBokstäver.push(bokstav)
        } else {
            console.log('nej')
            felBokstäver.push(bokstav)
        }
    })
    console.log(rättBokstäver)
    console.log(felBokstäver)
}



startaNyOmgångKnapp.addEventListener('click', startaNyOmgång);

alfabete.forEach((bokstav) => {
    bokstav.addEventListener('click', valdBokstav);
})