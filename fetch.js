const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
};

const displayPokemon = (pokemon) => {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nueva tarjeta

    if (pokemon) {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>ID: ${pokemon.id}</p>
            <p>Weight: ${pokemon.weight} hectograms</p>
        `;

        pokemonContainer.appendChild(card);
    }
};

document.getElementById('get-btn').addEventListener('click', async () => {
    const text = document.getElementById('poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    if (pokemon) {
        localStorage.setItem('currentPokeId', pokemon.id);
        displayPokemon(pokemon);
    } else {
        console.error('No se encontró el Pokémon.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    if (pokemon) {
        displayPokemon(pokemon);
    }
});

document.getElementById('previous-btn').addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId - 1);
    const pokemon = await fetchPokemon(newId);
    if (pokemon) {
        localStorage.setItem('currentPokeId', pokemon.id);
        displayPokemon(pokemon);
    }
});

document.getElementById('next-btn').addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = currentPokeId + 1;
    const pokemon = await fetchPokemon(newId);
    if (pokemon) {
        localStorage.setItem('currentPokeId', pokemon.id);
        displayPokemon(pokemon);
    }
});
