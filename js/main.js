window.addEventListener("DOMContentLoaded", iniciarJS);

function iniciarJS(){
  const menuNav = document.querySelector("#menuDesplegable");
  const mbMenu = document.querySelector("#mobileMenu");
  menuNav.addEventListener("click", toggleMenu);
  
  function toggleMenu(){
    mbMenu.classList.toggle("oculto");
  }
}
