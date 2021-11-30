import type { NextApiRequest, NextApiResponse } from 'next';

import { buildFeedbackPath, extractFeedback } from '.';

interface FeedbackRequest extends NextApiRequest {}

export default function handler(req: FeedbackRequest, res: NextApiResponse) {
  const feedbackid = req.query.feedbackId;

  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackid
  );

  res.status(200).json({ feedback: selectedFeedback });
}
