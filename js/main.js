document.addEventListener("DOMContentLoaded", function(){
  
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNavMenu = document.querySelector(".nav-menu");
  menuBtn.addEventListener("click", toggleMenu);
  
  function toggleMenu(){
    console.log("entra");
    mobileNavMenu.classList.toggle("hide");
  }

});