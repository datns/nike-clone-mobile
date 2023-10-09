import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Product} from '../types';
import {MainStackParamList} from '../navigator/types';
import {useAppDispatch, useAppSelector} from '../hooks';
import {selectProduct, setSelectedProduct} from '../store/productSlice';

interface ProductsScreenProps
  extends NativeStackScreenProps<MainStackParamList, 'Products'> {}

const ProductsScreen = ({navigation}: ProductsScreenProps) => {
  const products = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();

  const renderItem: ListRenderItem<Product> = ({item}) => {
    const onPress = () => {
      dispatch(setSelectedProduct(item.id));
      navigation.navigate('ProductDetail');
    };

    return (
      <Pressable style={styles.imageWrapper} onPress={onPress}>
        <Image source={{uri: item.image}} style={styles.image} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <FlatList data={products} renderItem={renderItem} numColumns={2} />
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  imageWrapper: {
    width: '50%',
    padding: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
