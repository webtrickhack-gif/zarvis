import React, { useState } from 'react';
import { FaPlus, FaTrash, FaChevronDown, FaHistory } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({
  conversations,
  currentConversation,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  loading
}) {
  const [expanded, setExpanded] = useState(true);
  const [hoveredChat, setHoveredChat] = useState(null);

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button
          className="new-chat-btn"
          onClick={onNewChat}
          disabled={loading}
          title="New Conversation"
        >
          <FaPlus /> {expanded && 'New Chat'}
        </button>
        <button
          className="toggle-btn"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? 'Collapse' : 'Expand'}
        >
          <FaChevronDown style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
        </button>
      </div>

      <div className="sidebar-content">
        {expanded && (
          <>
            <div className="conversations-header">
              <FaHistory className="history-icon" />
              <span>History</span>
            </div>

            <div className="conversations-list">
              {conversations.length === 0 ? (
                <div className="empty-state">
                  <p>No conversations yet</p>
                </div>
              ) : (
                conversations.map((convId) => (
                  <div
                    key={convId}
                    className={`conversation-item ${currentConversation === convId ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredChat(convId)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <button
                      className="conversation-btn"
                      onClick={() => onSelectConversation(convId)}
                      title={convId}
                    >
                      <span className="conv-label">💬</span>
                      <span className="conv-name">
                        {convId.substring(0, 20)}...
                      </span>
                    </button>
                    {hoveredChat === convId && (
                      <button
                        className="delete-btn"
                        onClick={() => onDeleteConversation(convId)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="footer-content">
          <p className="version">v1.0.0</p>
          <p className="powered">Powered by Google Gemini</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
