//patron modulos, sintaxis

//funcion anonima autoinvocada // crea un nuevo scoped el cual no tiene un referencia por nombre
//por lo cual no va ha hacer posible llamar el objeto directamente

const miModulo = (() => {
    'use strict';


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }


    //referencias de html 
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas')



    /**
     * esta funcion crea una nueva baraja de cartas, ordenada de forma aleatori
     * @returns array
     */
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        return _.shuffle(deck);
    }

    /**
     * Esta funcion me permite tomar el ultimo valor del array de las cartas
     */
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }


    // retorna el valor (Numero) de la carta 
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //metodo que tiene todos los string // cortamos desde 0 hasta la ultima
        return (isNaN(valor)) ? //isNaN valida si es un numero y retorna true o false
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }
    //Turno: 0 = primer jugador y el ultimo la computadora 
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :( ');
            } else if (puntosMinimos > 21) {
                alert('La computadora gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador gana :) ')
            } else {
                alert('Computadora gana')
            }
        }, 10);
    }

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)
            /* // puntosComputadora = puntosComputadora + valorCarta( carta )
             // puntosHTML[1].innerText = puntosComputadora;
 
             <img class="carta" src="assets/cartas/2D.png"> 
             const imgCarta = document.createElement('img');
             imgCarta.src = `assets/cartas/${ carta }.png`;
             imgCarta.classList.add('carta');
             divCartasComputadora.append( imgCarta );
 
             if (puntosMinimos > 21) {
                 break;
             }*/

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    //eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0)

        /*  puntosJugador = puntosJugador + valorCarta( carta )
            puntosHTML[0].innerText = puntosJugador;
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            divCartasJugador.append( imgCarta );*/

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    })

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[0] );
    })

    // btnNuevoJuego.addEventListener('click', () => {
    //     inicializarJuego();
    // })

    return {
       nuevoJuego: inicializarJuego
    };
})()

