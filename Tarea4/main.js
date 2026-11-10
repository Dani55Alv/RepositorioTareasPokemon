const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const imgElement = document.getElementById("image");
const nameElement = document.getElementById("name");
const numberElement = document.getElementById("number");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");

const cardElement = document.getElementById("card");
const pistaTexto = document.getElementById("pistaTxt");
const btn_buscar = document.getElementById("btn_buscar");

let aviso = document.createElement("p");


const vaciarElementos = () => {
  imgElement.src = "";
  nameElement.innerText = "";
  numberElement.innerText = "";
  altura.innerText = "";
  peso.innerText = "";
  cardElement.replaceChildren(); 
};

let fetchData = async (url) => {
  try {
    let response = await fetch(url);
    
    if (!response.ok) {
      vaciarElementos(); 
      
      if (response.status === 404) {
        aviso.textContent = `Pokemon no encontrado : ${response.status}`;
      } else {
        aviso.textContent = `Error de red: ${response.status}`;
      }
      return; 
    }
      
    let data = await response.json();
    aviso.textContent = ""; 

    imgElement.src = data.sprites.other.dream_world.front_default;
    nameElement.innerText = `${data.name}`;
    numberElement.innerText = `#${data.id}`;
let alturaCorrecta = data.height / 10;
    let pesoCorrecto = data.weight / 10;

    altura.innerText = alturaCorrecta + "m";
    peso.innerText = pesoCorrecto + "kg";

    const botonesViejos = cardElement.querySelectorAll("button");
    botonesViejos.forEach(boton => boton.remove());

    data.types.forEach((element) => {
      let newButton = document.createElement("button");
      newButton.classList.add(element.type.name);
      newButton.innerText = element.type.name;
      cardElement.appendChild(newButton); 
    });

  } catch (error) {
    console.error(error);
    vaciarElementos(); 
    aviso.textContent = "Fallo de red.";
  }
};

btn_buscar.addEventListener("click", (evento) => {
  const elnombre = pistaTexto.value.trim().toLowerCase(); 

  if (elnombre === "") {
    aviso.textContent = "Introduce un nombre por favor";
    document.body?.append(aviso);
    return;
  }
  
  aviso.textContent = "Cargando...";
  document.body?.append(aviso);
  
  fetchData(`${pokeAPI}${elnombre}`);
});
