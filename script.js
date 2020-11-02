const ord = ['Persika', 'Hus', 'Gammal', 'Sol', 'Kyckling', 'Pelikan', 'Rum', 'Kaka', 'Nallebjörn', 'Kvadrat']
const startaNyOmgångKnapp = document.querySelector('#starta-ny-omgång-knapp');

let startaNyOmgång = () => {
    slumpaOrd = Math.floor(Math.random()*10)
    let nyttOrd=ord[slumpaOrd]
    console.log(nyttOrd)
}
startaNyOmgångKnapp.addEventListener('click', startaNyOmgång);
