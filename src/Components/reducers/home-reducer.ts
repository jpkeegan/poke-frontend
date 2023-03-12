import { Pokemon } from "../requests/poke-requests";

export type PokeForm = {
    name: string,
    type1: string,
    type2?: string,
    sprite: string
};

export type PokeState = {
    pokeList: Pokemon[],
    pokeForm: PokeForm,
    showModal: boolean
};

export type Action = 
    | {type: 'setPokeList'; payload: Pokemon[]}
    | {type: 'setPokeForm'; payload: PokeForm}
    | {type: 'resetPokeForm'}
    | {type: 'setShowModal'; payload: boolean};

export const initialState: PokeState = {
    pokeList: [],
    pokeForm:{
        name: '',
        type1: '',
        type2: '',
        sprite: ''
    },
    showModal: false
};

export function pokeHomeReducer(state: PokeState, action: Action): PokeState{
    const newState: PokeState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case 'setPokeList':
            return {...state, pokeList: action.payload};

        case 'setPokeForm':
            return {...state, pokeForm: action.payload};

        case 'resetPokeForm':
            return {...state, pokeForm:{name: '',type1: '',type2: '',sprite: ''}}

        case 'setShowModal':
            return {...state, showModal: action.payload};

        default:
            return state;
    }   
}