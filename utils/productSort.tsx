import { Product } from '../components/ProductCard'; 
export const sortProducts = (products: Product[], sortBy: 'price-asc' | 'price-desc') => {
   return [...products].sort((a, b) => {
      if (sortBy === 'price-asc') {
         return a.price - b.price;
      } else {
         return b.price - a.price;
      }
   });
};