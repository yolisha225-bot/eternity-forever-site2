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
