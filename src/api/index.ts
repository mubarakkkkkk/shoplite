import axios from 'axios';
import type { Product, Order} from '../types';

const API_URL = 'http://localhost:5174';

export const api = axios.create({
  baseURL: API_URL,
});

// Auth
export const loginUser = async (email: string, password: string) => {
  const { data } = await api.get(`/users?email=${email}&password=${password}`);
  if (data.length > 0) {
    return {
      user: { id: data[0].id, email: data[0].email, name: data[0].name },
      token: 'fake-jwt-token-' + data[0].id,
    };
  }
  throw new Error('Invalid credentials');
};

// Products
export const fetchProducts = async (params?: {
  _page?: number;
  _limit?: number;
  q?: string;
  category?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
}) => {
  const { data, headers } = await api.get<Product[]>('/products', { params });
  return {
    products: data,
    total: parseInt(headers['x-total-count'] || '0'),
  };
};

export const fetchProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

// Orders
export const createOrder = async (order: Omit<Order, 'id' | 'date'>) => {
  const { data } = await api.post<Order>('/orders', {
    ...order,
    date: new Date().toISOString(),
  });
  return data;
};

export const fetchUserOrders = async (userId: string) => {
  const { data } = await api.get<Order[]>(`/orders?userId=${userId}`);
  return data;
};