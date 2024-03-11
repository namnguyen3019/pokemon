import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text } from 'react-native';
import PokemonItem from './PokemonItem';
import { useLazyGetPokemonsQuery } from './pokemonsSlice';

const PokemonList = () => {
  const flatListRef = React.useRef(null);

  const toTop = () => {
    // use current
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };
  const offset = useRef(0);
  const [limit, setLimit] = useState(100);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [
    fetchPokemons,
    { status, currentData, data, isFetching, isLoading, isError },
  ] = useLazyGetPokemonsQuery();

  const fetchFirstPage = async () => {
    if (isFetching) return;
    await fetchPokemons({ offset: 0, limit });
  };
  const fetchMorePokemons = async () => {
    setIsLoadingMore(true);
    offset.current += limit;
    await fetchPokemons({ offset: offset.current, limit });
    setIsLoadingMore(false);
  };

  const fetchPrevPage = async () => {
    if (offset.current >= limit) {
      offset.current -= limit;
      await fetchPokemons({ offset: offset.current, limit });
      toTop();
    }
  };
  const renderFooter = () => {
    return isLoadingMore ? (
      <Text style={{ textAlign: 'center' }}>Loading more...</Text>
    ) : null;
  };

  useEffect(() => {
    fetchFirstPage();
  }, []);

  if (isLoading) {
    return <Text>Loading..</Text>;
  }
  if (isError) {
    return <Text>Something went wrong</Text>;
  }
  let content = data?.ids.map(pokemonId => data.entities[pokemonId]);
  return (
    <FlatList
      ref={flatListRef}
      data={content}
      renderItem={item => <PokemonItem details={item.item} />}
      numColumns={2}
      keyExtractor={(item: any) => item?.id.toString()}
      refreshing={false}
      onRefresh={fetchPrevPage}
      onEndReached={fetchMorePokemons}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default PokemonList;
