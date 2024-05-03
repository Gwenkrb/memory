const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let cptCoups = 0;
let cptPaires = 0;

function flipCard() {

    if(lockBoard) return;

    this.classList.add('flip');
    
    if(this === firstCard) return;
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        console.log("Boucle carte 1", lockBoard);
        return;
    }
    secondCard = this;
    console.log("Boucle carte 2", lockBoard);
    cptCoups++;
    cptMessage.innerHTML = cptCoups + " tentatives."
    checkForMatch();
    console.log("Boucle après checkMatch", lockBoard);
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        cptPaires++;
        disableCards();
        return;
    }
unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
    if(cptPaires===6){ 
        setTimeout(()=>{ 
            cptMessage.innerHTML = `Félicitations, vous avez gagné le jeu en ${cptCoups} tentatives.`;
        }, 500)
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
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