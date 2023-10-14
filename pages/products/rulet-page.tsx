import { Product } from '@/components/ProductCard';
import React from 'react';
import CategoryPage from '../../components/CategoryPage';

const RuletPage = ({ rulet }: { rulet: any }) => {
   return <CategoryPage title="Рулеты" products={rulet} addToCart={function (product: Product): void {
      throw new Error('Function not implemented.');
   } } />;
};

export async function getServerSideProps() {
   const res = await fetch('https://diplom-bay.vercel.app/api/products/rulet');
   const rulet = await res.json();

   return {
      props: {
         rulet,
      },
   };
}

export default RuletPage;