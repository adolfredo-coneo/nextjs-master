import { GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react';

import {
  buildFeedbackPath,
  extractFeedback,
  Feedback,
} from '../api/feedback';

type Props = {
  feedbacks: Feedback[];
};

const FeedbackPages: NextPage<Props> = ({ feedbacks }) => {
  const [feedbackDetails, setFeedbackDetails] = useState<Feedback | undefined>(
    undefined
  );

  const loadFeedbackDetails = async (id: string) => {
    const feedback = await fetch('/api/feedback/' + id);
    const data = await feedback.json();
    setFeedbackDetails(data.feedback);
  };

  return (
    <>
      {feedbackDetails && (
        <div>
          <h1>{feedbackDetails.email}</h1>
          <p>{feedbackDetails.text}</p>
        </div>
      )}
      <ul>
        {feedbacks &&
          feedbacks.map((feedback) => (
            <li key={feedback.id}>
              {feedback.text}{' '}
              <button onClick={() => loadFeedbackDetails(feedback.id)}>
                Show details
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const filePath = buildFeedbackPath();
  const feedbacks = extractFeedback(filePath);
  return {
    props: {
      feedbacks,
    },
    revalidate: 30,
  };
};

export default FeedbackPages;
