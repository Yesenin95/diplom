import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/components/CartContext';
import styles from '@/styles/OrderConfirmation.module.css';
import { useSession } from 'next-auth/react';
import { useOrder } from '@/components/OrderContext';

const OrderConfirmation = () => {
   const { data: session } = useSession();
   const router = useRouter();
   const { orderState } = useOrder();
   const { cartState } = useCart();
   const { name, email, address } = router.query;
   const goBack = () => {
      router.back();
   };

   const totalPrice = cartState.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
   );

   return <>
      <div className={styles.orderConfirmation}>
         <h1>Заказ оформлен</h1>
         <h2>Товары:</h2>
         <table className={styles.orderTable}>
            <thead>
               <tr>
                  <th>Наименование</th>
                  <th>Цена</th>
                  <th>Количество</th>
                  <th>Общая стоимость</th>
               </tr>
            </thead>
            <tbody>
               {cartState.cartItems.map((item) => (
                  <tr key={item.id}>
                     <td>
                        {item.name} {item.description}
                     </td>
                     <td>{item.price}р.</td>
                     <td>{item.quantity}</td>
                     <td>{item.price * item.quantity}р.</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <h2>Информация о клиенте:</h2>
         <div className={styles.clientInfo}>
            <p>Имя: {name}</p>
            <p>Email: {email}</p>
            <p>Адрес: {address}</p>
         </div>
         <h2>Итоговая стоимость: {totalPrice}р.</h2>
         <button onClick={() => router.push('/mypages/cart')}>&larr; Назад</button>
      </div>
   </>;
};

export default OrderConfirmation;
function getItem(arg0: string): string {
   throw new Error('Function not implemented.');
}

