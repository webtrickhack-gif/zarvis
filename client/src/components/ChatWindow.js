import React, { useState, useEffect, useRef } from 'react';
import { FaSend, FaMicrophone, FaPaperclip } from 'react-icons/fa';
import Message from './Message';
import './ChatWindow.css';

function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation history
  useEffect(() => {
    loadConversation();
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversation = async () => {
    try {
      const response = await fetch(`/api/conversation/${conversationId}`);
      const data = await response.json();
      if (data.messages) {
        setMessages(data.messages);
      }
      setError('');
    } catch (err) {
      console.error('Error loading conversation:', err);
      setError('Failed to load conversation');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setError('');

    // Add user message to UI
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          conversationId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Add AI response to UI
      const aiMessage = {
        role: 'model',
        content: data.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      // Remove user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-container">
            <div className="welcome-content">
              <h2>Welcome to Zarvis AI</h2>
              <p>Start a conversation with our advanced AI assistant powered by Google Gemini</p>
              <div className="suggestions">
                <div className="suggestion-card">
                  <span className="suggestion-emoji">💡</span>
                  <p>Ask questions about anything</p>
                </div>
                <div className="suggestion-card">
                  <span className="suggestion-emoji">📚</span>
                  <p>Get detailed explanations</p>
                </div>
                <div className="suggestion-card">
                  <span className="suggestion-emoji">💻</span>
                  <p>Write and debug code</p>
                </div>
                <div className="suggestion-card">
                  <span className="suggestion-emoji">🎨</span>
                  <p>Creative writing assistance</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
            {loading && (
              <div className="loading-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}
      </div>

      <form className="input-area" onSubmit={handleSendMessage}>
        <div className="input-wrapper">
          <button type="button" className="action-btn" title="Attach file">
            <FaPaperclip />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={loading}
            className="chat-input"
            autoFocus
          />
          <button type="button" className="action-btn" title="Voice input">
            <FaMicrophone />
          </button>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="send-btn"
            title="Send message"
          >
            <FaSend />
          </button>
        </div>
        <p className="input-hint">Powered by Google Gemini API • Free tier</p>
      </form>
    </div>
  );
}

export default ChatWindow;
