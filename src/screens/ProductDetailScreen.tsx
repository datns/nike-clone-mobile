import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigator/types';
import {useAppDispatch, useAppSelector} from '../hooks';
import {selectSelectedProduct} from '../store/productSlice';
import {addCartItem} from '../store/cartSlice';

interface ProductDetailScreenProps
  extends NativeStackScreenProps<MainStackParamList, 'ProductDetail'> {}

const ProductDetailScreen = ({navigation}: ProductDetailScreenProps) => {
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const dispatch = useAppDispatch();

  const {width} = useWindowDimensions();

  const renderCarouselItem: ListRenderItem<string> = ({item}) => {
    return <Image source={{uri: item}} style={[styles.image, {width}]} />;
  };

  if (!selectedProduct) {
    return null;
  }

  const addToCart = () => {
    dispatch(addCartItem(selectedProduct));
  };

  return (
    <>
      <ScrollView>
        {/*Image Carousel*/}
        <FlatList
          data={selectedProduct.images}
          renderItem={renderCarouselItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <View style={{padding: 20}}>
          {/* Title */}
          <Text style={styles.title}>{selectedProduct.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${selectedProduct.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
      </ScrollView>
      {/* Add to cart button */}
      <Pressable style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>{`${selectedProduct.price} $`}</Text>
      </Pressable>

      <Pressable style={styles.icon} onPress={navigation.goBack}>
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontWeight: '500',
    fontSize: 16,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
  },
  button: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 30,
    width: '90%',
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
  icon: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#000000AA',
    borderRadius: 50,
    padding: 5,
  },
});
