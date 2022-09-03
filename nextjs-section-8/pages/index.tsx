import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Feedback, FeedbackData } from './api/feedback';

const Home: NextPage = () => {
  const [feedbacks, setFedbacks] = useState<Feedback[] | undefined>([]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredFeedback = feedbackInputRef.current?.value;

    const requestBody = {
      email: enteredEmail,
      feedback: enteredFeedback,
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadFeedbacks = async () => {
    const res = await fetch('/api/feedback');
    const data: FeedbackData = await res.json();
    setFedbacks(data.feedback);
  };

  return (
    <div className={styles.container}>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef} />
        </div>
        <div>
          <button type="submit">Send Feedback</button>
        </div>
      </form>
      <hr />
      <button onClick={loadFeedbacks}>Get Feedbacks</button>
      <ul>
        {feedbacks &&
          feedbacks.map((feedback) => (
            <li key={feedback.id}>{feedback.text}</li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
