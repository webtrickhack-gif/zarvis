# 🚀 Zarvis AI - Advanced Assistant

**Zarvis** is a full-featured, production-ready AI assistant powered by **Google Gemini API** (free tier). It's built with React and Node.js, featuring a beautiful modern UI with advanced conversation management.

## ✨ Features

- 🤖 **Google Gemini AI Integration** - Powered by free-tier Google Gemini API
- 💬 **Multi-turn Conversations** - Maintain full conversation history
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 💾 **Conversation Management** - Save, load, and delete conversations
- ⚡ **Real-time Responses** - Instant AI responses
- 🔐 **No Authentication Required** - Simple setup with free API
- 📊 **Advanced Components** - Sidebar, header, message system
- 🎯 **Production Ready** - Fully deployable application

## 🛠️ Tech Stack

- **Frontend:** React 18, CSS3, React Icons
- **Backend:** Node.js, Express.js
- **AI:** Google Generative AI (Gemini)
- **Database:** In-memory (easily upgradeable to MongoDB/PostgreSQL)
- **Deployment:** Vercel, Heroku, or any Node.js host

## 📋 Prerequisites

- Node.js 14+
- npm or yarn
- Google Gemini API Key (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/webtrickhack-gif/zarvis.git
cd zarvis

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 3. Configure Environment

```bash
# Create .env file in root directory
cp .env.example .env

# Edit .env and add your Gemini API key
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

### 4. Run the Application

**Option A: Separate terminals (Development)**
```bash
# Terminal 1 - Start backend
npm start

# Terminal 2 - Start frontend
cd client
npm start
```

**Option B: Production build**
```bash
# Build frontend
cd client
npm run build
cd ..

# Start server (serves built frontend)
npm start
```

Visit `http://localhost:3000` (frontend) or `http://localhost:5000` (backend)

## 📚 API Endpoints

### Chat
- **POST** `/api/chat` - Send a message
  ```json
  {
    "message": "Hello!",
    "conversationId": "conv_..."
  }
  ```

### Conversations
- **POST** `/api/conversation` - Create new conversation
- **GET** `/api/conversation/:conversationId` - Get conversation history
- **DELETE** `/api/conversation/:conversationId` - Delete conversation
- **GET** `/api/conversations` - List all conversations

### Health
- **GET** `/api/health` - Health check

## 🎨 Customization

### Change Theme
Edit `client/src/index.css` and `client/src/App.css` to modify colors and gradients.

### Modify AI Model
In `server.js`, change:
```javascript
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
```

### Add Database
Replace the in-memory `conversations` Map with your database:
```javascript
// MongoDB example
const Conversation = require('./models/Conversation');
// Use MongoDB instead of Map
```

## 🌐 Deployment

### Heroku
```bash
git push heroku main
heroku config:set GEMINI_API_KEY=your_key
heroku open
```

### Vercel
```bash
# Frontend only (with API proxy)
vercel
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && cd client && npm install && npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔒 Security Notes

- Never commit `.env` file
- Use environment variables for API keys
- Consider adding rate limiting for production
- Add authentication for multi-user scenarios
- Use HTTPS in production

## 📝 File Structure

```
zarvis/
├── server.js                 # Express server & API
├── package.json
├── .env.example
├── README.md
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   ├── index.css
    │   └── components/
    │       ├── ChatWindow.js/css
    │       ├── Header.js/css
    │       ├── Sidebar.js/css
    │       └── Message.js/css
    └── package.json
```

## 🤝 Contributing

Feel free to fork, modify, and improve! Some ideas:
- Add database persistence
- Implement user authentication
- Add voice input/output
- File upload support
- Export conversations
- Dark/light theme toggle

## 📄 License

MIT License - Feel free to use in personal and commercial projects

## 🔗 Links

- [Google Gemini API Docs](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)

## ⭐ Support

If you find this helpful, please star the repository!

## 🚀 Future Enhancements

- [ ] Image generation
- [ ] Code execution
- [ ] File attachment support
- [ ] Conversation sharing
- [ ] Advanced search
- [ ] User profiles
- [ ] Analytics dashboard

---

**Made with ❤️ using React, Node.js, and Google Gemini AI**
