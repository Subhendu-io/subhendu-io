import type { NextApiRequest, NextApiResponse } from 'next'
import { Login } from '@/services/AuthService';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  try {
    const credential = req.body;
    const result = await Login(credential.username, credential.password);
    if (result?.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error(error);
  }
}

export default handler;