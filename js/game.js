const grid = document.querySelector('.grid');
const spanJogador = document.querySelector('.jogador'); 
const timer = document.querySelector('.timer');

const personagens = [
    'pao_queijo',
    'cafe',
    'violao',
    'queijo',
    'atletico',
    'cruzeiro',
    'boi',
    'folia',
    'bh',
    'doce_leite',
]

const criarElemento = (tag, className) =>{
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento

}

let primeiraCarta = '';
let segundaCarta = '';

const checkEndGame = () => {
    const cartasDisabilitadas = document.querySelectorAll('.cartaDisabilitada');

    if(cartasDisabilitadas.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanJogador.innerHTML}! Seu tempo foi de  ${timer.innerHTML} segundos`);
    }
}

const checarCarta = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

    if(primeiroPersonagem === segundoPersonagem){
        primeiraCarta.firstChild.classList.add('cartaDisabilitada');
        segundaCarta.firstChild.classList.add('cartaDisabilitada');

        primeiraCarta = '';
        segundaCarta = '';

        checkEndGame();

    }else{

        setTimeout(() => {

        primeiraCarta.classList.remove('revelarCarta');
        segundaCarta.classList.remove('revelarCarta');

        primeiraCarta = '';
        segundaCarta = '';

        }, 500)

    }
}

const revelarCarta = ({target}) => {
    if(target.parentNode.className.includes('revelarCarta')){
        return;
    }

    if(primeiraCarta === ''){
        target.parentNode.classList.add('revelarCarta');
        primeiraCarta = target.parentNode;
    } else if(segundaCarta === ''){
        target.parentNode.classList.add('revelarCarta');
        segundaCarta = target.parentNode;

        checarCarta();

    }


}

const criarCarta = (personagem) =>{

    const carta = criarElemento('div', 'carta');
    const frente = criarElemento('div', 'face frente');
    const verso = criarElemento('div', 'face verso');

    frente.style.backgroundImage = `url('../imagens/${personagem}.png')`;
    
    carta.appendChild(frente);
    carta.appendChild(verso);
    grid.appendChild(carta);

    carta.addEventListener('click', revelarCarta);

    carta.setAttribute('data-personagem', personagem);
    return carta
}

const loadGame = () => {

    const duplicarPersonagens = [...personagens, ...personagens];

    const  shuffledArray = duplicarPersonagens.sort(() => Math.random() - 0.5);

    duplicarPersonagens.forEach((personagem) => {
        
        const carta = criarCarta(personagem);
        grid.appendChild(carta);
    });
}

const iniciarTempo = () => {
    this.loop = setInterval(() => {
        const tempoAtual = +timer.innerHTML;
        timer.innerHTML = tempoAtual + 1;

    }, 1000);
}
window.onload = () => {
    spanJogador.innerHTML = localStorage.getItem('jogador');

    loadGame();
    iniciarTempo();
}
