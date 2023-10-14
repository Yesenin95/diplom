import React, { useState } from 'react';
import { Box, Button, Center, Grid, Text, VStack, Image, HStack } from '@chakra-ui/react';
import { useCart } from './CartContext';
import { useRouter } from 'next/router';

export interface Product {
   id: string;
   name: string;
   description: string;
   details: string;
   price: number;
   images: string;
   status: string;
}

interface ProductCardProps {
   products: Product[];
}

const ProductCard = ({ products }: ProductCardProps) => {
   const [expandedCards, setExpandedCards] = useState<{ [productId: string]: boolean }>({});
   const { cartDispatch } = useCart();

   const toggleDetails = (productId: string) => {
      setExpandedCards((prevState) => ({
         ...prevState,
         [productId]: !prevState[productId],
      }));
   };

   const addToCart = (product: Product) => {
      cartDispatch({
         type: 'ADD_TO_CART',
         payload: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            quantity: 1,
         },
      });
   };

   const router = useRouter();
   const goBack = () => {
      router.back();
   };

   return (
      <HStack justifyContent="center">
         <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={4} autoRows="1fr">
            {products.map((product) => (
               <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" textAlign="center" alignItems={'center'} w={'400px'} display={'flex'} flexDirection={'column'} pt={'10px'} pb={'10px'}>
                  <Image src={product.images} alt="Product" width={200} height={200} />
                  <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
                  <Text fontSize="md">{product.description}</Text>
                  <Text fontSize="lg" fontWeight="bold">Price: {product.price}р.</Text>
                  <Button
                     onClick={() => toggleDetails(product.id)}
                     variant="outline"
                     colorScheme="blue"
                  >
                     {expandedCards[product.id] ? 'Скрыть' : 'Подробнее'}
                  </Button>
                  {expandedCards[product.id] && (
                     <VStack spacing={4} alignItems="center" p={4} border="1px" borderColor="gray.200" display="flex" flexDirection="column" gap={10}>
                        <Text fontSize="lg">{product.details}</Text>
                        <Button onClick={() => addToCart(product)} colorScheme="teal">
                           В корзину
                        </Button>
                     </VStack>
                  )}
               </Box>
            ))}
         </Grid>
      </HStack>
   );
};

export default ProductCard;
