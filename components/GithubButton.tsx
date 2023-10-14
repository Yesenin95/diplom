import { Button, Center, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import styles from "../styles/buttonSign.module.css"; 

export default function GithubButton() {
   const handleSignInWithGithub = () => {
      signIn('github');
   };

   return (
         <Button w="full" maxW="md" variant="outline" onClick={handleSignInWithGithub}>
            <Center>
               <Text className={styles.buttonSign}>
                  <AiFillGithub size={28} /> Sign in with GitHub
               </Text>
            </Center>
         </Button>
   );
}
