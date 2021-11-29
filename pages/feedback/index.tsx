import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const FeedbackPage: NextPage<Props> = (props) => {
  const { feedbackItems } = props;

  return (
    <ul>
      {feedbackItems.map((item, index) => (
        <li key={index}>
          <div>{item.text}</div>
        </li>
      ))}
    </ul>
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
