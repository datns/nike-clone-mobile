import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {MainStackParamList} from './types';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import {useAppSelector} from '../hooks';
import {selectNumberOfItems} from '../store/cartSlice';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const numberOfCartItem = useAppSelector(selectNumberOfItems);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('ShoppingCart')}
              style={{flexDirection: 'row'}}>
              <FontAwesome5 name="shopping-cart" size={18} color="gray" />
              <Text style={styles.cartItems}>{numberOfCartItem}</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={() => ({
          presentation: 'modal',
          headerShown: false,
        })}
      />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  cartItems: {
    marginLeft: 5,
    fontWeight: '500',
  },
});
