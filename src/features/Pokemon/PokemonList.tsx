import React, { useState } from 'react';
import { FlatList, Text } from 'react-native';
import PokemonItem from './PokemonItem';
import { useGetPokemonsQuery } from './pokemonsSlice';

const PokemonList = () => {

  const [offset, setOffSet] = useState(0);
  const [limit, setLimit] = useState(20);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    currentData: data,
    isLoading,
    isError,
    refetch: refetchPokemons
  } = useGetPokemonsQuery('getPokemons', {offset, limit});


  if (isLoading) {
    return <Text>Loading..</Text>;
  }
  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  const fetchMorePokemons = async () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      
    }
  };
  const renderFooter = () => {
    return isLoadingMore ? <Text style={{textAlign:'center'}}>Loading more...</Text> : null;
  };

  let  content = data?.ids.map(pokemonId => data.entities[pokemonId]);

  return (
    <FlatList
      data={content}
      renderItem={item => <PokemonItem details={item.item} />}
      numColumns={2}
      keyExtractor={(item:any)=> item?.id.toString()}
      onEndReached={fetchMorePokemons}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter}
    />
  );
};

export default PokemonList;
