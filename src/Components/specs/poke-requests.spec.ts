import { getAll, addPokemon, updatePokemon, delPokemon ,getById, Pokemon } from '../requests/poke-requests';

describe('Pokemon API requests', () => {

    test('fetchAllPokemon returns an array of Pokemon', async () => {
        const pokemon = await getAll();
        expect(Array.isArray(pokemon)).toBe(true);
        expect(pokemon.length).toBeGreaterThan(0);
    });

  test('getById returns a single Pokemon object', async () => {
    const pokemon = await getById(1);
    expect(typeof pokemon).toBe('object');
    expect(pokemon.id).toBe(1);
    expect(pokemon.name).toBeDefined();
    expect(pokemon.type1).toBeDefined();
    expect(pokemon.sprite).toBeDefined();
  });

  test('addPokemon creates a new Pokemon', async () => {
    const newPokemonData = {
      name: 'Bulbasaur',
      type1: 'Grass',
      type2: 'Poison',
      sprite: 'https://example.com/bulbasaur.png',
    };
    const newPokemon = await addPokemon(newPokemonData);
    expect(newPokemon.id).toBeDefined();
    expect(newPokemon.name).toBe(newPokemonData.name);
    expect(newPokemon.type1).toBe(newPokemonData.type1);
    expect(newPokemon.type2).toBe(newPokemonData.type2);
    expect(newPokemon.sprite).toBe(newPokemonData.sprite);
    await delPokemon(newPokemon.id);
  });

  test('updatePokemon updates an existing Pokemon', async () => {
    const testPokemonData = {
        name: 'Bulbasaur',
        type1: 'Grass',
        type2: 'Poison',
        sprite: 'https://example.com/bulbasaur.png',
      };
    const testPokemon = await addPokemon(testPokemonData);
    const updatedPokemonData = {
      name: 'Testmon Updated',
      type1: 'Updated',
      type2: 'Updated',
      sprite: 'Updated'
    };
    const updatedPokemon = await updatePokemon(testPokemon.id, updatedPokemonData);
    expect(updatedPokemon.name).toBe(updatedPokemonData.name);
    expect(updatedPokemon.type2).toBe(updatedPokemonData.type2);
    await delPokemon(testPokemon.id);
  });

  test('deletePokemon deletes an existing Pokemon', async () => {
    const testPokemonData = {
        name: 'Bulbasaur',
        type1: 'Grass',
        type2: 'Poison',
        sprite: 'https://example.com/bulbasaur.png',
      };
    const testPokemon = await addPokemon(testPokemonData);
    const deleted = await delPokemon(testPokemon.id);
    expect(deleted).toBe(true);
    try{
    await getById(testPokemon.id);
    } catch(error: unknown){
        expect((error as {status: number}).status).tobe(404);
    }
  });
});