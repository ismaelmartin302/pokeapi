const list = document.querySelector("main");
var pokemonID = list.getAttribute("pokemonID");
var origin = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(origin + i)
        .then((response) => response.json())
        .then(poke => mostrarPokemon(poke))
}

function mostrarPokemon(poke) {
    
    if (pokemonID == "") {
        let id = poke.id.toString().padStart(4, "0");
        let nombre = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
        let imagen = poke.sprites.other["official-artwork"].front_default;
        let tipos = poke.types;

        console.log(tipos)
        list.innerHTML += `
            <article>
                <img src="${imagen}" alt="${nombre}" loading="lazy">
                <p class="id-back">#${id}</p>
                <header>
                    <h1>#${id}</h1>
                    <h2>${nombre}</h2>
                </header>
                <section id="tipos_${id}">
                </section>
            </article>
        `;
        let tipos_lista = document.getElementById(`tipos_${id}`)
        tipos.forEach(tipo => {
            tipo = tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.slice(1);
            tipos_lista.innerHTML += `<p class="${tipo}">${tipo}</p>`;
        })
    } else if (pokemonID == poke.id) {
        let id = poke.id.toString().padStart(4, "0");
        let nombre = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
        let imagen = poke.sprites.other["official-artwork"].front_default;
        let tipos = poke.types;

        console.log(tipos)
        list.innerHTML += `
            <article>
                <img src="${imagen}" alt="${nombre}" loading="lazy">
                <p class="id-back">#${id}</p>
                <header>
                    <h1>#${id}</h1>
                    <h2>${nombre}</h2>
                </header>
                <section id="tipos_${id}">
                </section>
            </article>
        `;
        let tipos_lista = document.getElementById(`tipos_${id}`)
        tipos.forEach(tipo => {
            tipo = tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.slice(1);
            tipos_lista.innerHTML += `<p class="${tipo}">${tipo}</p>`;
        })
    }
}


function buscar(event) {
    if (event.key === 'Enter') {
        let input = document.querySelector("input");
        let valor = input.value;
        input.value = "";

        alert(valor);
        pokemonID = valor;
    }
}