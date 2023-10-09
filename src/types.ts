export interface Product {
  id: string;
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
