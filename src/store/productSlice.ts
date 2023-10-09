import {createSlice} from '@reduxjs/toolkit';
import products from '../data/products.json';
import {Product} from '../types';
import {RootState} from './index';

interface ProductState {
  products: Product[];
  selectedProduct: Product | undefined;
}
const initialState: ProductState = {
  products: products,
  selectedProduct: undefined,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = state.products.find(p => p.id === action.payload);
    },
  },
});

export const {setSelectedProduct} = productsSlice.actions;

export const selectProduct = (state: RootState) => state.products.products;
export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;

export default productsSlice.reducer;
