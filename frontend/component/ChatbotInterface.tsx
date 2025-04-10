'use client';

import { useState } from 'react';

export default function ChatbotInterface() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }), // ✅ this is the fix
      });

      const data = await res.json();
      setResponse(data.response || data.error || 'No response');
    } catch (error) {
      console.error(error);
      setResponse('Error connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gemini Prompt</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        className="w-full border border-gray-300 rounded-md p-3"
        placeholder="Enter your prompt..."
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Submit'}
      </button>

      {response && (
        <div className="mt-6 bg-gray-100 border border-gray-300 p-4 rounded">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
