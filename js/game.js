const grid = document.querySelector(".grid");
const nickname = document.querySelector("#nick");
const timer = document.querySelector("#timer");

const modall = document.querySelector("#modall");
const modal = document.querySelector("#modal");
const timerModal = document.querySelector("#spandois");
const back = document.querySelector("#back")
const restart = document.querySelector("#restart")


let firstCard = '';
let secondCard = '';
///////////////////////////////////////////////////////////////////////
const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');
    if(disabledCards.length === 12  ){
        clearInterval(interval)
        modall.classList.remove("hidden");
        modal.innerHTML = `<span id="spandois">PARABENS, SEU TEMPO FOI DE:  ${timer.innerHTML}</span>`
    }
}
const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')
    if(firstCharacter === secondCharacter){
        
            firstCard.firstChild.classList.add('disabled-card')
            secondCard.firstChild.classList.add('disabled-card')

            firstCard = '';
            secondCard = '';
            
            checkEndGame();
            timerModal.textContent = timerModal;

    } else{
        setTimeout(() =>{
            firstCard.classList.remove('revel-card');
            secondCard.classList.remove('revel-card');

            firstCard = '';
            secondCard = '';
        },500)
        
    }
}
const fetchApi = async () => {
    const APIResponse = await fetch('https://rickandmortyapi.com/api/character')
    const data = await APIResponse.json();
    return data;
}
const renderAPI = async () =>{
      const data = await fetchApi();

      const characters = data.results;

      const  rick = characters['0']['image']
      const  morty = characters['1']['image']
      const  summer = characters['2']['image']
      const  beth = characters['3']['image']
      const  jerry = characters['4']['image']
      const  adjudicator = characters['7']['image']
      

      const arrCharacteres = [rick,morty,summer,beth,jerry,adjudicator]
      return arrCharacteres;
}
const revealCard = ({target}) =>{
   
    if(target.parentNode.classList.contains('revel-card')){
        return
    }
    if(firstCard === ''){
        target.parentNode.classList.add('revel-card')
        firstCard = target.parentNode;
    }
    else if (secondCard === ''){
        target.parentNode.classList.add('revel-card')
        secondCard = target.parentNode;
        checkCards()
    }

}
const loadGame = async () =>{
    const cartas = await renderAPI();
    const duplicateCharacteres = [...cartas, ...cartas]

    const shuffledArray = duplicateCharacteres.sort(() => Math.random() -0.5)
    shuffledArray.forEach((character) =>{
       const div =  document.createElement("div")
       div.classList.add("card")
       div.addEventListener('click', revealCard)
       div.setAttribute("data-character", character)
       const front = document.createElement("div")
       front.classList.add("face")
       front.classList.add("front")
       front.style.backgroundImage = `url(${character})`
       const back = document.createElement("div")
       back.classList.add("face")
       back.classList.add("back")
       div.appendChild(front);
       div.appendChild(back);
       grid.appendChild(div)
    })

    time = 0;

    interval = setInterval(timeGenerator,1000);
    
    
}
//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

  const tempo = `${minutesValue}:${secondsValue}`;
  timer.innerHTML = tempo;
};
const initializer = () =>{

}

     restart.addEventListener("click", (e) =>{
    e.preventDefault()
    window.location.reload(true);
    modal.classList.add("hidden")
     })
back.addEventListener("click", (e) =>{
    e.preventDefault()
    window.location = "../index.html";
})




   window.onload = () =>{
        nickname.textContent = localStorage.getItem("name")
        loadGame()
        
        
   }
   

//const cards = character['0']['image']
      
