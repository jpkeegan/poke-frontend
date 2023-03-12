import { Pokemon } from "../requests/poke-requests";

export type PokeDetailsState = {
    pokemon: Pokemon | null;
    showUpdateModal: boolean;
    name: string,
    type1: string,
    type2: string,
    sprite: string
};

export type Action =
  | { type: 'setPokemon'; payload: Pokemon }
  | { type: 'setPokemonName'; payload: string }
  | { type: 'setPokemonType1'; payload: string }
  | { type: 'setPokemonType2'; payload: string }
  | { type: 'setPokemonSprite'; payload: string }
  | {type: 'setShowUpdateModal'; payload: boolean};

export const initialState: PokeDetailsState = {
    pokemon: null,
    showUpdateModal: false,
    name: '',
    type1: '',
    type2: '',
    sprite: '',
  };
  
export function pokeDetailsReducer(state: PokeDetailsState, action: Action): PokeDetailsState{
    const newState: PokeDetailsState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
      case 'setPokemon':
        const pokemon = action.payload;
        return { ...state, pokemon: { ...state.pokemon, ...pokemon } };

      case 'setPokemonName':
        return { ...state, name: action.payload };

      case 'setPokemonType1':
        return { ...state, type1: action.payload };

      case 'setPokemonType2':
        return { ...state, type2: action.payload };

      case 'setPokemonSprite':
        return { ...state, sprite: action.payload };

      case 'setShowUpdateModal':
        return {...state, showUpdateModal: action.payload};

      default:
        return state;
    }
  };