import type { NextPage } from 'next';
import { useRef } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
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
    </div>
  );
};

export default Home;
