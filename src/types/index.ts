export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}