const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY');

// Store conversations (in production, use a database)
const conversations = new Map();

// Generate unique conversation ID
function generateConversationId() {
  return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create or get conversation
    let convId = conversationId;
    if (!convId || !conversations.has(convId)) {
      convId = generateConversationId();
      conversations.set(convId, []);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build chat history
    const history = conversations.get(convId);
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    // Add current message
    chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Start chat session
    const chat = model.startChat({
      history: chatHistory.slice(0, -1) // Exclude current message from history
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const aiResponse = response.text();

    // Store messages in conversation
    conversations.get(convId).push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    conversations.get(convId).push({
      role: 'model',
      content: aiResponse,
      timestamp: new Date()
    });

    res.json({
      conversationId: convId,
      message: aiResponse,
      success: true
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Error processing message',
      details: error.message
    });
  }
});

// Get conversation history
app.get('/api/conversation/:conversationId', (req, res) => {
  try {
    const { conversationId } = req.params;
    const history = conversations.get(conversationId) || [];
    
    res.json({
      conversationId,
      messages: history,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving conversation' });
  }
});

// Create new conversation
app.post('/api/conversation', (req, res) => {
  try {
    const convId = generateConversationId();
    conversations.set(convId, []);
    
    res.json({
      conversationId: convId,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating conversation' });
  }
});

// Delete conversation
app.delete('/api/conversation/:conversationId', (req, res) => {
  try {
    const { conversationId } = req.params;
    conversations.delete(conversationId);
    
    res.json({
      success: true,
      message: 'Conversation deleted'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting conversation' });
  }
});

// List all conversations
app.get('/api/conversations', (req, res) => {
  try {
    const convList = Array.from(conversations.keys());
    res.json({
      conversations: convList,
      count: convList.length,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: 'Error listing conversations' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zarvis AI is running' });
});

// Serve static files from React app
app.use(express.static('client/build'));

// Catch all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(PORT, () => {
  console.log(`🚀 Zarvis AI Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   POST /api/chat - Send a message`);
  console.log(`   GET /api/conversation/:id - Get conversation history`);
  console.log(`   POST /api/conversation - Create new conversation`);
  console.log(`   DELETE /api/conversation/:id - Delete conversation`);
  console.log(`   GET /api/conversations - List all conversations`);
});

module.exports = app;
