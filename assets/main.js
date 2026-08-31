// ETERNITY FOREVER — comportement d'interface uniquement.
// Ce script ne charge et n'injecte aucun contenu : il se contente d'afficher
// ou de masquer le menu de navigation sur mobile. Tout le texte du site est
// déjà présent dans le HTML envoyé par le serveur.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.navtoggle');
  var nav = document.querySelector('nav.mainnav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });
});

// Compteur de visiteurs — appelle counter.php sur chaque page pour enregistrer
// la visite (dédoublonnée par cookie, 1 fois par visiteur et par 24h) et
// n'affiche le nombre que sur la page d'accueil, si l'élément existe.
// Ce nombre est par nature une donnée live (mise à jour à chaque visite) et
// ne peut donc pas être un texte statique du HTML ; il ne remplace aucun
// contenu éditorial de la page.
document.addEventListener('DOMContentLoaded', function () {
  fetch('/counter.php', { credentials: 'same-origin' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || typeof data.count !== 'number') return;
      var el = document.getElementById('visitor-count');
      if (el) el.textContent = data.count.toLocaleString('fr-FR');
    })
    .catch(function () { /* silencieux : le site reste utilisable sans compteur */ });
});
