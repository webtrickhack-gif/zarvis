import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize first conversation
  useEffect(() => {
    createNewConversation();
  }, []);

  // Fetch conversations list
  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  // Create new conversation
  const createNewConversation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/conversation', { method: 'POST' });
      const data = await response.json();
      setConversationId(data.conversationId);
      fetchConversations();
    } catch (error) {
      console.error('Error creating conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  // Switch conversation
  const switchConversation = (id) => {
    setConversationId(id);
  };

  // Delete conversation
  const deleteConversation = async (id) => {
    try {
      await fetch(`/api/conversation/${id}`, { method: 'DELETE' });
      fetchConversations();
      if (conversationId === id) {
        createNewConversation();
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        currentConversation={conversationId}
        onNewChat={createNewConversation}
        onSelectConversation={switchConversation}
        onDeleteConversation={deleteConversation}
        loading={loading}
      />
      <div className="main-content">
        <Header conversationId={conversationId} />
        {conversationId && (
          <ChatWindow conversationId={conversationId} />
        )}
      </div>
    </div>
  );
}

export default App;
