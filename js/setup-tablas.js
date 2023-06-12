document.addEventListener("DOMContentLoaded", function(){
  "use strict"
  
  const microfonos = [{
    "nombre": "AT2020",
    "patron": "Cardioide",
    "rango": "20Hz - 20kHz",
    "nivelPS": "144dB"
  },
  {
    "nombre": "AKG P120",
    "patron": "Cardioide",
    "rango": "20Hz - 20kHz",
    "nivelPS": "130/150dB"
  },
  {
    "nombre": "Behringer C-1",
    "patron": "Cardioide",
    "rango": "40Hz - 20kHz",
    "nivelPS": "136dB"
  }];
  const auriculares = [{
    "nombre": "AKG K92",
    "frecuencia": "16 Hz - 20 kHz",
    "impedancia": "32 Ohmios",
    "sensibilidad": "113dB"
  },
  {
    "nombre": "AKG K175",
    "frecuencia": "18 Hz - 26 kHz",
    "impedancia": "32 Ohmios",
    "sensibilidad": "114dB"
  },
  {
    "nombre": "ATH M20X",
    "frecuencia": "15 Hz - 20 kHz",
    "impedancia": "47 Ohmios",
    "sensibilidad": "96dB"
  }];
  const placas = [{
    "nombre": "UMC404 HD",
    "entradas": "4(+1 MIDI)",
    "salidas": "4",
    "monitorizacion": "Si"
  },
  {
    "nombre": "UMC202 HD",
    "entradas": "2",
    "salidas": "2",
    "monitorizacion": "Si"
  },
  {
    "nombre": "Scarlett 2i2",
    "entradas": "2",
    "salidas": "2",
    "monitorizacion": "No"
  }];
  let setupUser = [];
  
  cargarSelects();
  
  let formMicros = document.querySelector("#form_Micro");
  let formAuris = document.querySelector("#form_Auri");
  let formPlacas = document.querySelector("#form_Placa");
  let btnLimpiarSetup = document.querySelector("#limpiarSetup");
  let btnSetupRandom = document.querySelector("#setupRandom");

  formMicros.addEventListener("submit", agregar);
  formAuris.addEventListener("submit", agregar);
  formPlacas.addEventListener("submit", agregar);
  btnLimpiarSetup.addEventListener("click", vaciarSetup);
  btnSetupRandom.addEventListener("click", autoSetup);
  
  autoSetup();

  function agregar(e) {
    e.preventDefault();
    let target = e.target;
    let tipo = target.id.split("_")[1];

    let formData = new FormData(target);
    let objeto = {
      "nombre": formData.get("options"),
      "tipo" : tipo,
      "cantidad" : formData.get("cantidad")
    }
    setupUser.push(objeto);
    mostrarTabla(); 
  }
  function autoSetup(){
    vaciarSetup();
    let item = microfonos[Math.floor(Math.random() * microfonos.length)];
    setupUser.push({"nombre": item.nombre, "tipo": "Micro", "cantidad":1});
    item = auriculares[Math.floor(Math.random() * auriculares.length)];
    setupUser.push({"nombre": item.nombre, "tipo": "Auri", "cantidad":1});
    item = placas[Math.floor(Math.random() * placas.length)];
    setupUser.push({"nombre": item.nombre, "tipo": "Placa", "cantidad":1});
    mostrarTabla();
  }

  function vaciarSetup(){
    setupUser = [];
    mostrarTabla();
  }
  function mostrarTabla(){
    let tb = document.querySelector("#tablaSetup tbody");
    tb.innerHTML = "";
   
    setupUser.forEach( function(item){
      let fila = document.createElement("tr");
      for (const key in item) {
        let columna = document.createElement("td");
        columna.innerHTML = item[key];
        fila.appendChild(columna);
      }
      tb.appendChild(fila);
    })
  }
  function cargarSelects(){
    let selectAuris = document.querySelector("#selectAuris");
    let selectMicros = document.querySelector("#selectMicros");
    let selectPlacas = document.querySelector("#selectPlacas");
    microfonos.forEach( micro => {
      let option = document.createElement("option");
      option.innerHTML=micro.nombre;
      option.value=micro.nombre;
      selectMicros.appendChild(option);
    });
    auriculares.forEach( auri => {
      let option = document.createElement("option");
      option.innerHTML=auri.nombre;
      option.value=auri.nombre;
      selectAuris.appendChild(option);
    });
    placas.forEach( placa => {
      let option = document.createElement("option");
      option.innerHTML=placa.nombre;
      option.value=placa.nombre;
      selectPlacas.appendChild(option);
    });
  }
});