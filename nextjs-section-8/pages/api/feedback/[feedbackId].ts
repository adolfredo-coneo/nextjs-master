import type { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback, Feedback } from '.';

type SingleFeedbackData = {
  message: string;
  feedback?: Feedback;
};

function handler(
  req: NextApiRequest,
  res: NextApiResponse<SingleFeedbackData>
) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbacks: Feedback[] = extractFeedback(filePath);
  const selectedFeedback = feedbacks.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ message: 'Success!', feedback: selectedFeedback });
}

export default handler;
