import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   if (req.method === 'GET') {
      try {
         const rulet = await prisma.rulet.findMany();
         res.status(200).json(rulet);
      } catch (error) {
         res.status(500).json({ error: 'Error fetching rulet data' });
      }
   } else {
      res.status(405).json({ error: 'Method not allowed' });
   }
}