import { useEffect, useReducer, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { initialState, pokeDetailsReducer } from "../reducers/poke-reducer";
import { delPokemon, getById, Pokemon, updatePokemon } from "../requests/poke-requests";
import "../styles/details-styles.css";

export type UpdateForm = {
  name: string,
  type1: string,
  type2?: string,
  sprite: string
}; 

export function PokeDetailsPage(){
    const {id} = useParams<{id: string}>();
    const [state, dispatch] = useReducer(pokeDetailsReducer, initialState);

    const [form, setForm] = useState<UpdateForm>({
      name: "",
      type1: "",
      type2: "",
      sprite: ""
    });

    const queryClient = useQueryClient();

    const loadPokemon = async () => {
        const pokemon = await getById(parseInt(id!));
        dispatch({type: 'setPokemon', payload: pokemon});
    };

    useEffect(()=>{
        loadPokemon();
    },[]);

    function handleUpdatePokemon(){
        const updatedPokemon = {
          id : parseInt(id!),
          name: form.name,
          type1: form.type1,
          type2: form.type2,
          sprite: form.sprite
        }
        dispatch({ type: 'setPokemon', payload: updatedPokemon });
        updatePokemon(parseInt(id!), updatedPokemon);
        alert("Pokemon Updated!");
        queryClient.invalidateQueries("pokeCache");
    };
    
    const handleDeletePokemon = async () => {
        await delPokemon(state.pokemon?.id ?? 1);
        window.location.href = '/';
    };

    return (
      <div className="poke-details">
        {state.showUpdateModal && (
          <div className="modal">
            <div className="modal-content">
              <form onSubmit={handleUpdatePokemon}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(e)=> setForm({...form, name: e.target.value})}
                />
    
                <label htmlFor="type1">Type 1:</label>
                <input
                  type="text"
                  id="type1"
                  name="type1"
                  value={form.type1}
                  onChange={(e)=> setForm({...form, type1: e.target.value})}
                />
    
                <label htmlFor="type2">Type 2:</label>
                <input
                  type="text"
                  id="type2"
                  name="type2"
                  value={form.type2}
                  onChange={(e)=> setForm({...form, type2: e.target.value})}
                />
    
                <label htmlFor="sprite">Sprite:</label>
                <input
                  type="text"
                  id="sprite"
                  name="sprite"
                  value={form.sprite}
                  onChange={(e)=> setForm({...form, sprite: e.target.value})}
                />
    
                <button type="submit">Update Pokemon</button>
                <button onClick={() => dispatch({ type: 'setShowUpdateModal', payload: false })}>x</button>
              </form>
            </div>
          </div>
        )}
    
        {state.pokemon ? (
          <div className="poke-details-container">
            <div className="poke-details-header">
              <h2>{state.pokemon.name}</h2>
              <img src={state.pokemon.sprite} alt={`${state.pokemon.name} sprite`} />
            </div>
    
            <div className="poke-details-types">
              <div className={`type type-${state.pokemon.type1.toLowerCase()}`}>
                {state.pokemon.type1}
              </div>
              {state.pokemon.type2 && (
                <div className={`type type-${state.pokemon.type2.toLowerCase()}`}>
                  {state.pokemon.type2}
                </div>
              )}
            </div>
    
            <div className="poke-details-body">
              <button onClick={() => dispatch({ type: 'setShowUpdateModal', payload: true })}>
                Update Pokemon
              </button>
              <button onClick={handleDeletePokemon}>Delete Pokemon</button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
    
};

