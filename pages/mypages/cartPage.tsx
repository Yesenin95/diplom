import React from 'react';
import { useSession } from 'next-auth/react';
import { CartItem, useCart } from '@/components/CartContext';
import styles from '@/styles/cart.module.css';
import Cart from '@/components/Cart';

const CartPage = () => {
   const { cartState } = useCart();
   const { data: session } = useSession();

   return (
      <div className={styles.cartPage}>
         <h1 className={styles.title}>Корзина</h1>
         <Cart cartItems={cartState.cartItems} />
      </div>
   );
};

export default CartPage;