import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Data = {
  message: string;
  feedback?: {
    id: string;
    email: string;
    feedback: string;
  };
};

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };
    const filePatch = path.join(process.cwd(), 'data', 'feedback.json');
    const feedbacks = JSON.parse(fs.readFileSync(filePatch, 'utf8'));
    feedbacks.push(newFeedback);
    fs.writeFileSync(filePatch, JSON.stringify(feedbacks));

    res
      .status(201)
      .json({ message: 'Thanks for the feedback!', feedback: newFeedback });
  } else {
    res.status(200).json({ message: 'This works!!!' });
  }
}

export default handler;
