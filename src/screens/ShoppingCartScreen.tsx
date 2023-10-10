import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CartItem} from '../types';
import CardListItem from '../components/CardListItem';
import {useAppDispatch, useAppSelector} from '../hooks';
import {
  clear,
  selectCart,
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from '../store/cartSlice';
import {useCreateOrderMutation} from '../store/apiSlice';

const ShoppingCartScreen = () => {
  const cart = useAppSelector(selectCart);
  const subtotal = useAppSelector(selectSubtotal);
  const deliveryPrice = useAppSelector(selectDeliveryPrice);
  const total = useAppSelector(selectTotal);
  const [createOrder, {data}] = useCreateOrderMutation();
  const dispatch = useAppDispatch();

  const renderCartItem: ListRenderItem<CartItem> = ({item}) => {
    return <CardListItem cartItem={item} />;
  };

  if (cart.items.length <= 0) {
    return <Text>Cart is empty!</Text>;
  }

  const onCreateOrder = async () => {
    try {
      await createOrder({
        items: cart.items,
        subtotal,
        deliveryPrice,
        total,
      });
      if (data?.status === 'OK') {
        Alert.alert(
          'Order has been submitted',
          `Your order reference is: ${data?.data.ref}`,
        );
        dispatch(clear());
      }
    } catch (e) {}
  };

  return (
    <>
      <FlatList
        data={cart.items}
        renderItem={renderCartItem}
        ListFooterComponent={() => (
          <View style={styles.totalsContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>Subtotal</Text>
              <Text style={styles.text}>{subtotal}$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>{deliveryPrice}$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textBold}>Total</Text>
              <Text style={styles.textBold}>{total}$</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={onCreateOrder}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gainsboro',
    borderTopWidth: 1,
    padding: 20,
  },

  button: {
    width: '100%',
    backgroundColor: 'black',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
