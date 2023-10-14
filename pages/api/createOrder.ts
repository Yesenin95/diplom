import { CartItem } from "@/components/CartContext";
import { NextApiRequest, NextApiResponse } from "next";

let orders: Order[] = [];
type Order = {
   name: string;
   email: string;
   address: string;
   cartItems: CartItem[]; // Подставьте ваш тип корзины
};
const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'POST') {
      try {
         const { name, email, address, cartItems } = req.body;

         // Создание нового заказа и добавление его в массив
         const newOrder: Order = { name, email, address, cartItems };
         orders.push(newOrder);

         // Отправка успешного ответа
         res.status(200).json({ message: 'Order created successfully', order: newOrder });
      } catch (error) {
         // Обработка ошибок при создании заказа
         res.status(500).json({ message: 'Error creating order' });
      }
   } else {
      res.status(405).json({ message: 'Method not allowed' });
   }
};

export default createOrder;
