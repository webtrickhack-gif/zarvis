import React from 'react';
import { FaRobot, FaCog } from 'react-icons/fa';
import './Header.css';

function Header({ conversationId }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <FaRobot className="logo-icon" />
          <h1>Zarvis AI</h1>
          <span className="tagline">Advanced AI Assistant</span>
        </div>
        <div className="header-actions">
          <button className="settings-btn" title="Settings">
            <FaCog />
          </button>
        </div>
      </div>
      <div className="header-info">
        <span className="status-indicator"></span>
        <span className="status-text">Connected • Ready</span>
      </div>
    </header>
  );
}

export default Header;
