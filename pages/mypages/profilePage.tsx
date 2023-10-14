import { Box, Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import PrivateRoute from '../../components/PrivateRouter';
import ProfileForm from '../../components/ProfileForm';
import React from 'react';

export default function ProfilePage() {
   const { data: session } = useSession(); // Получаем сессию с помощью useSession()

   return (
      <Box>
         <Flex justify="center" align="center" h="100vh">
            <PrivateRoute requireSession={true}> 
               <ProfileForm session={session} /> 
            </PrivateRoute>
         </Flex>
      </Box>
   );
}