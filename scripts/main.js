const list = document.querySelector("main");
var pokemonID = list.getAttribute("pokemonID");
var origin = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(origin + i)
        .then((response) => response.json())
        .then(poke => mostrarPokemon(poke))
}

function mostrarPokemon(poke) {
    let id = poke.id.toString().padStart(4, "0");
    let nombre = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
    let imagen = poke.sprites.other["official-artwork"].front_default;
    let tipos = poke.types;

    if (pokemonID === "" || pokemonID == poke.id) {
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

        if (valor) {
            if (!isNaN(valor)) {
                pokemonID = valor;
                list.innerHTML = "";  // Limpiar la lista antes de mostrar el resultado de la búsqueda
                fetch(origin + valor)
                    .then((response) => {
                        if (!response.ok) {
                            list.innerHTML += `
                            <article>
                                <img src="https://wiki.p-insurgence.com/images/0/09/722.png" alt="Pokemon Not Found" loading="lazy">
                                <p class="id-back">#????</p>
                                <header>
                                    <h1>#????</h1>
                                    <h2>Missing No</h2>
                                </header>
                                </section>
                            </article>
                        `;
                        }
                        return response.json();
                    })
                    .then(poke => mostrarPokemon(poke))
                    .catch(error => alert(error.message));
            }
        }
    }
}