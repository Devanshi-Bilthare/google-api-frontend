import React, { useState } from 'react';

function App() {

  const url = 'https://google-api-backedn.onrender.com'
  // const url = 'http://localhost:3000'
  const [summary, setSummary] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [emails, setEmails] = useState('');

  const createEvent = async () => {
    const eventData = {
      summary,
      start: new Date(start).toISOString(),  // Converts to ISO format
      end: new Date(end).toISOString(),      // Converts to ISO format
      emails: emails.split(',').map(email => email.trim()),
    };
    await fetch(`${url}/create-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
  };

  const authenticate = () => {
    // Redirect user to /auth to login via Google
    window.location.href = `${url}/auth`;
  };

  return (
    <div>
      <h1>Schedule a Meeting</h1>
      <button onClick={authenticate}>Login with Google</button> {/* Add this to start OAuth flow */}
      <input
        type="text"
        placeholder="Meeting Title"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Start Time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="End Time"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <input
        type="text"
        placeholder="Emails (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
      <button onClick={createEvent}>Create Event</button>
    </div>
  );
}

export default App;
