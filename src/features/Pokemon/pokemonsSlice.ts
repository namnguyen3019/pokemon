import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { BASE_URL } from "../../constants";

// Create Adapter For pokemons To Avoid Duplicates
const pokemonsAdapter = createEntityAdapter({
  selectId: (pokemon) => pokemon.id,
});

// I used this api because i couldnt find a better one.
const API_ENDPOINT = BASE_URL;
async function getPokemonDetails(url: string) {
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
const pokemonsApi = createApi({
  reducerPath: "pokemons",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT}`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchPokemons: build.query({
      keepUnusedDataFor: 600, // Keep unused for longer,
      query: (page) => {
        return `pokemon?offset=${(page-1)*20}&limit=20`;
      },
      transformResponse: async (response: any) => {
        const results = response.results;

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
        return pokemonsAdapter.addMany(
          pokemonsAdapter.getInitialState({
            hasMorePages: true,
          }),
          filteredPokemons
        );
      },
      async onQueryStarted(page, { queryFulfilled, dispatch }) {
        if (!page) {
          return;
        }
        const { data, error } = await queryFulfilled;

        if (data) {
          // Add pokemons On Current Request To Page 1
          dispatch(
            pokemonsApi.util.updateQueryData("fetchPokemons", 1, (draft) => {
              pokemonsAdapter.addMany(draft, pokemonsSelectors.selectAll(data));
              draft.hasMorePages;
            })
          );

          if (page > 1) {
            // Remove Cached Data From State Since We Already Added It To Page 1
            dispatch(
              pokemonsApi.util.updateQueryData("fetchPokemons", page, (draft) => {
                draft = pokemonsAdapter.getInitialState();
              })
            );
          }
        }
      },
    }),
  }),
});

export const { useLazyFetchPokemonsQuery } = pokemonsApi;

export default pokemonsApi;

const pokemonsSelectors = pokemonsAdapter.getSelectors((state) => state);

export { pokemonsAdapter, pokemonsSelectors };

