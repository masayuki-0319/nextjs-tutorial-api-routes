import type { NextPage } from 'next';
import { useRef } from 'react';

const Home: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (emailInputRef.current === null || feedbackInputRef.current === null) {
      return;
    }
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback Address</label>
          <textarea id='feedback' rows={5} ref={feedbackInputRef}></textarea>
        </div>
        <button onSubmit={submitFormHandler}>Send Feedback</button>
      </form>
    </div>
  );
};

export default Home;
