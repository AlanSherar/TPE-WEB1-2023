document.addEventListener("DOMContentLoaded", ()=>{

  function iniciarJS(){
    const menuBtn = document.querySelector(".menu-btn");
    menuBtn.addEventListener("click", toggleMenu);
    
    function toggleMenu(){
      const mobileNavMenu = document.querySelector(".nav-menu");
      mobileNavMenu.classList.toggle("hide");
    }
  }
});