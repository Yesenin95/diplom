'use client'
import React, { useState, useEffect } from 'react';
import ProductCard, { Product } from './ProductCard';
import Pagination from './Pagination';
import { filterProductsByPrice } from '../utils/productFilter';
import { sortProducts } from '../utils/productSort';
import { Container, Stack, Select, Input, Text, Grid } from '@chakra-ui/react';

interface CategoryPageProps {
   title: string;
   products: Product[];
   addToCart: (product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, products, addToCart }) => {
   const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc'>('price-asc');
   const [currentPage, setCurrentPage] = useState(1);
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
   const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
   const productsPerPage = 8;

   useEffect(() => {
      const sortedProducts = sortProducts(products, sortBy);
      setSortedProducts(sortedProducts);
   }, [sortBy, products]);

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = filterProductsByPrice(
      sortedProducts,
      minPrice,
      maxPrice
   ).slice(indexOfFirstProduct, indexOfLastProduct);

   const paginate = (pageNumber: React.SetStateAction<number>) => {
      setCurrentPage(pageNumber);
   };

   return (
      <Container maxW="container.xl" pt={'20px'} pb={'20px'}>
         <Stack spacing={4}>
            <Text fontSize="2xl" textAlign="center">{title}</Text>
            <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={4}>
               <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc')}
               >
                  <option value="price-asc">По возрастанию</option>
                  <option value="price-desc">По убыванию</option>
               </Select>
               <Input
                  type="text"
                  placeholder="Минимальная цена"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onBlur={() => setCurrentPage(1)}
               />
               <Input
                  type="text"
                  placeholder="Максимальная цена"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onBlur={() => setCurrentPage(1)}
               />
            </Grid>
            <ProductCard products={currentProducts} />
            <Pagination
               productsPerPage={productsPerPage}
               totalProducts={sortedProducts.length}
               paginate={paginate}
            />
         </Stack>
      </Container>
   );
};

export default CategoryPage;