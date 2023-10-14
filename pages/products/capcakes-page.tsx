import { Product } from '@/components/ProductCard';
import React, { useState } from 'react';
import CategoryPage from '../../components/CategoryPage';

const CapcakesPage = ({ capcakes }: { capcakes: any }) => {
   const [cartItems, setCartItems] = useState<Product[]>([]);

   const addToCart = (product: Product) => {
      setCartItems((prevCartItems) => [...prevCartItems, product]);
   };

   return <CategoryPage title="Пироженные" products={capcakes} addToCart={addToCart} />;
};

export async function getServerSideProps() {
   const res = await fetch('https://diplom-bay.vercel.app/api/products/capcakes');
   const capcakes = await res.json();

   return {
      props: {
         capcakes,
      },
   };
}

export default CapcakesPage;