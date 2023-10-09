import React from 'react';
import {CartItem} from '../types';
import {StyleSheet, View, Text, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useAppDispatch} from '../hooks';
import {changeQuantity} from '../store/cartSlice';

interface CartListItemProps {
  cartItem: CartItem;
}
const CardListItem = ({cartItem}: CartListItemProps) => {
  const dispatch = useAppDispatch();

  const onMinus = () => {
    dispatch(
      changeQuantity({
        productId: cartItem.product.id || '',
        amount: -1,
      }),
    );
  };

  const onPlus = () => {
    dispatch(
      changeQuantity({
        productId: cartItem.product.id || '',
        amount: 1,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: cartItem.product.image}} style={styles.image} />

      <View style={styles.contentContainer}>
        <Text style={styles.name}>{cartItem.product.name}</Text>
        <Text style={styles.size}>Size {cartItem.size}</Text>

        <View style={styles.footer}>
          <Feather
            onPress={onMinus}
            name="minus-circle"
            size={24}
            color="gray"
          />
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <Feather onPress={onPlus} name="plus-circle" size={24} color="gray" />
          <Text style={styles.itemTotal}>
            $ {cartItem.product.price * cartItem.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: '40%',
    aspectRatio: 1,
  },
  name: {
    fontWeight: '500',
    fontSize: 18,
  },
  size: {
    fontSize: 16,
    color: 'gray',
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTotal: {
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: '500',
  },
});
