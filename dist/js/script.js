var menuBtn = document.querySelector('.menu');
var nav = document.querySelector('nav ul');

function showHideMenu(evt) {
  nav.classList.toggle('show');
  evt.target.innerHTML=evt.target.innerHTML==="Menu" ? "Close":"Menu";
}

menuBtn.addEventListener('click', showHideMenu);