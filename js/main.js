const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let cptCard = 0;
let cptPaires = 0;

function flipCard() {

    this.classList.add('flip');
    if(lockBoard) return;
    
    if(this === firstCard) return;
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        cptCard++;
        let cptMessage = document.getElementById('cptMessage');
        cptMessage.innerHTML = cptCard + " déplacements."
        console.log("Vous avez retourné ", cptCard, " cartes.");
        return;
    }
    secondCard = this;
    cptCard++;
    cptMessage.innerHTML = cptCard + " déplacements."
    console.log("Vous avez retourné ", cptCard, " cartes.");
    checkForMatch();
    if(cptPaires===6){ 
            setTimeout(()=>{ 
                alert(`Félicitations, vous avez gagné le jeu en ${cptCard} coups.`);
            }, 500)
        } 
}


function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        cptPaires++;
        console.log("Vous avez ", cptPaires, " paires.");
        return;
    }
unflipCards();
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
}


function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}



function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}




(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space')
        window.location.reload();
})


cards.forEach(card => card.addEventListener('click', flipCard))