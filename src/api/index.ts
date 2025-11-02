import { mockProducts, mockOrders, type Order } from '../data/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (email: string, _password: string) => {
  await delay(1000); 
  
  const user = {
    id: '1',
    email: email || 'demo@user.com',
    name: email.split('@')[0] || 'Quadri'
  };

  return {
    user,
    token: 'demo-token'
  };
};

export const fetchProducts = async (params?: {
  _page?: number;
  _limit?: number;
  q?: string;
  category?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
}) => {
  await delay(500); 

  let filteredProducts = [...mockProducts];

  // Search filter
  if (params?.q) {
    const searchTerm = params.q.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  if (params?.category && params.category !== 'All') {
    filteredProducts = filteredProducts.filter(product =>
      product.category === params.category
    );
  }

  if (params?._sort === 'price') {
    filteredProducts.sort((a, b) => {
      if (params._order === 'desc') {
        return b.price - a.price;
      }
      return a.price - b.price;
    });
  }

  const page = params?._page || 1;
  const limit = params?._limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    total: filteredProducts.length
  };
};

export const fetchProductById = async (id: string) => {
  await delay(300);
  const product = mockProducts.find(p => p.id === id);
  if (!product) throw new Error('Product not found');
  return product;
};

export const createOrder = async (order: Omit<Order, 'id' | 'date'>) => {
  await delay(1000);
  
  const newOrder: Order = {
    ...order,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString()
  };

  mockOrders.unshift(newOrder); 
  
  return newOrder;
};

export const fetchUserOrders = async (userId: string) => {
  await delay(500);
  if (userId) {
    return mockOrders.filter(order => order.userId === userId);
  }
  return mockOrders;
};