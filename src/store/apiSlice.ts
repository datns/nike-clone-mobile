import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CartItem, Order, Product} from '../types';
import {CartState} from './cartSlice';

const baseUrl = 'http://localhost:3000/';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getProducts: builder.query<{data: Product[]}, void>({
      query: () => 'products',
    }),
    getProduct: builder.query<{data: Product}, string>({
      query: id => `products/${id}`,
    }),
    createOrder: builder.mutation<
      {data: Order; status: 'OK' | 'FAILED'},
      {
        items: CartItem[];
        subtotal: number;
        deliveryPrice: number;
        total: number;
      }
    >({
      query: newOrder => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    getOrder: builder.query({
      query: ref => `orders/${ref}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
} = apiSlice;
