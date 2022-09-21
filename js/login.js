const input = document.querySelector('.inputLogin');
const button = document.querySelector('.buttonLogin');
const form = document.querySelector('.formLogin');

const validateInput = ({ target }) => {
    if(target.value.length > 2){
        button.removeAttribute('disabled');
        return;
    } 

    button.setAttribute('disabled', '');
}

const handleSubmit = (event) =>{
    event.preventDefault();

    localStorage.setItem('jogador', input.value);
    window.location = 'html/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);