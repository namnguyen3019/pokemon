import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Pokemon {
  id: number;
  name: string;
  icon: string;
  weight: number;
  price: number | null;
}

interface PokemonListState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
}

const initialState: PokemonListState = {
  pokemons: [{
    'id': 1,
    "name": "pikachu",
    "icon": "abc.com",
    "weight": 100,
    "price": null
  }],
  selectedPokemon: null,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {

  },
});

export const selectAllPokemons = (state: RootState) => state.pokemons.pokemons;
export const selectSelectedPokemon = (state: RootState) => state.pokemons.selectedPokemon;

export default pokemonSlice.reducer;
