// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';
import path from 'path';

interface FeedbackRequest extends NextApiRequest {
  method: 'POST';
  body: {
    email: string;
    text: string;
  };
}

type Data = {};

export default function handler(
  req: FeedbackRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = path.join(process.cwd(), 'data', 'feedbacc.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData as unknown as string) as any[];

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    res.status(200).json({ message: 'This works' });
  }
}
