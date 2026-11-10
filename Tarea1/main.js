const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const imgElement = document.getElementById("image");
const nameElement = document.getElementById("name");
const numberElement = document.getElementById("number");

const altura = document.getElementById("altura");
const peso = document.getElementById("peso");

const cardElement = document.getElementById("card");

const btn_cargarPokemon = document.getElementById("btn_cargar_pokemon");





let fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }
    let data = await response.json();

    imgElement.src = data.sprites.other.dream_world.front_default;
    nameElement.innerText = `${data.name}`;
    numberElement.innerText = `#${data.id}`;

    let alturaCorrecta = data.height /10
    let pesoCorrecto = data.weight /10


    altura.innerText= alturaCorrecta + "m";
    peso.innerText=  pesoCorrecto+ "km";

    let types = data.types;
    types.replaceChildren();
   
    types.forEach((element) => {
      console.log(element.type.name);

      let newButton = document.createElement("button");
      newButton.classList.add(element.type.name);
      newButton.innerText = element.type.name;
      cardElement.appendChild(newButton);
    });
  } catch (error) {
    console.error(error);
  }
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}







btn_cargarPokemon.addEventListener("click", () => {
let number = getRandomNumber(1, 151);
fetchData(`${pokeAPI}${number}`);



});