import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

function Header() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.title}>Poke Store</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.buttonText}>Go To Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  title: {
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff9900',
    
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Header;
