import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   if (req.method === 'GET') {
      try {
         const konfeta = await prisma.konfeta.findMany();
         res.status(200).json(konfeta);
      } catch (error) {
         res.status(500).json({ error: 'Error fetching konfeta data' });
      }
   } else {
      res.status(405).json({ error: 'Method not allowed' });
   }
}
