import {
   Box,
   chakra,
   Container,
   Stack,
   Text,
   VisuallyHidden,
} from '@chakra-ui/react';
import { FaVk, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({
   children,
   label,
   href,
}: {
   children: ReactNode;
   label: string;
   href: string;
}) => {
   return (
      <chakra.button
         rounded={'full'}
         w={8}
         h={8}
         cursor={'pointer'}
         as={'a'}
         href={href}
         display={'inline-flex'}
         alignItems={'center'}
         justifyContent={'center'}
         transition={'background 0.3s ease'}>
         <VisuallyHidden>{label}</VisuallyHidden>
         {children}
      </chakra.button>
   );
};

export default function Footer() {
   return (
      <Box
         className='Footer'
      >
         <Container
         className='info'
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2022 Chakra Templates. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
               <SocialButton label={'YouTube'} href={'https://www.youtube.com/'}>
                  <FaYoutube />
               </SocialButton>
               <SocialButton label={'Vk'} href={'https://vk.com'}>
                  <FaVk />
               </SocialButton>
            </Stack>
         </Container>
      </Box>
   );
}