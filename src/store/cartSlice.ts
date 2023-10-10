import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartItem, Product} from '../types';
import {RootState} from './index';

export interface CartState {
  items: CartItem[];
  deliveryPrice: number;
  freeDeliveryFrom: number;
}
const initialState: CartState = {
  items: [],
  deliveryPrice: 15,
  freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Product>) => {
      const newProduct = action.payload;
      state.items.push({
        product: newProduct,
        quantity: 1,
        size: newProduct.sizes[0],
      });
    },
    changeQuantity: (
      state,
      action: PayloadAction<{productId: string; amount: number}>,
    ) => {
      const {productId, amount} = action.payload;
      const selectedProduct = state.items.find(
        item => item.product._id === productId,
      );
      if (selectedProduct) {
        if (amount === -1 && selectedProduct.quantity === 1) {
          state.items = state.items.filter(
            item => item.product._id !== productId,
          );
        }
        selectedProduct.quantity += amount;
      }
    },
    clear: state => {
      state.items = [];
    },
  },
});

export const {changeQuantity, addCartItem, clear} = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectNumberOfItems = (state: RootState) =>
  state.cart.items.length;
export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + (item?.product?.price || 0) * item.quantity,
    0,
  );
export const selectDeliveryPrice = createSelector(
  selectCart,
  selectSubtotal,
  (state, subtotal) => {
    if (state.items.length === 0) {
      return 0;
    }
    return subtotal > state.freeDeliveryFrom ? 0 : state.deliveryPrice;
  },
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subtotal, delivery) => subtotal + delivery,
);

export default cartSlice.reducer;
