import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../../app/hooks';
import { changeItemQuantity, removeItemFromCart } from './cartSlice';

type CartItemProp = {
  id: number;
  quantity: number;
  name: string;
  weight: number;
};
const CartItem = ({ item }: { item: CartItemProp }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useAppDispatch();

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    dispatch(changeItemQuantity({ itemId: item.id, newQuantity: value }));
  };

  const handleRemoveItem = () => {
    Alert.alert("remove item");
    dispatch(removeItemFromCart(item.id));
  }
  return (
    <View style={styles.item}>
      <Text>Name: {item.name}</Text>
      <View style={styles.quantity}>
        <Picker
          style={styles.picker}
          mode='dropdown'
          selectedValue={quantity}
          onValueChange={(itemValue: number) =>
            handleQuantityChange(itemValue)
          }>
          {[...Array(10)].map((_, index) => (
            <Picker.Item
              key={index + 1}
              label={(index + 1).toString()}
              value={index + 1}
            />
          ))}
        </Picker>

        <TouchableOpacity style={styles.removeButton} onPress={handleRemoveItem}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>

      <Text>Weight: {item.weight} kg</Text>
      <Text>Unit Price: ${item.weight.toFixed(2)}</Text>
      <Text>Sub-price: ${(item.weight * item.quantity).toFixed(2)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  picker: {
    flex: 2,
  },
  removeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#C70000',
    alignItems: 'center',
  },
  removeText:{
    color: 'white'
  }
});

export default CartItem;
