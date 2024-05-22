const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login-form")

const validateInput = ({ target }) =>{
    if (target.value.length > 2) { 
        button.removeAttribute('disabled');
        return;
    }
   

    button.setAttribute('disabled', '');
}

input.addEventListener('input', validateInput);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nickname = input.value;

    localStorage.setItem("name", nickname);
    window.location = "pages/game.html"
})
