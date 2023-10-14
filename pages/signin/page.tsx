'use client'
import {
   Flex,
   Box,
   Stack,
   Heading,
   Text,
} from '@chakra-ui/react';
import ButtonSign from '@/components/ButtonSign';
import PrivateRoute from '@/components/PrivateRouter';

export default function SignIn() {
   return (

      <Flex
         align={'center'}
         justify={'center'}
         height={'100vh'}
      >
         <PrivateRoute requireSession={false}>
            <form action="/login" method="POST">
               <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                  <Stack align={'center'}>
                     <Heading fontSize={'3xl'}>Sign in to your account</Heading>
                  </Stack>
                  <Box
                     rounded={'lg'}
                     bg={'gray.700'}
                     boxShadow={'lg'}
                     p={7}
                  >
                     <Stack spacing={5}>           
                        <Stack spacing={5}>
                           <Text>
                           войти с помощью
                           </Text>
                           <Stack
                              direction={{ base: 'column', sm: 'column' }}>
                              <ButtonSign />
                           </Stack>
                        </Stack>
                     </Stack>
                  </Box>
               </Stack >
            </form>
         </PrivateRoute>

      </Flex >
   );
}


