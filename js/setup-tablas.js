document.addEventListener("DOMContentLoaded", function(){
  "use strict"
  
  const microfonos = [
    {
      "nombre": "AT2020",
      "patron": "Cardioide",
      "rango": "20Hz - 20kHz",
      "nivelPS": "144dB",
      "best": true,
      "item": "Micro"
    },
    {
      "nombre": "AKG_P120",
      "patron": "Cardioide",
      "rango": "20Hz - 20kHz",
      "nivelPS": "130/150dB",
      "best": false,
      "item": "Micro"
    },
    {
      "nombre": "Behringer_C-1",
      "patron": "Cardioide",
      "rango": "40Hz - 20kHz",
      "nivelPS": "136dB",
      "best": false,
      "item": "Micro"
  }];
  const auriculares = [
    {
      "nombre": "AKG_K92",
      "frecuencia": "16 Hz - 20 kHz",
      "impedancia": "32 Ohmios",
      "sensibilidad": "113dB",
      "best": true,
      "item": "Auri"
    },
    {
      "nombre": "AKG_K175",
      "frecuencia": "18 Hz - 26 kHz",
      "impedancia": "32 Ohmios",
      "sensibilidad": "114dB",
      "best": false,
      "item": "Auri"
    },
    {
      "nombre": "ATH_M20X",
      "frecuencia": "15 Hz - 20 kHz",
      "impedancia": "47 Ohmios",
      "sensibilidad": "96dB",
      "best": false,
      "item": "Auri"
  }];
  const placas = [
    {
      "nombre": "UMC404_HD",
      "entradas": "4(+1 MIDI)",
      "salidas": "4",
      "monitorizacion": "Si",
      "best": false,
      "item": "Placa"
    },
    {
      "nombre": "UMC202_HD",
      "entradas": "2",
      "salidas": "2",
      "monitorizacion": "Si",
      "best": true,
      "item": "Placa"
    },
    {
      "nombre": "Scarlett_2i2",
      "entradas": "2",
      "salidas": "2",
      "monitorizacion": "No",
      "best": false,
      "item": "Placa"
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
  
  let tablasIDs = {
    micros : "#tablaMicros",
    auris : "#tablaAuris",
    placas : "#tablaPlacas",
    setup : "#tablaSetup"
  }

  mostrarTabla(tablasIDs.micros, microfonos);
  mostrarTabla(tablasIDs.auris, auriculares);
  mostrarTabla(tablasIDs.placas, placas);
  autoSetup();
  
  function agregar(e) {
    e.preventDefault();
    let target = e.target;
    let item = target.id.split("_")[1];
    let placaIndex = setupUser.findIndex(elem => elem.item == "Placa");

    let tipo = "";
    switch (item){
      case "Micro":
        tipo = "Micrófono";
        break;
      case "Auri":
        tipo = "Auricular";
        break;
      default:
        tipo = "PlacaSonido";
    }
    let formData = new FormData(target);
    let objeto = {
      "nombre": formData.get("options"),
      "tipo" : tipo,
      "item" : item,
      "cantidad" : formData.get("cantidad")
    }
    if(objeto.item == "Placa" && placaIndex != -1){
      console.log("borra");
      setupUser.splice(placaIndex,1);
    }
    setupUser.push(objeto);
    mostrarTabla(tablasIDs.setup, setupUser);
  }
  function autoSetup(){
    vaciarSetup();
    let producto = microfonos[Math.floor(Math.random() * microfonos.length)];
    setupUser.push({"nombre": producto.nombre,"tipo":"Micrófono", "item": "Micro", "cantidad":1});
    producto = auriculares[Math.floor(Math.random() * auriculares.length)];
    setupUser.push({"nombre": producto.nombre,"tipo":"Auricular", "item": "Auri", "cantidad":1});
    producto = placas[Math.floor(Math.random() * placas.length)];
    setupUser.push({"nombre": producto.nombre,"tipo":"PlacaSonido", "item": "Placa", "cantidad":1});
    mostrarTabla(tablasIDs.setup, setupUser);
  }
  function vaciarSetup(){
    setupUser = [];
    mostrarTabla(tablasIDs.setup, setupUser);
  }
  function mostrarTabla(tabla, array){
    let tb = document.querySelector(`${tabla} tbody`);
    tb.innerHTML = "";

    array.forEach( function(producto){
      let fila = document.createElement("tr");
      for (const key in producto) {
        if(key != "best" && key != "item"){
          let columna = document.createElement("td");
          if(key == "nombre"){
            let div = document.createElement("div");
            div.className = "table-img";
            let img = document.createElement("img");
            img.src = `../imgs/setup/${producto.item}/${producto.nombre}.png`;
            img.alt = producto[key];
            div.appendChild(img);
            columna.appendChild(div);
          }
          columna.innerHTML += producto[key];
          fila.appendChild(columna);
        } else if(producto[key]){
          fila.classList.add("resaltar")
        }
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