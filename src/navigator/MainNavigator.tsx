import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {MainStackParamList} from './types';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import {useAppSelector} from '../hooks';
import {selectNumberOfItems} from '../store/cartSlice';
import TrackOrderScreen from '../screens/TrackOrderScreen';

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
          headerLeft: () => (
            <MaterialCommunityIcons
              onPress={() => navigation.navigate('TrackOrder')}
              name="truck-delivery"
              size={22}
              color="gray"
            />
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
      <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
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
