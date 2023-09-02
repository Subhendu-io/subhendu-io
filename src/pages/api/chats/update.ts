import type { NextApiRequest, NextApiResponse } from 'next'
import { UpdateChat } from '@/services/ChatService';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  try {
    const chat = req.body;
    const result = await UpdateChat(chat);
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