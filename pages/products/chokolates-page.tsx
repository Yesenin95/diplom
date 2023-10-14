import { Product } from '@/components/ProductCard';
import React from 'react';
import CategoryPage from '../../components/CategoryPage';

const ChokolatesPage = ({ chokolates }: { chokolates: any }) => {
   return <CategoryPage title="Шоколад" products={chokolates} addToCart={function (product: Product): void {
      throw new Error('Function not implemented.');
   } } />;
};

export async function getServerSideProps() {
   const res = await fetch('https://diplom-bay.vercel.app/api/products/chokolates');
   const chokolates = await res.json();

   return {
      props: {
         chokolates,
      },
   };

}

export default ChokolatesPage;