import React from 'react';
import './Chatbot.css';

export default function Chatbot() {
  return (
    <div>
      <div style={{ position: 'fixed', right: '50px', bottom: '50px' }}>
        <button type="button" className="NewAlertBtn">
          <img
            src="/channel_logo.png"
            alt="channel_logo"
            className="channel_logo"
          />
          <span className="NewAlertSpan"></span>
        </button>
      </div>
    </div>
  );
}
