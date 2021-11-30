import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const FeedbackPage: NextPage<Props> = (props) => {
  const { feedbackItems } = props;

  const [feedbackData, setfeedDackData] = useState<any>();

  const loadFeedbackhandler = (feedbackId: string) => {
    fetch(`/api/${feedbackId}`)
      .then((response) => response.json())
      .then((data) => setfeedDackData(data.feedback));
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item, index) => (
          <li key={index}>
            {item.text}
            <button onClick={() => loadFeedbackhandler(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
