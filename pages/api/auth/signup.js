
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(req, res) {
   if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
   }

   const { firstName, lastName, email, password } = req.body;

 

   try {
      const user = await prisma.user.create({
         data: {
            name: `${firstName} ${lastName}`,
            email,
            password: `${password}`,
            role: 'user', // Default role for registered users
         },
      });

      return res.status(200).json({ message: 'User registered successfully' });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred' });
   }
}
