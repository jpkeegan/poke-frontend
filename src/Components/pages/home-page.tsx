import { useEffect, useReducer } from "react";
import { initialState, pokeHomeReducer } from "../reducers/home-reducer";
import { addPokemon, getAll, Pokemon } from "../requests/poke-requests";
import "../styles/homeStyles.css";

export function HomePage() {
  const [state, dispatch] = useReducer(pokeHomeReducer, initialState);

  const getPokedex = async (): Promise<Pokemon[]> => {
    const pokemonList = await getAll();
    return pokemonList.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
  };

  useEffect(() => {
    async function fetchData() {
      const pokedex = await getPokedex();
      dispatch({ type: "setPokeList", payload: pokedex });
    }
    fetchData();
  }, []);

  function handlePokeFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "setPokeForm",
      payload: { ...state.pokeForm, [e.target.name]: e.target.value },
    });
  }

  async function handleAddPokemon(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const newPokemon = await addPokemon(state.pokeForm);
    dispatch({type: 'resetPokeForm'});
    dispatch({type: "setShowModal", payload: false});
    dispatch({type: "setPokeList", payload: [...state.pokeList, newPokemon]});    
};

  function handlePokeClick(pokemon: Pokemon) {
    window.location.href = `/pokemon/${pokemon.id}`;
  }

  return (
    <>
      <h1>PokeDex</h1>

      <button onClick={() => dispatch({ type: "setShowModal", payload: true })}>
        Discover a New Pokemon?
      </button>
      {state.showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleAddPokemon}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={state.pokeForm.name}
                onChange={handlePokeFormChange}
              />

              <label htmlFor="type1">Type 1:</label>
              <input
                type="text"
                id="type1"
                name="type1"
                value={state.pokeForm.type1}
                onChange={handlePokeFormChange}
              />

              <label htmlFor="type2">Type 2:</label>
              <input
                type="text"
                id="type2"
                name="type2"
                value={state.pokeForm.type2}
                onChange={handlePokeFormChange}
              />

              <label htmlFor="sprite">Sprite:</label>
              <input
                type="text"
                id="sprite"
                name="sprite"
                value={state.pokeForm.sprite}
                onChange={handlePokeFormChange}
              />

              <button type="submit">Add Pokemon</button>
              <button onClick={() => dispatch({ type: "setShowModal", payload: false })}>x</button>
            </form>
          </div>
        </div>
      )}

      <div className="poke-container">
        {state.pokeList.map((pokemon) => (
          <div className="pokemon" key={pokemon.id} onClick={() => handlePokeClick(pokemon)}>
            <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
