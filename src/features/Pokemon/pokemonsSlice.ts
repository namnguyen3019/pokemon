import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiSlice } from '../../api/apiSlice';

interface Pokemon {
  id: number;
  name: string;
  icon: string;
  weight: number;
}

interface PokemonListState {
  pokemons: Pokemon[];
}

const pokemonsAdapter = createEntityAdapter<Pokemon>({
  selectId: (a: Pokemon) => a.id,
});

const initialState: EntityState<Pokemon> = pokemonsAdapter.getInitialState();

async function getPokemonDetails(url: string){
  try {
    const { data } = await axios.get(url);
    const weight = data.weight;
    const icon = data.sprites.front_default;
    const id = data.id;
    return { id, weight, icon, name: data.name };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const pokemonsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPokemons: builder.query<EntityState<Pokemon>, void>({
      query: () => '/',
      transformResponse: async responseData => {
        const results = responseData.results;

        const pokemons = await Promise.all(
          results.map(async pokemon => {
            try {
              const pokemonDetails = await getPokemonDetails(pokemon.url);
              return pokemonDetails;
            } catch (error) {
              console.error(error);
              return null;
            }
          }),
        );

        // Filter out any null values (failed requests)
        const filteredPokemons = pokemons.filter(pokemon => pokemon !== null);
        return pokemonsAdapter.setAll(initialState, filteredPokemons);
      },
      providesTags: (result, error, arg) => [
        { type: 'Pokemon', id: "LIST" },
        ...result?.ids.map(id => ({ type: 'Pokemon', id }))
    ]
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonsApiSlice;
