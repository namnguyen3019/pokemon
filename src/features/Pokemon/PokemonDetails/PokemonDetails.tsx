import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch } from '../../../app/hooks';
import { addItemToCart } from '../../Cart/cartSlice';

const PokemonDetails = ({route}) => {
  const { id, name, icon, weight } = route.params.details;
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addItemToCart({ id, name, weight, icon }));
  };

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth/4*3 - 15;
  return (
    <View style={[styles.container, { width: itemWidth }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: icon }}
          style={[
            styles.image,
            { width: itemWidth, height: itemWidth },
          ]}
        />
      </View>
      <Text style={styles.name}>Name: {name}</Text>
      <Text style={styles.name}>Weight: {weight}</Text>
      <Text style={styles.name}>Price: ${weight}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}>
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
    alignSelf: "center"
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
  viewMore: {
    backgroundColor: '#ffbd03',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  viewMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PokemonDetails;
