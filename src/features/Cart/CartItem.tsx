import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch } from '../../app/hooks';
import {
    CartItemType,
    changeItemQuantity,
    removeItemFromCart,
} from './cartSlice';

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const handleQuantityChange = (value: number) => {
    dispatch(
      changeItemQuantity({ itemId: cartItem.item.id, newQuantity: value }),
    );
  };

  const handleRemoveItem = () => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${cartItem.item.name} from the cart?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => dispatch(removeItemFromCart(cartItem.item.id)),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
        
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PokemonDetails', {
            details: cartItem.item,
          })
        }>
        <Image source={{ uri: cartItem.item.icon }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{cartItem.item.name}</Text>
        <View style={styles.quantity}>
          <Picker
            style={styles.picker}
            mode="dropdown"
            selectedValue={cartItem.quantity}
            onValueChange={(itemValue: number) =>
              handleQuantityChange(itemValue)
            }>
            {[...Array(10)].map((_, index) => (
              <Picker.Item
                style={{ backgroundColor: 'white', borderRadius: 10 }}
                key={index + 1}
                label={(index + 1).toString()}
                value={index + 1}
              />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemoveItem}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.weight}>Weight: {cartItem.item.weight} kg</Text>
        <Text style={styles.unitPrice}>
          Unit Price: ${cartItem.item.weight.toFixed(2)}
        </Text>
        <Text style={styles.subPrice}>
          Sub-price: ${(cartItem.item.weight * cartItem.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
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
    padding: 8,
  },
  removeText: {
    color: 'white',
  },
  weight: {
    marginBottom: 5,
  },
  unitPrice: {
    marginBottom: 5,
  },
  subPrice: {
    marginBottom: 5,
  },
});

export default CartItem;
