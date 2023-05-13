const captchasCant = 5;

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", enviar);
}

const captcha = document.getElementById("captcha-img");
if (captcha) {
  insertarCaptcha();
  let renovarCaptcha = document.getElementById("renovar-captcha");
  renovarCaptcha.addEventListener("click", insertarCaptcha)
}
const resMensaje = document.getElementById("res-mensaje");


function insertarCaptcha(){
  let num = Math.ceil(Math.random() * captchasCant);
  while (num == captcha.alt) {
    num = Math.ceil(Math.random() * captchasCant);
  }
  const img = num+ ".jpg";
  captcha.src = "../imgs/captcha/" + img;
  captcha.alt = num;
}

function enviar(e){
  e.preventDefault();
  const formData = new FormData(form);

  const res = formData.get("respuesta");
  if (!checkCaptcha(res)) {
    resMensaje.innerText = "Intente nuevamente, esa respuesta no es correcta.";
  } else {
    
    const userData = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      horarios: {
        morning: formData.get("morning"),
        tarde: formData.get("tarde"),
        noche: formData.get("noche") 
      },
      cantidad: formData.get("cantidad"),
      comentarios: formData.get("comentarios")
    };

    resMensaje.innerText = "Muchas gracias "+ userData.nombre +". En breve nos estaremos comunicando!";
    
    /* console.log("Nombre: " +userData.nombre+ "\nEmail: " +userData.email+"\nHorarios: \n  mañana: " +userData.horarios.morning+"\n  tarde: " +userData.horarios.tarde+"\n  noche: " +userData.horarios.noche+"\ncantidad de músicos: "+userData.cantidad);

    if(userData.comentarios.length > 0) {
      console.log("Información adicional / comentarios: \n" + userData.comentarios);
    } */
  }
}

function checkCaptcha(res){
  const captcha = document.getElementById("captcha-img").alt;
  const solution = getSolution(captcha);
  return (res == solution)
}

function getSolution(captcha){
  let res;
  switch (captcha) {
    case "2":
      res = "JK9";
      break;
    case "3":
      res = "6GU";
      break;
    case "4":
      res = "ZA2";
      break;
    case "5":
      res = "S4N";
      break;
    default:
      res = "5L7";
      break;
  }
  return res;
}