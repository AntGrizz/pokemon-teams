//solution goes here
document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  fetchPokemon();
}
function fetchPokemon() {
  fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(json => json.forEach(trainer => renderTrainers(trainer)));
}

function renderTrainers(trainer) {
  let main = document.querySelector('main');
  let trainerCard = document.createElement('div');
  let addPokemonBtn = document.createElement('button');
  let pokemonUl = document.createElement('ul');

  trainerCard.dataset.nameId = trainer.id;
  addPokemonBtn.dataset.buttonid = trainer.id;
  pokemonUl.dataset.ulId = trainer.id;

  addPokemonBtn.addEventListener('click', trainer => {
    console.log(trainer);
  });

  trainerCard.classList = 'card';
  trainerCard.innerHTML = `<p>${trainer.name}</p> <button data-button-Id="${
    trainer.id
  }">Add Pokemon</button>`;

  trainer.pokemons.forEach(pokemon => {
    pokemonUl.innerHTML += `<li id="${pokemon.id}"> ${pokemon.nickname} (${
      pokemon.species
    }) <button class="release">Release</button></li>`;
  });

  trainerCard.append(pokemonUl);
  main.appendChild(trainerCard);
  addPokemonEventListener(trainer);
}

function addPokemonEventListener(trainer) {
  trainer.pokemons.forEach(pokemon => {
    let releasePokemon = document.getElementById(pokemon.id);
    releasePokemon.addEventListener('click', pokemon => {
      deletePokemon(releasePokemon);
    });
  });
}

function deletePokemon(releasePokemon) {
  debugger;
  releasePokemon.remove();
  fetch(`http://localhost:3000/pokemons/${releasePokemon.id}`);
}
