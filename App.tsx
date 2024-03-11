import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Header from './src/components/Header';
import Cart from './src/features/Cart/Cart';
import PokemonDetails from './src/features/Pokemon/PokemonDetails/PokemonDetails';
import PokemonList from './src/features/Pokemon/PokemonList';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name={"Home"}
          component={PokemonList}
          options={{ headerTitle: props => <Header {...props} /> }}
        />
         <Stack.Screen name={"PokemonDetails"} component={PokemonDetails} />
        <Stack.Screen name={"Cart"} component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
