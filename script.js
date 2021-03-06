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

// linjer där bokstäverna hamnar
let linjer = [
    '__',
    '__',
    '__',
    '__',
    '__'

];

alfabeteBokstäver = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä','Ö'];


const main = document.querySelector('main');
const resetKnapp = document.querySelector('#reset'); 
const startKnapp = document.querySelector('#start');
const alfabete = document.querySelectorAll('.alfabetet>button');
const alfabetetSektion = document.querySelector('.alfabetet');
const body = document.querySelector('body');
let ordetsBokstäver= [];
let valdaBokstäver = [];
let rättBokstäver = [];
let felBokstäver = [];
let antalLivesArray = [];
let antalLives = document.querySelectorAll('.life');
const rättGissadeBokstäverSynas = document.querySelector('.ordbox');
const poängräknare = document.querySelector('#poangraknare');
const totaltAntalOmgångar = document.querySelector('#antal-omgångar');
const totaltAntalVunnaOmgångar = document.querySelector('#vunna-omgångar');
const hangmanBackground = document.querySelector('.hangman');

//SVG-BILD
const svgHelaBilden = document.querySelectorAll('#svg_hela>.barn');

//COUNTDOWN TIMER

let nedräkning = document.querySelector('.nedräkning');
const minutesDisplay = document.querySelector('.minutes-display');
const secondsDisplay = document.querySelector('.seconds-display');

//NÄR MAN HAR GISSAT RÄTT - ÄNDRAS FRÅN FALSE TILL TRUE 
let rättGissatOrd;

//OM KLARAR MED MER ÄN 50% AV TIDEN KVAR -ÄNDRAS FRÅN FALSE TILL TRUE
let underHalvaTiden;        

//POÄNG-RÄKNARE OCH OMGÅNGS-RÄKNARE BÖRJAR FRÅN 0
let poängräknareCount=0;
let antalspelOmgångar=0;
let antalRättOmgångar=0;

//RÄKNAR ANTAL FEL-GISSNINGAR BÖRJAR FRÅN 0
let antalFel=0;
let antalFailadeOmgångar=0;

//PUSHAR ALLA LIVES TILL ARRAY:EN
for (life of antalLives) {
    antalLivesArray.push(life)
};

//INGEN POINTER PÅ KNAPPARNA NÄR DE INTE ÄR BOKSTÄVER
for (bokstav of alfabete) {
    bokstav.classList.add('oklickbar');
};

//HITTA ALLA INDEX AV RÄTT GISSAD BOKSTAV 
getAllIndexes = (ordetsBokstäver, bokstav) => {
    let indexes = [], i;
    for (i=0; i < ordetsBokstäver.length; i++) 
        if (ordetsBokstäver[i]==bokstav)
            indexes.push(i);
            return indexes;
};
        
 //TAR BORT HÄNGA-GUBBE-SVG:N
taBortSvg = () => {
    setTimeout (() => {
        for (del of svgHelaBilden) {
           if (del.classList.contains('synlig')) {
               del.classList.remove('synlig')
           }  
       }; 
    }, 1500);
};
       
//NOLLSTÄLLNINGSFUNKTION, NOLLSTÄLLER SPELPLAN EFTER VUNNEN/FÖRLORAD OMGÅNG
nollställOmgång = () => {
    //NOLLSTÄLL BOKSTAVS-ARRAYS OCH LINJE-ARRAY
    ordetsBokstäver=[];
    valdaBokstäver = [];
    rättBokstäver = [];
    felBokstäver = [];
    linjer= [];
    linjer.push('__','__','__','__','__');
    //EFTER 1 SEKUND NOLLSTÄLLS BOKSTÄVER TILL LINJER IGEN
    setTimeout (() => rättGissadeBokstäverSynas.innerHTML = linjer.join(' '), 1000);
    //TAR BORT KLICKAD-CLASS SÅ ATT DET GÅR ATT KLICKA PÅ BOKSTÄVERNA I NÄSTA SPELOMGÅNG
    for (bokstav of alfabete) {
        bokstav.classList.remove('klickad');
        bokstav.classList.add('oklickbar');
        bokstav.innerText='';
    };
    //TAR BORT GAME-OVER-CLASS/GAME-WON-CLASS PÅ SVG:N (BAKGRUNDSFÄRG OCH GAME-OVER-TEXT)
    setTimeout (() => hangmanBackground.classList.remove('game-over'), 5000);
    setTimeout (() => hangmanBackground.classList.remove('game-won'), 5000);
    setTimeout (() => rättGissadeBokstäverSynas.classList.remove('game-over-top'), 5000);
    setTimeout (() => rättGissadeBokstäverSynas.classList.remove('game-won-top'), 5000);
    setTimeout(() => main.style.backgroundColor='var(--main_color)', (500));
      //TA BORT COUNTDOWN-SIFFROR
    setTimeout(() => {
        secondsDisplay.style.opacity='0';
        minutesDisplay.style.opacity='0';
    }, 1000);
    //TAR BORT SJÄLVA SVG-BILDEN
    taBortSvg();
};

//TAR BORT FULA KOMMATECKEN UR ARRAYEN OCH INRE HTML:EN OCH HAR MELLANSLAG ISTÄLLET
rättGissadeBokstäverSynas.innerHTML = linjer.join(' ');

//KOLLAR OM DET FINNS FLER LIKADANA BOKSTÄVER I ORDET
displayRättBokstäver = (bokstav) => {
    let korrektaIndex = getAllIndexes(ordetsBokstäver, bokstav);      

    //SPLICE PÅ FÖRSTA AV VARJE BOKSTAV + TAR BORT DE FULA KOMMATECKNEN
    linjer.splice(korrektaIndex[0], 1, bokstav).join(' ');

    //OM FLER AV SAMMA BOKSTÄVER, SPLICE PÅ DERAS INDEX + TAR BORT DE FULA KOMMATECKNEN
    if (korrektaIndex[1]) {
        linjer.splice(korrektaIndex[1], 1, bokstav).join(' ');
    }
    if (korrektaIndex[2]) {
        linjer.splice(korrektaIndex[2], 1, bokstav).join(' ');
    }

    //TAR BORT DE FULA KOMMATECKNEN MELLAN BOKSTÄVERNA
    rättGissadeBokstäverSynas.innerHTML = linjer.join(' '); 

    //KOLLA OM DET SAKNAS BOKSTÄVER ELLER OM ALLA BOKSTÄVER ÄR PÅ PLATS => VUNNIT
    let sorteradOrdetsBokstäver = [];
    let sorteradeValdaBokstäver = [];
    ordetsBokstäver.map(bokstav => sorteradOrdetsBokstäver.push(bokstav));
    valdaBokstäver.map(bokstav => sorteradeValdaBokstäver.push(bokstav));
    sorteradOrdetsBokstäver.sort()
    sorteradeValdaBokstäver.sort()


    //KOLLAR OM SAMMA BOKSTÄVER FINNS PÅ SAMMA INDEX I BÅDE SORTERADORDETSBOKSTÄVER OCH SORTREADEVALDABOKSTÄVER
    //OM DE ÄR SAMMA PUSHAS INDEXET TILL MATCHARRAY
    let matchArray=[];
    let i;
    for (i=0; i<sorteradOrdetsBokstäver.length; i++)
        if (sorteradOrdetsBokstäver[i] == sorteradeValdaBokstäver[i]){
            matchArray.push(i);
    }
    //OM MATCHARRAY INTE ÄR LIKA LÅNG SOM ORDET ÄR RÄTTGISSATORD FALSE
    if(matchArray.length<5) {
        rättGissatOrd=false;                   
    } else {    
            //OM MATCHARRAY ÄR LIKA LÅNG SOM ORDET ÄR RÄTTGISSATORD TRUE           
        setTimeout(() => {
            hangmanBackground.classList.add('game-won');
            rättGissadeBokstäverSynas.classList.add('game-won-top');
           }, 2000);

        rättGissatOrd=true;  
        antalspelOmgångar++;  
        antalRättOmgångar++;  

        if (antalFailadeOmgångar==0) {
            poängräknareCount+=5;
        }
        else if (antalFailadeOmgångar==1) {
            poängräknareCount+=4;
        }
        else if (antalFailadeOmgångar==2) {
            poängräknareCount+=3;
        }
        else if (antalFailadeOmgångar==3) {
            poängräknareCount+=2;
        }
        else if (antalFailadeOmgångar==4) {
            poängräknareCount+=1;
        };

        //3 EXTRA POÄNG OM KLARAR INNAN HALVA TIDEN GÅTT
        if (underHalvaTiden) {
            poängräknareCount+=3;
        }

        //HUR POÄNGSTATISTIKEN VISAS PÅ SIDAN
        poängräknare.innerHTML=`Poäng: ${poängräknareCount}`;
        totaltAntalVunnaOmgångar.innerHTML=`Vunna omgångar: ${antalRättOmgångar}`;  
        totaltAntalOmgångar.innerHTML=`Spelade omgångar: ${antalspelOmgångar}`;

        //ANAMERING- TAR BORT BOKSTÄVER EFTER ATT SPELAREN VUNNIT    
        animering();  
        //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
        nollställOmgång();
    }
};


//SLUTANIMERING EFTER RÄTT GISSAT ORD -> RUTORNA KRYMPER OCH KOMMER TILLBAKA
animering = () => {
     anime({
        targets: '.alfabetet>button',
        scale: [
          {value: .0, easing: 'easeOutSine', duration: 400},
          {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [6, 5], from: 'center'})
      });  
};


displayFelBokstäver = () => {
    //FÖR VARJE FEL BOKSTAV BLIR EN DEL AV SVG:N SYNLIG
    for (bokstav of felBokstäver) {
        svgHelaBilden.forEach((del, index) => {
            if (index == felBokstäver.indexOf(bokstav)){          
                del.classList.add('synlig');   
                antalFel=index;  
                 main.style.backgroundColor='rgba(112, 56, 130, 0.'+antalFel+1+')';  

                  anime({
                    targets: '.barn-'+(index+1)+' path',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeInOutSine',
                    duration: 1500,
                    delay: function(el, i) { return i * 450 },
                    direction: 'normal',
                    loop: 1
                  });

                del.classList.remove('barn-'+(index+1)+'') 
            }; 
        })

        //OM ANTAL FEL ÄR 8 SÅ ÄR HELA SVG:N SYNLIG OCH GUBBEN ÄR HÄNGD => GAME OVER 
        if(antalFel==8) {
            //UPPDATERAR RÄKNAREN FÖR ANTAL SPELOMGÅNGAR
            antalspelOmgångar++;    
            poängräknare.innerHTML=`Poäng: ${poängräknareCount}`;
            totaltAntalVunnaOmgångar.innerHTML=`Vunna omgångar: ${antalRättOmgångar}`;  
            totaltAntalOmgångar.innerHTML=`Spelade omgångar: ${antalspelOmgångar}`;
            
            //ÄNDRAR BAKGRUNDSFÄRG OCH LÄGGER TILL TEXTEN "GAME OVER!" NÄR GUBBEN ÄR HÄNGD
           setTimeout(() => {
            hangmanBackground.classList.add('game-over')
            rättGissadeBokstäverSynas.classList.add('game-over-top')
           }, 3000);

           //TAR BORT ETT LIV FRÅN LIVES-LISTAN
           antalFailadeOmgångar = antalspelOmgångar - antalRättOmgångar;
           antalLivesArray[antalFailadeOmgångar-1].style.opacity='0';  


            //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
            
            setTimeout(() => {
                animering();
                nollställOmgång();
            }, 1000);

           //KOLLAR HUR MÅNGA LIV SPELAREN HAR KVAR, OM LIVEN ÄR SLUT ÄR MAN TOTAL-DÖD 
           if (antalFailadeOmgångar>=5) {
               setTimeout(() => {
                main.classList.add('total-död');
                rättGissadeBokstäverSynas.style.opacity='0';
                rättGissadeBokstäverSynas.style.height='0';
                alfabetetSektion.style.display='none';
                body.style.backgroundColor='var(--main_color)';
               }, 2000);
               setTimeout(() => {
                location.reload();
               }, 6000);
           }   

        }
    }  
};


//STARTAR NY SPELOMGÅNG 
let startaNyOmgång = () => {

     //BOKSTÄVERNA PÅ KNAPPARNA KOMMER FRAM NÄR MAN KLICKAT START
    alfabete.forEach((bokstav, index)=> {
        bokstav.innerText=alfabeteBokstäver[index];
        if(bokstav.classList.contains('oklickbar')) {
            bokstav.classList.remove('oklickbar');
        }
    }); 
    rättGissatOrd=false;

    //TA BORT COUNTDOWN-SIFFROR OCH GÖR DEM SYNLIGA OM DE VARIT OSYNLIGA TIDIGARE
    secondsDisplay.innerHTML='';
    minutesDisplay.innerHTML=''; 
    secondsDisplay.style.opacity='1';
    minutesDisplay.style.opacity='1';

    //TAR BORT STARTAD-CLASSEN FÖR ATT GÖRA SÅ ATT COUNTDOWN SÄTTER IGÅNG NÄSTA GÅNG MAN KLICKAR PÅ EN BOKSTAV
    if(nedräkning){
        nedräkning.classList.remove('startad');
    };

    //SÄTTER TILLBAKA URSPRUNGLIGA CLASSER PÅ HÄNGA-GUBBEN-SVG:N FÖR ATT ANIMATIONEN SKA FUNKA IGEN
    svgHelaBilden.forEach((del, index) => { 
        del.classList.add('barn-'+(index+1)+'') 
    });

    //NOLLSTÄLLER ANTALFEL EFTER EV FÖREGÅENDE SPELOMGÅNG 
    antalFel=0;

    //SLUMPAR FRAM ETT ORD I ORD-LISTAN
    slumpaOrd = Math.floor(Math.random()*79);    
    let nyttOrd=ord[slumpaOrd];           

    //DELAR UPP ORDET I BOKSTÄVER                                 
    nyttOrd=nyttOrd.toLowerCase().split('');  

    //PUSHAR VARJE BOKSTAV TILL ORDETSBOKSTÄVER-LISTAN       
    ordetsBokstäver=nyttOrd.map(bokstav=>bokstav); 

    //LÄGGER TILL EVENTLISTENER PÅ VARJE KNAPP (VARJE BOKSTAV I ALFABETET
    //VID KLICK STARTAR FUNKTIONEN "VALDBOKSTAV"
    for (bokstav of alfabete) {
        bokstav.addEventListener('click', valdBokstav);        
        if (!bokstav.classList.contains('klickad')){
            bokstav.addEventListener('click', sättIgångNedräkning);
        }
    };
};
//STARTAR NY SPELOMGÅNG GENOM ATT SLUMPA FRAM ETT ORD UR ORD-LISTAN
startKnapp.addEventListener('click', startaNyOmgång);


//FUNKTIONEN SOM GÖR OM DEN KNAPP/BOKSTAV SOM KLICKATS PÅ TILL BOKSTAV, SEDAN LOOPAR IGENOM ORDETS-BOKSTÄVER-LISTAN
// VARJE BOKSTAV I LISTAN JÄMFÖRS MED DEN VALDA BOKSTAVEN, OM DE MATCHAR LÄGGS BOKSTAVEN TILL I RÄTTBOKSTÄVER-LISTAN
//OM DE INTE MATCHAR LÄGGS BOKSTAVEN I FELBOKSTÄVER-LISTAN
let valdBokstav = (event) => {
    //SER TILL ATT FUNKTIONERNA BARA SÄTTER IGÅNG OM KNAPPENS BOKSTAV SYNS
    if (event.target.innerHTML!='') {
        let bokstav = event.target.innerText.toLowerCase();
        event.target.classList.add('klickad');      
        let bokstavsmätare=0;       
        
        //KOLLAR OM DEN VALDA BOKSTAVEN FINNS I RÄTTBOKSTÄVER-LISTAN, OM DEN FINNS BLIR BOKSTAVSMÄTAREN 1, ANNARS ÄR DEN 0
        for (rättBokstav of ordetsBokstäver) {
            if(rättBokstav==bokstav) {
                valdaBokstäver.push(rättBokstav); 
                bokstavsmätare++;                 
                displayRättBokstäver(rättBokstav);
            } 
        }


        //OM BOKSTAVSMÄTAREN ÄR 0 PUSHAS VALDA BOKSTAVEN TILL FELBOKSTÄVER-LISTAN
        if (bokstavsmätare==0) {
            felBokstäver.push(bokstav)
        }
        displayFelBokstäver();
    }
};


//STARTA COUNTDOWN VID KLICK PÅ BOKSTAV
let sättIgångNedräkning =() => {
    if (nedräkning) {
        nedräkning.classList.add('synlig');
        if (!nedräkning.classList.contains('startad')&&antalRättOmgångar>=10) {
            countDown(10);
        } else if (!nedräkning.classList.contains('startad')&&antalRättOmgångar>=5) {
            countDown(15);
        } else if (!nedräkning.classList.contains('startad')&&antalRättOmgångar<5) {
            countDown(30);
        }
    }
    if (nedräkning) {
        nedräkning.classList.add('startad');
    }
};


//COUNTDOWN TIMER
let countDown = (sekunder) => { 

    //MINUTER OMVANDLADE TILL SEKUNDER
    let totalStartTid=sekunder;
    
    //FORMATERING AV HUR TIDEN VISAS INNAN NEDRÄKNINGEN BÖRJAR
    minutesDisplay.innerHTML = '00';
    secondsDisplay.innerHTML= totalStartTid;
    
    //STÄLLER IN NEDRÄKNINGEN: RÄKNAR NER FRÅN TOTALSTARTTID, 1 SEKUND I TAGET
    let interval= setInterval(() => {    
        countDown.runnning=true;

        //CURRENT TIME-NEDRÄKNING
        let currentTime=totalStartTid--;

        //OM GISSAT RÄTT ORD 
        if (rättGissatOrd) {
            clearInterval(interval);
        }
        //OM GUBBEN ÄR HÄNGD-STOPPAR NEDRÄKNING
        if (antalFel==8){
            clearInterval(interval);
        } 

        //ÄNDRAR FÄRGEN PÅ SIFFRORNA BEROENDE PÅ HUR LÅNG TID SOM ÄR KVAR
        färgNedräkning(currentTime, sekunder);

        //Hur många hela minuter kvar:                   
        minutesDisplay.innerHTML = '00';

        //Hur många sekunder kvar utöver hela minuter:
        secondsDisplay.innerHTML = totalStartTid;

        if(secondsDisplay.innerHTML<10){
            secondsDisplay.innerHTML = "0" + secondsDisplay.innerHTML
        }

        //OM MINDRE ÄN HALVA COUNTDOWN TIDEN HAR GÅTT ÄR "UNDERHALVATIDEN" TRUE, ANNARS FALSE
        (currentTime>(sekunder)/2) ? underHalvaTiden = true : underHalvaTiden = false;

            //NÄR TIDEN ÄR UTE
        tidenUte(currentTime, interval);
    },1000); 
}; 


//NÄR TIDEN ÄR UTE
tidenUte = (currentTime, interval) => {
    if (currentTime<1) {
        clearInterval(interval);
        minutesDisplay.innerText='00'
        secondsDisplay.innerText='00'

        //UPPDATERAR RÄKNAREN FÖR ANTAL SPELOMGÅNGAR
        antalspelOmgångar++;    
        poängräknare.innerHTML=`Poäng: ${poängräknareCount}`;
        totaltAntalVunnaOmgångar.innerHTML=`Vunna omgångar: ${antalRättOmgångar}`;  
        totaltAntalOmgångar.innerHTML=`Spelade omgångar: ${antalspelOmgångar}`;

        //ÄNDRAR BAKGRUNDSFÄRG OCH LÄGGER TILL TEXTEN "GAME OVER!" NÄR GUBBEN ÄR HÄNGD
        setTimeout(() => {
            hangmanBackground.classList.add('game-over')
            rättGissadeBokstäverSynas.classList.add('game-over-top')
        }, 3000);

        //NOLLSTÄLLER SPELPLANEN FÖR NÄSTA OMGÅNG
        
        setTimeout(() => {
            animering();
            nollställOmgång();
        }, 1000);

        //TAR BORT ETT LIV FRÅN LIVES-LISTAN
        antalFailadeOmgångar = antalspelOmgångar - antalRättOmgångar;
        antalLivesArray[antalFailadeOmgångar-1].style.opacity='0';  
        };

             //KOLLAR HUR MÅNGA LIV SPELAREN HAR KVAR, OM LIVEN ÄR SLUT ÄR MAN TOTAL-DÖD 
             if (antalFailadeOmgångar>=5) {
                setTimeout(() => {
                 main.classList.add('total-död');
                 rättGissadeBokstäverSynas.style.opacity='0';
                 rättGissadeBokstäverSynas.style.height='0';
                 alfabetetSektion.style.display='none';
                 body.style.backgroundColor='var(--main_color)';
                }, 2000);
                setTimeout(() => {
                 location.reload();
                }, 6000);
            }  
};

//ÄNDRAR FÄRG PÅ SIFFRORNA 
färgNedräkning = (currentTime, sekunder) => {
    if (currentTime > (sekunder) * 0.75) {
        nedräkning.style.color = '#3D943F';
    } else if (currentTime > (sekunder) * 0.5) {
        nedräkning.style.color = '#acac02';
    } else if (currentTime > (sekunder) * 0.25) {
        nedräkning.style.color = 'orange';
    } else {
        nedräkning.style.color = 'rgb(141, 9, 9)';
    }    
};


// Reset på sidan
let reset = () => {
    location.reload();
};
resetKnapp.addEventListener('click', reset);