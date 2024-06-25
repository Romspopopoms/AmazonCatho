import React, { useState } from 'react';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: input,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.choices[0].text.trim() };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error('Erreur de communication avec ChatGPT:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <h1 className="text-2xl font-bold mb-4">Chat avec GPT-3</h1>
      <div className="bg-gray-800 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-right' : 'bg-gray-700 text-left'}`}
          >
            {message.content}
          </div>
        ))}
        {loading && (
          <div className="flex justify-center items-center my-2">
            <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tapez votre message..."
          className="flex-1 p-2 border border-gray-600 rounded-l-lg focus:outline-none bg-gray-900 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
};

export default ChatGPT;
