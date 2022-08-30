import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string
  }

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ message: 'This works!!!' });
}

export default handler;
