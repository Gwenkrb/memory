const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard;
let secondCard;
// Permet d'empêcher de tirer d'autres cartes qd firstCard et secondCard déjà tirées
let lockBoard = false;
// Compteur du nombre de cartes retournées
let cptCard = 0;
// Compteur du nombre de paires trouvées
let cptPaires = 0;

// Fonction qui permet de retourner une carte
function flipCard() {

    this.classList.add('flip');
    if(lockBoard) return;
    // Permet d'empêcher de clicker deux fois sur la même carte, ce qui activerait checkForMatch
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

// Fonction qui permet de vérifier si firstCard = secondCard, si il y a paire
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        cptPaires++;
        console.log("Vous avez ", cptPaires, " paires.");
        return;
    }
unflipCards();
}

// Fonction qui permet de laisser les paires trouvées retournées du bon côté
function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
}

// Fonction qui permet de retourner les cartes après un délai si ce ne sont pas les mêmes
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Permet de remettre à 0 ces 4 variables
// Épure le code en enlevant tous les lockboards = false et hasFlippedCard = false
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// Fonction qui permet de mélanger aléatoirement les 12 cartes
// La parenthèse avant la fonction et )(); après l'acolade censée être finale = IIFE
// IIFE = Immediately Invoked Function Expression, fonction qui s'exécute dès que le script est invoqué
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

// Permet de parcourir toutes les cartes pour détecter quand on clique sur l'une d'entre elles
cards.forEach(card => card.addEventListener('click', flipCard))