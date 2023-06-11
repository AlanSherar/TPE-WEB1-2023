window.addEventListener("DOMContentLoaded", ()=>{

  function iniciarJS(){
    const menuBtn = document.querySelector(".menu-btn");
    const mobileNavMenu = document.querySelector(".nav-menu");
    menuBtn.addEventListener("click", toggleMenu);
    
    function toggleMenu(){
      mobileNavMenu.classList.toggle("hide");
    }
  }
});