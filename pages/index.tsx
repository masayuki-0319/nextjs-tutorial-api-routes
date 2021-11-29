import type { NextPage } from 'next';
import { useRef, useState } from 'react';

const Home: NextPage = () => {
  const [feedbackItems, setFeedbackItems] = useState<any[]>([]);

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

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
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
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item, index) => (
          <li key={index}>
            <div>{item.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
