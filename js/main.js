// La constante cards stocke toutes les cartes avec la div "memory-card"
const cards = document.querySelectorAll('.memory-card');
// La fonction flipCard n'a pas de paramètres. Elle rajoute flip quand on clique sur une carte.
// Le nom de classe "memory-card" deviendra ainsi "memory-card flip" après l'événement this
function flipCard() {
    this.classList.toggle('flip');
}
// forEach parcourt toutes les div avec la classe memory-card et ajoute la classe flip à memory-card
// Ce qui permet d'utiliser en CSS .memory-card.flip destiné au comportement visuel de la carte quand on clique dessus.
cards.forEach(card => card.addEventListener('click', flipCard))