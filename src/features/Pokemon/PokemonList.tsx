import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import PokemonItem from './PokemonItem';
import pokemonsApi, { pokemonsAdapter, pokemonsSelectors, useLazyFetchPokemonsQuery } from './pokemonsSlice';

const PokemonList = () => {

  const currentPage = useRef(1);

  const [fetchPokemons, { isFetching }] =
  useLazyFetchPokemonsQuery();

  // Listen For Posts Updates Page 1
  const { pokemons, hasMorePages } =
    pokemonsApi.endpoints.fetchPokemons.useQueryState(1, {
      selectFromResult: (result) => {
        return {
          hasMorePages: result.data?.hasMorePages,
          pokemons: pokemonsSelectors.selectAll(
              result.data ?? pokemonsAdapter.getInitialState()
            ),
        };
      },
    });
  
  const fetchFirstPage = async () => {
    await fetchPokemons(1);
  };

  const fetchMorePokemons= async () => {
    if(!hasMorePages || isFetching) return;
    currentPage.current += 1;
    await fetchPokemons(currentPage.current);
  };
  
  useEffect(() => {
    // Fetch First Page On Init
    fetchFirstPage()
  }, [])

  console.log(pokemons);

  return (
    <FlatList
      data={pokemons}
      renderItem={item => <PokemonItem details={item.item} />}
      numColumns={2}
      keyExtractor={(item: any) => item?.id.toString()}
      refreshing={false}
      onEndReached={fetchMorePokemons}
      onEndReachedThreshold={0.8}
    />
  );
};

export default PokemonList;
