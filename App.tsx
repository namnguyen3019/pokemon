/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the Redux TypeScript template
 * https://github.com/rahsheen/react-native-template-redux-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import PokemonList from './src/features/Pokemon/PokemonList';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <SafeAreaView>
      <Text>Poke-Store</Text>
      <PokemonList />
    </SafeAreaView>
  );
};

export default App;
