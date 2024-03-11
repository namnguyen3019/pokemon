import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiSlice } from '../../api/apiSlice';

export interface Pokemon {
  id: number;
  name: string;
  icon: string;
  weight: number;
}

const pokemonsAdapter = createEntityAdapter<Pokemon>({
  selectId: (a: Pokemon) => a.id,
});

const initialState = pokemonsAdapter.getInitialState();

async function getPokemonDetails(url: string): Promise<Pokemon> {
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
  endpoints: (builder) => ({
    getPokemons: builder.query<EntityState<Pokemon>, { offset: number; limit: number }>({
      query: ({ offset, limit }) => `/?offset=${offset}&limit=${limit}`,
      transformResponse: async (responseData: any) => {
        const results = responseData.results;

        const pokemons = await Promise.all(
          results.map(async (pokemon:any) => {
            try {
              const pokemonDetails = await getPokemonDetails(pokemon.url);
              return pokemonDetails;
            } catch (error) {
              return null;
            }
          })
        );

        // Filter out any null values (failed requests)
        const filteredPokemons = pokemons.filter((pokemon) => pokemon !== null);
        return pokemonsAdapter.addMany(initialState, filteredPokemons);
      }
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonsApiSlice;
