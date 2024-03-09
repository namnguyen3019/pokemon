import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PokemonItem = (props: any) => {
  const { name, icon } = props.details;

  const handleAddToCart = () => {
    // Implement your add to cart logic here
  };

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 2 - 15;
  return (
    <View style={[styles.container, { width: itemWidth }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: icon }} style={[styles.image, { width: itemWidth - 20, height: itemWidth - 20 }]} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PokemonItem;
