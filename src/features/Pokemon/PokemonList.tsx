import React from 'react';
import { FlatList, Text } from 'react-native';
import PokemonItem from './PokemonItem';
import { useGetPokemonsQuery } from './pokemonsSlice';

const PokemonList = () => {
  const {
    currentData: data,
    isLoading,
    isError
  } = useGetPokemonsQuery('getPokemons');

  console.log(data);
  if (isLoading) {
    return <Text>Loading..</Text>;
  }
  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  let  content = data?.ids.map(pokemonId => data.entities[pokemonId]);

  return (
    <FlatList
      data={content}
      renderItem={item => <PokemonItem details={item.item} />}
      numColumns={2}
      keyExtractor={item => item.name}
    />
  );
};

export default PokemonList;
