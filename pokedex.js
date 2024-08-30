const pokemonCount = 151;
var pokedex = {};


window.onload = async function() {
    const searchInput = document.getElementById("pokemon-search");

    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        
        let pokemon = document.createElement("div");
        pokemon.id =  i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);

            pokemon.addEventListener("click", () =>{
             

                document.querySelector(".special")?.classList.remove("special")
                pokemon.classList.add("special");
                
                let name = document.getElementById("pokemonName");
                while(name.value){
                    name.removeChild()
                }
                name.innerText =  i.toString() + ". " + pokedex[i]["name"].toUpperCase();
            });
    }
    const checkUserInput = () => {
        if(!searchInput.value || searchInput === ""){
            alert("Please enter Pokemon");
            return;
        }
        console.log(searchInput.value);
    }

    searchInput.addEventListener("keyup", e => {
        let currentValue = e.target.value.toUpperCase();
        let pokemons = document.querySelectorAll('.pokemon-name');
        pokemons.forEach(pokemon => {
            let pokemonName = pokemon.innerText.slice(3);
            console.log(pokemon)
            if (pokemonName.textContent.toUpperCase().includes(currentValue)) {
                pokemon.parentNode.style.display = 'block';
            } else{
                pokemon.parentNode.style.display = 'none';
            }
        });
    });
}

   


async function getPokemon(num) {
    let url ="https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let response = await fetch(url);
    let pokemon = await response.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    response = await fetch(pokemon["species"]["url"]);
    let description = await response.json();

    description = description["flavor_text_entries"][9]["flavor_text"];
    
    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types": pokemonType, "description" : description};
}

function updatePokemon() {
    // update image
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
   
    // update types
    let typesDiv = document.getElementById("pokemon-types");
    //clears type array
    while (typesDiv.firstChild){
        typesDiv.firstChild.remove();
    }
    let types = pokedex[this.id]["types"];
    for (let i = 0; i< types.length; i++){
        let type = document.createElement("span")
        type.innerText = types[i]["type"]["name"].toUpperCase();
        console.log(type.value)
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]) //adds bg color and font
        typesDiv.append(type);
    }

    document.getElementById("pokemon-description").innerText = pokedex[this.id]["description"]
}

