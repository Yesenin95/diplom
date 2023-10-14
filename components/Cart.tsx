import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import { CartItem, useCart } from './CartContext';
import styles from "../styles/cart.module.css";
import { useSession } from 'next-auth/react';

const Cart = ({ cartItems }: { cartItems: CartItem[] }) => {
   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
   const { data: session } = useSession();
   const { cartState, cartDispatch } = useCart();
   const router = useRouter();
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      address: '',
   });
   const increaseQuantity = (itemId: string) => {
      cartDispatch({
         type: 'INCREASE_QUANTITY',
         payload: { id: itemId },
      });
   };
   const goBack = () => {
      router.back();
   };

   const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
   };

   const handleFormSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const name = formData.name;
      const email = formData.email;
      const address = formData.address;

      try {
         const response = await fetch('/api/createOrder', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, address, cartItems }),
         });

         if (response.ok) {
            cartDispatch({ type: 'CLEAR_CART' });
            router.push(`/mypages/orderConfirmation?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}`);
         } else {
            // Handle error here
            console.error('Error creating order:', response.statusText);
         }
      } catch (error) {
         // Handle error here
         console.error('Error creating order:', error);
      }
   };
   const decreaseQuantity = (itemId: string) => {
      const item = cartItems.find((item) => item.id === itemId);

      if (item && item.quantity > 1) {
         // Если количество товара больше 1, уменьшаем на 1
         cartDispatch({
            type: 'DECREASE_QUANTITY',
            payload: { id: itemId },
         });
      } else if (item) {
         // Если количество товара равно 1, спрашиваем пользователя
         const confirmDelete = window.confirm('Вы действительно хотите удалить товар из корзины?');
         if (confirmDelete) {
            // Если пользователь подтверждает удаление, удаляем товар из корзины
            cartDispatch({
               type: 'REMOVE_FROM_CART',
               payload: { id: itemId },
            });
         }
      }
   };
   return <>
      <div className={styles.cart}>
         <div>
            <button onClick={goBack} className={styles.btn}>&larr; Назад</button>
            {cartItems.map((item) => (
               <div key={item.id} className={styles.item}>
                  <Image src={item.images} alt={item.name} width={100} height={100} />
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <span>Цена: {item.price}р. </span>
                  <span>кол-во {item.quantity}</span>
                  <span>Стоимость: {item.price * item.quantity}р. </span>
                  <button onClick={() => increaseQuantity(item.id)} className={styles.plus}>+</button>
                  <button onClick={() => decreaseQuantity(item.id)} className={styles.minus}>-</button>
               </div>
            ))}
         </div>
         <div className={styles.checkoutPage}>
            <h1>Оформление заказа</h1>
            {session ? (
               <form className={styles.checkoutForm} onSubmit={handleFormSubmit}>
                  <input
                     type="text"
                     name="name"
                     placeholder="Имя"
                     value={formData.name}
                     onChange={handleFormChange}
                     required
                  />
                  <input
                     type="email"
                     name="email"
                     placeholder="Email"
                     value={formData.email}
                     onChange={handleFormChange}
                     required
                  />
                  <textarea
                     name="address"
                     placeholder="Адрес доставки"
                     value={formData.address}
                     onChange={handleFormChange}
                     required
                  />
                  <h3>Total Price: {totalPrice}р.</h3>

                  <button type="submit" onClick={handleFormSubmit}>Оформить заказ</button>
               </form>
            ) : (
               <form className={styles.checkoutForm} onSubmit={handleFormSubmit}>
                  <input
                     type="text"
                     name="name"
                     placeholder="Имя"
                     value={formData.name}
                     onChange={handleFormChange}
                     required
                  />
                  <input
                     type="email"
                     name="email"
                     placeholder="Email"
                     value={formData.email}
                     onChange={handleFormChange}
                     required
                  />
                  <textarea
                     name="address"
                     placeholder="Адрес доставки"
                     value={formData.address}
                     onChange={handleFormChange}
                     required
                  />
                  <h3>Total Price: {totalPrice}р.</h3>

                  <button disabled>Оформить заказ</button>
                  <p>Чтобы оформить заказ, войдите в систему</p>
               </form>
            )}
         </div>
      </div>
   </>;
};

export default Cart;

