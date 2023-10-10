export interface Product {
  _id: string;
  image: string;
  images: string[];
  name: string;
  price: number;
  sizes: number[];
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}

export interface Order {
  items: CartItem[];
  ref: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}
