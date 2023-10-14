import { Product } from '@/components/ProductCard';
import React, { useState } from 'react';
import CategoryPage from '../../components/CategoryPage';


const CakesPage = ({ cakes }: { cakes: any; }) => {
   
   return <>
      <CategoryPage title="Пироженные" products={cakes} addToCart={function (product: Product): void {
         throw new Error('Function not implemented.');
      } }/>
   </>
};

export async function getServerSideProps() {
   const res = await fetch('https://sweet-life-ten.vercel.app/api/products/cakes');
   const cakes = await res.json();

   return {
      props: {
         cakes,
      },
   };
}

export default CakesPage;