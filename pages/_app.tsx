import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AppProps } from 'next/app';
import { CartProvider } from '../components/CartContext';
import { OrderProvider } from '@/components/OrderContext';



export default function App({ Component, pageProps }: AppProps) {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const { session } = pageProps;

   const isLoginPage = router.pathname === '/signin/page';
   const isRegisterPage = router.pathname === '/signup/page';

   if (isLoginPage || isRegisterPage) {
      return (
         <SessionProvider session={session}>
            <ChakraProvider>
               <Navbar />
               <CartProvider>
                  <OrderProvider>
                     <div className="main-content">
                        <Component {...pageProps}
                        />
                     </div>
                  </OrderProvider>
               </CartProvider>
            </ChakraProvider>
         </SessionProvider>
      );
   }

   return (

      <SessionProvider session={session}>
         <ChakraProvider>
            <Navbar />
            <CartProvider>
               <OrderProvider>
                  <div className="main-content">
                     {loading ? <div>Loading...</div> : <Component {...pageProps} />}
                  </div>
               </OrderProvider>
            </CartProvider>
            <Footer />
         </ChakraProvider>
      </SessionProvider>
   );
}
