import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { selectTotalPrice } from './cartSlice';

const Cart = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <View style={styles.container}>
      {items.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>Name: {item.name}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Weight: {item.weight} kg</Text>
          <Text>Unit Price: ${item.weight}</Text>
          <Text>Sub-price: ${item.weight*item.quantity}</Text> 
        </View>
      ))}
      <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
