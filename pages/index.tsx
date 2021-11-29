import type { NextPage } from 'next';
import { useRef } from 'react';

const Home: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      emailInputRef.current === null ||
      feedbackInputRef.current === null ||
      emailInputRef.current.value === '' ||
      feedbackInputRef.current.value === ''
    ) {
      return;
    }
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback Address</label>
          <textarea id='feedback' rows={5} ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
};

export default Home;
