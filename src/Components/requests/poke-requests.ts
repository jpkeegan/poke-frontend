import { PokeForm } from "../reducers/home-reducer";

const url = "http://127.0.0.1:8080";

export type Pokemon = {
    id: number,
    name: string,
    type1: string,
    type2?: string,
    sprite: string
};

export const getAll = async (): Promise<Pokemon[]> =>{
    const response = await fetch(`${url}/pokemon`);
    const pokemon = await response.json();
    return pokemon;
};

export const getById = async(id: number): Promise<Pokemon> => {
    const response = await fetch(`${url}/pokemon/${id}`);
    const pokemon = await response.json();
    return pokemon;
};

export const addPokemon = async(pokemon: Omit<Pokemon, 'id'>): Promise<Pokemon> =>{
    const response = await fetch(`${url}/pokemon`, {
        method: 'POST', headers: { "Content-Type": "application/json"}, body: JSON.stringify(pokemon)});
    const newPokemon = await response.json();
    return newPokemon;
};

export const updatePokemon = async(id: number, pokemon: Partial<Pokemon>): Promise<Pokemon> => {
    const response = await fetch(`${url}/pokemon/${id}`, {
        method: 'PUT', headers: { "Content-Type": "application/json"}, body: JSON.stringify(pokemon)});
    const updatedPokemon = await response.json();
    return updatedPokemon;
};

export const delPokemon = async(id:number): Promise<boolean> => {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE', headers: { "Content-Type": "application/json"}});
    return response.ok;
};



