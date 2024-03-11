import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import CartItem from './CartItem';
import { selectTotalPrice } from './cartSlice';

const Cart = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={({item}) => <CartItem cartItem={item}/>}
          keyExtractor={cartItem => cartItem.item.id.toString()}
          style={styles.flatList}
        />
      )}
      <Text style={styles.totalPrice}>
        Total Price: ${totalPrice.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flatList: {
    flexGrow: 0,
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
