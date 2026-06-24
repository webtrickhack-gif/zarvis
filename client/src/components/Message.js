import React from 'react';
import { FaUser, FaRobot, FaCopy, FaCheck } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import './Message.css';

function Message({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatMessage = (content) => {
    return content
      .split('\n')
      .map((line, idx) => {
        if (line.startsWith('```')) {
          return null;
        }
        if (line.startsWith('- ')) {
          return <li key={idx}>{line.substring(2)}</li>;
        }
        if (line.startsWith('# ')) {
          return <h3 key={idx} className="message-heading">{line.substring(2)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h4 key={idx} className="message-subheading">{line.substring(3)}</h4>;
        }
        return <p key={idx}>{line}</p>;
      })
      .filter(Boolean);
  };

  return (
    <div className={`message ${isUser ? 'user' : 'assistant'}`}>
      <div className={`message-icon ${isUser ? 'user-icon' : 'assistant-icon'}`}>
        {isUser ? <FaUser /> : <FaRobot />}
      </div>

      <div className="message-content-wrapper">
        <div className="message-header">
          <span className="message-sender">
            {isUser ? 'You' : 'Zarvis AI'}
          </span>
          {message.timestamp && (
            <span className="message-time">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </span>
          )}
        </div>

        <div className="message-body">
          <div className="message-text">
            {message.content}
          </div>

          {!isUser && (
            <button
              className="copy-btn"
              onClick={handleCopy}
              title="Copy message"
            >
              {copied ? (
                <>
                  <FaCheck /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
