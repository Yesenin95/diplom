import {
   Box,
   Container,
   Heading,
   SimpleGrid,
   Icon,
   Text,
   Stack,
   HStack,
   VStack
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/productCard.module.css';
const features = Array.apply(null, Array(8)).map(function (x, i) {
   return {
      id: i,
      title: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
   };
});

export default function About() {
   const router = useRouter();
const goBack = () => {
   router.back();
};
   return <>
      <Head>
         <title>
            О нас
         </title>
      </Head>
      <Box p={4}>

         <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
            <Heading fontSize={'3xl'}>This is the headline</Heading>
            <Text color={'white'} fontSize={'xl'}>
               Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
               nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
               sed diam voluptua.
            </Text>
         </Stack>

         <Container maxW={'6xl'} mt={10}>
            <button onClick={goBack} className={styles.btn}>&larr; Назад</button>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
               {features.map((feature) => (
                  <HStack key={feature.id} align={'top'}>
                     <Box color={'green.400'} px={2}>
                        <Icon as={CheckIcon} />
                     </Box>
                     <VStack align={'start'}>
                        <Text fontWeight={600}>{feature.title}</Text>
                        <Text color={'#ff9090'}>{feature.text}</Text>
                     </VStack>
                  </HStack>
               ))}
            </SimpleGrid>
         </Container>
      </Box>
   </>

}