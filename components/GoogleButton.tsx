import { Button, Center, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc'; 
import styles from "../styles/buttonSign.module.css";

export default function GoogleButton() {
   const handleSignInWithGoogle = () => {
      signIn('google');
   };

   return (
         <Button w="full" maxW="md" variant="outline" onClick={handleSignInWithGoogle}>
            <Center>
               <Text className={styles.buttonSign}>
                  <FcGoogle size={28} /> Sign in with Google
               </Text>
            </Center>
         </Button>
   );
}