import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Product} from '../types';
import {MainStackParamList} from '../navigator/types';
import {useGetProductsQuery} from '../store/apiSlice';

interface ProductsScreenProps
  extends NativeStackScreenProps<MainStackParamList, 'Products'> {}

const ProductsScreen = ({navigation}: ProductsScreenProps) => {
  const {data, isLoading, error} = useGetProductsQuery();

  const renderItem: ListRenderItem<Product> = ({item}) => {
    const onPress = () => {
      navigation.navigate('ProductDetail', {id: item._id});
    };

    return (
      <Pressable style={styles.imageWrapper} onPress={onPress}>
        <Image source={{uri: item.image}} style={styles.image} />
      </Pressable>
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <SafeAreaView>
      <FlatList data={data?.data} renderItem={renderItem} numColumns={2} />
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
