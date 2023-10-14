// CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface CartItem {
   id: string;
   name: string;
   description: string;
   price: number;
   quantity: number;
   images: string;
}

type CartState = {
   cartItems: CartItem[];
};

type CartAction =
   | { type: 'ADD_TO_CART'; payload: CartItem }
   | { type: 'INCREASE_QUANTITY'; payload: { id: string } }
   | { type: 'DECREASE_QUANTITY'; payload: { id: string } }
   | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
   | { type: 'CLEAR_CART' };
export const cartReducer = (state: CartState, action: CartAction) => {
   switch (action.type) {
      case 'ADD_TO_CART':
         const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
         if (existingItem) {
            return {
               ...state,
               cartItems: state.cartItems.map((item) =>
                  item.id === action.payload.id
                     ? { ...item, quantity: item.quantity + 1 }
                     : item
               ),
            };
         } else {
            return {
               ...state,
               cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
            };
         }
      case 'INCREASE_QUANTITY':
         return {
            ...state,
            cartItems: state.cartItems.map((item) =>
               item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
         };
      case 'DECREASE_QUANTITY':
         return {
            ...state,
            cartItems: state.cartItems.map((item) =>
               item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            ),
         };
      case 'REMOVE_FROM_CART':
         return {
            ...state,
            cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
         };
      default:
         return state;
   }
};

type CartDispatch = React.Dispatch<CartAction>;

const CartContext = createContext<{ cartState: CartState; cartDispatch: CartDispatch } | undefined>(
   undefined
);

export const saveCartToLocalStorage = (cartState: CartState) => {
   if (typeof window !== 'undefined') {
      window.localStorage.setItem('cart', JSON.stringify(cartState));
   }
};

export const loadCartFromLocalStorage = (): CartState => {
   if (typeof window !== 'undefined') {
      const savedCart = window.localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : { cartItems: [] };
   } else {
      return { cartItems: [] };
   }
};

type CartProviderProps = {
   children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
   const [cartState, cartDispatch] = useReducer(cartReducer, loadCartFromLocalStorage());

   useEffect(() => {
      saveCartToLocalStorage(cartState);
   }, [cartState]);

   return (
      <CartContext.Provider value={{ cartState, cartDispatch }}>
         {children}
      </CartContext.Provider>
   );
};

export const useCart = () => {
   const context = useContext(CartContext);
   if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
   }
   return context;
};