const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const imgElement = document.getElementById("image");
const nameElement = document.getElementById("name");
const numberElement = document.getElementById("number");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");

const cardElement = document.getElementById("card");
const pistaTexto = document.getElementById("pistaTxt");
const btn_buscar = document.getElementById("btn_buscar");
const btn_siguiente = document.getElementById("next");

let aviso = document.createElement("p");
//Endpoint: https://pokeapi.co/api/v2/pokemon?limit=10&offset=0

let limit = 10; //numero de pokemons que se mostraran.
let offset = 1; //Indice de inicio

let endpoint =
  "https://pokeapi.co/api/v2/pokemon?limit=" +
  `${limit}` +
  "&offset=" +
  `${offset}`;

btn_siguiente.addEventListener("click", (evento) => {
  //aviso.textContent = "Cargando...";
  //document.body?.append(aviso);
  offset = offset + 10;
  endpoint =
    "https://pokeapi.co/api/v2/pokemon?limit=" +
    `${limit}` +
    "&offset=" +
    `${offset}`;
  peticionScrollable(endpoint);
});

function peticionScrollable() {
  console.log("Peticion scrollable");

  let fetchData = async (endpoint) => {
    try {
      let response = await fetch(endpoint);

      if (!response.ok) {
        //vaciarElementos();

        if (response.status === 404) {
          aviso.textContent = `Pokemon no encontrado : ${response.status}`;
        } else {
          aviso.textContent = `Error de red: ${response.status}`;
        }
        return;
      }



        console.log("Peticion scrollable");
            let data = await response.json();

      for (let pokemonBasico of data.results) {
      
        let subDatosPokemonJson = await fetch(pokemonBasico.url); //El enlace

        let pokemon = await subDatosPokemonJson.json();



        let alturaCorrecta = pokemon.height / 10;
        let pesoCorrecto = pokemon.weight / 10;

        const carta = document.createElement("div");
        carta.setAttribute("id", "card");

        const imgElement = document.createElement("img");
        imgElement.id = "image";
        imgElement.src = pokemon.sprites.other.dream_world.front_default;
        imgElement.alt = "pokemon";

        const nameElement = document.createElement("h1");
        nameElement.id = "name";
        nameElement.textContent = `${pokemon.name}`;

        const numberElement = document.createElement("h3");
        numberElement.id = "number";

        numberElement.textContent = `#${pokemon.id}`;

        const alturaElement = document.createElement("h3");
        alturaElement.id = "altura";
        alturaElement.textContent = alturaCorrecta + "m";

        const pesoElement = document.createElement("h3");
        pesoElement.id = "peso";
        pesoElement.textContent = pesoCorrecto + "kg";

        carta.append(
          imgElement,
          nameElement,
          numberElement,
          alturaElement,
          pesoElement,
        );

        pokemon.types.forEach((element) => {
          let newButton = document.createElement("button");
          newButton.classList.add(element.type.name);
          newButton.innerText = element.type.name;
          carta.appendChild(newButton);
        });

        document.body?.append(carta);

       
      };
    
    

      aviso.textContent = "";
    } catch (error) {
      console.error(error);
      //vaciarElementos();
      aviso.textContent = "Fallo de red.";
    }
  };

  fetchData(endpoint);
}

function getPokemon() {
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
      botonesViejos.forEach((boton) => boton.remove());

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
}

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
