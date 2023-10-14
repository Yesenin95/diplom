import { Product } from '@/components/ProductCard';
import React from 'react';
import CategoryPage from '../../components/CategoryPage';

const KonfetaPage = ({ konfeta }: { konfeta: any }) => {
   return <CategoryPage title="Конфеты" products={konfeta} addToCart={function (product: Product): void {
      throw new Error('Function not implemented.');
   } } />;
};

export async function getServerSideProps() {
   const res = await fetch('https://sweet-life-ten.vercel.app/api/products/konfeta');
   const konfeta = await res.json();

   return {
      props: {
         konfeta,
      },
   };
}

export default KonfetaPage;