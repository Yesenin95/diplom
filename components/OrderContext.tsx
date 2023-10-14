import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from './CartContext';

type Order = {
   name: string;
   email: string;
   address: string;
   items: CartItem[];
};

type OrderState = {
   orders: Order[];
};

type OrderAction = { type: 'ADD_ORDER'; payload: Order };

const orderReducer = (state: OrderState, action: OrderAction) => {
   switch (action.type) {
      case 'ADD_ORDER':
         return {
            ...state,
            orders: [...state.orders, action.payload],
         };
      default:
         return state;
   }
};

type OrderDispatch = React.Dispatch<OrderAction>;

const OrderContext = createContext<{ orderState: OrderState; orderDispatch: OrderDispatch } | undefined>(
   undefined
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
   const [orderState, orderDispatch] = useReducer(orderReducer, { orders: [] });

   return (
      <OrderContext.Provider value={{ orderState, orderDispatch }}>
         {children}
      </OrderContext.Provider>
   );
};

export const useOrder = () => {
   const context = useContext(OrderContext);
   if (context === undefined) {
      throw new Error('useOrder must be used within an OrderProvider');
   }
   return context;
};
