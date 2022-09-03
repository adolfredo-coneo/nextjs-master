import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export type Feedback = {
  id: string;
  email: string;
  text: string;
};

export type FeedbackData = {
  message: string;
  feedback?: Feedback[];
};

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

export const extractFeedback = (filePath: string) => {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileData);
  return data;
};

function handler(req: NextApiRequest, res: NextApiResponse<FeedbackData>) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedback,
    };
    const filePath = buildFeedbackPath();
    const feedbacks = extractFeedback(filePath);
    feedbacks.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbacks));

    res
      .status(201)
      .json({ message: 'Thanks for the feedback!', feedback: [newFeedback] });
  } else {
    const filePath = buildFeedbackPath();
    const feedbacks = extractFeedback(filePath);
    res.status(200).json({ message: 'This works!!!', feedback: feedbacks });
  }
}

export default handler;
